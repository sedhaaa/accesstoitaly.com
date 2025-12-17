'use server'

import { generateTicketEmailHtml, getTicketEmailSubject, OrderDetails } from '@/lib/email-templates';
import nodemailer from 'nodemailer';
import { createClient } from '@supabase/supabase-js'; // Kell a státusz frissítéshez

// Supabase admin kliens létrehozása (csak szerver oldalon!)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function sendTicketEmailAction(formData: FormData, order: OrderDetails) {
  try {
    // 1. TÖBB FÁJL BEOLVASÁSA (.getAll)
    const files = formData.getAll('ticketFiles') as File[];
    
    if (!files || files.length === 0) {
      return { success: false, message: 'Nincs fájl kiválasztva!' };
    }

    // 2. Fájlok átalakítása Buffer-ré (Promise.all a párhuzamosításhoz)
    const attachments = await Promise.all(files.map(async (file) => {
      const arrayBuffer = await file.arrayBuffer();
      return {
        filename: file.name,
        content: Buffer.from(arrayBuffer),
        contentType: 'application/pdf',
      };
    }));

    // 3. Email összeállítása
    const locale = order.language || 'en';
    const htmlContent = generateTicketEmailHtml(order, locale);
    const subject = getTicketEmailSubject(locale);

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // 4. Küldés
    await transporter.sendMail({
      from: `"Access To Italy" <${process.env.SMTP_USER}>`,
      to: order.customerEmail,
      subject: subject,
      html: htmlContent,
      attachments: attachments, // Itt adjuk át a tömböt
    });

    // 5. SUPABASE UPDATE: Státusz átállítása 'true'-ra
    const { error } = await supabase
      .from('orders')
      .update({ tickets_sent: true })
      .eq('id', order.orderId);

    if (error) {
      console.error('Supabase update error:', error);
      // Nem térünk vissza hibával, mert az email elment, csak a státusz nem frissült
    }

    return { success: true, message: `${files.length} db jegy sikeresen elküldve!` };

  } catch (error) {
    console.error('Email hiba:', error);
    return { success: false, message: 'Hiba történt a küldéskor.' };
  }
}