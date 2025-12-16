import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { supabase } from '@/lib/supabase';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { 
        ticketType, date, time, 
        adults, reduced, total, 
        fullName, email, phone, 
        currency 
    } = body;

    // --- 0. LÉPÉS: ELÉRHETŐSÉG ELLENŐRZÉSE ---
    const { data: rules } = await supabase
        .from('availability')
        .select('*')
        .eq('blocked_date', date);

    if (rules && rules.length > 0) {
        const rule = rules[0];
        const appliesToTicket = rule.ticket_type === 'all' || rule.ticket_type === ticketType;

        if (appliesToTicket) {
            // 1. Eset: Teljes nap lezárva
            if (rule.is_full_day_blocked) {
                // KÓDOT küldünk vissza, nem szöveget!
                return NextResponse.json({ errorCode: 'sold_out_day' }, { status: 409 });
            }
            // 2. Eset: Adott időpont lezárva
            if (rule.blocked_times && rule.blocked_times.includes(time)) {
                return NextResponse.json({ errorCode: 'sold_out_time', errorParam: time }, { status: 409 });
            }
        }
    }

    // --- 1. LÉPÉS: RENDELÉS LÉTREHOZÁSA (Pending) ---
    const { data: orderData, error: orderError } = await supabase
        .from('orders')
        .insert([{ 
            ticket_type: ticketType,
            visit_date: date,
            visit_time: time,
            quantity_adult: adults,
            quantity_reduced: reduced,
            total_price: total,
            customer_name: fullName,
            customer_email: email,
            customer_phone: phone,
            status: 'pending' 
        }])
        .select()
        .single();

    if (orderError) throw new Error("Database error");

    const newOrderId = orderData.id;

    // --- 2. LÉPÉS: STRIPE ---
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(total * 100),
      currency: currency || 'eur',
      automatic_payment_methods: { enabled: true },
      metadata: {
        ticketType,
        email,
        customerName: fullName,
        supabaseOrderId: newOrderId
      }
    });

    return NextResponse.json({ 
        clientSecret: paymentIntent.client_secret,
        orderId: newOrderId 
    });

  } catch (error: any) {
    console.error("API Error:", error);
    return NextResponse.json({ errorCode: 'generic_error' }, { status: 500 });
  }
}