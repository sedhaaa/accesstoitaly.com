import { NextResponse } from 'next/server';
import Stripe from 'stripe';

// Fontos: Itt a TITKOS kulcsot használjuk (sk_...)
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { total, ticketType, email } = body;

    // Létrehozzuk a fizetési szándékot a Stripe szerverén
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(total * 100), // Stripe centben számol! (pl. 26 EUR -> 2600)
      currency: 'eur',
      automatic_payment_methods: { enabled: true }, // Ez engedélyezi a kártyát, Apple Pay-t, Google Pay-t is!
      metadata: {
        ticketType,
        email
      }
    });

    // Visszaküldjük a titkos kulcsot a Frontendnek
    return NextResponse.json({ 
        clientSecret: paymentIntent.client_secret,
        orderId: paymentIntent.id 
    });
  } catch (error: any) {
    console.error("Stripe Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}