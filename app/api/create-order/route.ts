import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Adatok validálása (egyszerűsített)
    const { 
        ticketType, date, time, 
        adults, reduced, total, 
        fullName, email, phone 
    } = body;

    // Beillesztés a Supabase-be
    const { data, error } = await supabase
      .from('orders')
      .insert([
        { 
          ticket_type: ticketType,
          visit_date: date, // Fontos: a frontendnek 'YYYY-MM-DD' formátumot kell küldenie!
          visit_time: time,
          quantity_adult: adults,
          quantity_reduced: reduced,
          total_price: total,
          customer_name: fullName,
          customer_email: email,
          customer_phone: phone,
          status: 'pending' // Alapból függőben, amíg a fizetés nem sikerül (később Stripe webhook)
        },
      ])
      .select();

    if (error) throw error;

    return NextResponse.json({ success: true, orderId: data[0].id }, { status: 200 });

  } catch (error) {
    console.error('Order Error:', error);
    return NextResponse.json({ success: false, error: 'Failed to create order' }, { status: 500 });
  }
}