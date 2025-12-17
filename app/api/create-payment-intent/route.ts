import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { supabase } from '@/lib/supabase';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { 
        ticketType, date, time, 
        total, currency,
        // A név, email stb. itt csak opcionális a metadata-hoz, 
        // de az adatbázisba nem mentjük még el.
        fullName, email 
    } = body;

    // --- 0. LÉPÉS: ELÉRHETŐSÉG ELLENŐRZÉSE ---
    // Ezt MEGTARTJUK, mert nem akarjuk, hogy fizessen, ha nincs hely.
    // De adatbázisba írás (insert) itt nem történik.
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
                return NextResponse.json({ errorCode: 'sold_out_day' }, { status: 409 });
            }
            // 2. Eset: Adott időpont lezárva
            if (rule.blocked_times && rule.blocked_times.includes(time)) {
                return NextResponse.json({ errorCode: 'sold_out_time', errorParam: time }, { status: 409 });
            }
        }
    }

    // --- A KORÁBBI MENTÉS (INSERT) INNEN TÖRÖLVE LETT ---
    // Így nem jön létre rendelés a "Continue to Payment" gomb megnyomásakor.

    // --- 1. LÉPÉS: STRIPE ELŐKÉSZÍTÉSE ---
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(total * 100), // Centben
      currency: currency || 'eur',
      automatic_payment_methods: { enabled: true },
      // Metadata: hasznos infók a Stripe Dashboardhoz, de nem a saját DB-hez
      metadata: {
        ticketType,
        date,
        time,
        customerName: fullName, // Opcionális, hogy lásd a Stripe-on ki fizet
        customerEmail: email
      }
    });

    // Visszaküldjük a clientSecret-et.
    // OrderId-t itt már NEM küldünk vissza, mert még nem létezik a rendelés.
    return NextResponse.json({ 
        clientSecret: paymentIntent.client_secret 
    });

  } catch (error: any) {
    console.error("API Error:", error);
    return NextResponse.json({ errorCode: 'generic_error' }, { status: 500 });
  }
}