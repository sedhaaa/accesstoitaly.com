import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import nodemailer from 'nodemailer';
import { generateEmailHtml, getEmailSubject } from '@/lib/email-templates'; 

const generateNumericOrderId = () => {
    return Math.floor(10000000 + Math.random() * 90000000).toString();
};

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log("Beérkező rendelési adatok:", body); // DEBUG: Lássuk mit kapunk

    const { 
        ticketType, date, time, 
        adults, reduced, total, 
        fullName, email, phone,
        locale = 'en'
    } = body;

    // 1. ID Generálás
    const numericOrderId = generateNumericOrderId(); 

    // 2. SUPABASE MENTÉS
    // Ellenőrizzük, hogy van-e kulcs
    if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
        throw new Error("HIÁNYZIK A SUPABASE_SERVICE_ROLE_KEY a .env.local fájlból!");
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // Adatok előkészítése a beszúráshoz
    const insertData = { 
        ticket_type: ticketType,
        visit_date: date,
        visit_time: time,
        quantity_adult: adults,
        quantity_reduced: reduced,
        total_price: total,
        customer_name: fullName,
        customer_email: email,
        customer_phone: phone,
        status: 'paid',
        display_id: numericOrderId
    };

    console.log("Supabase insert indítása ezzel az adattal:", insertData);

    const { data, error } = await supabase
      .from('orders')
      .insert([insertData])
      .select();

    if (error) {
        console.error("KRITIKUS SUPABASE HIBA:", error);
        // Itt látni fogod a terminálban, ha pl. "column visit_date does not exist"
        return NextResponse.json({ success: false, error: error.message, details: error }, { status: 500 });
    }

    console.log("Sikeres mentés:", data);

    // 3. EMAIL KÜLDÉS
    try {
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_PASS,
          },
        });

        const emailHtml = generateEmailHtml({
            orderId: numericOrderId,
            customerName: fullName,
            customerEmail: email,
            customerPhone: phone,
            ticketType: ticketType,
            date: date,
            time: time,
            adults: adults,
            reduced: reduced,
            total: total
        }, locale);

        const subjectLine = `${getEmailSubject(locale)} #${numericOrderId}`;

        await transporter.sendMail({
          from: '"Access to Italy" <info@accesstoitaly.com>',
          to: email,
          subject: subjectLine,
          html: emailHtml,
        });
        console.log("Email elküldve.");
    } catch (emailError) {
        console.error("Email küldési hiba (de a mentés sikerült):", emailError);
        // Nem dobunk hibát, mert az adatbázisba már bekerült
    }

    return NextResponse.json({ success: true, orderId: numericOrderId }, { status: 200 });

  } catch (error: any) {
    console.error('Szerver oldali kivétel:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}