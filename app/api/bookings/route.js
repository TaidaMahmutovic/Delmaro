import { db } from '../../lib/db'; // ✅ works if db.js is in /app/lib/

import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const [rows] = await db.execute(`
      SELECT 
        g.first_name, g.last_name, 
        r.room_number, r.room_type, 
        b.check_in_date, b.check_out_date,
        p.amount, p.payment_method
      FROM bookings b
      JOIN guests g ON b.guest_id = g.guest_id
      JOIN rooms r ON b.room_id = r.room_id
      LEFT JOIN payments p ON b.booking_id = p.booking_id
    `);
    return NextResponse.json(rows); // ✅ Must be an array!
  } catch (error) {
    console.error('❌ Error fetching bookings:', error);
    return NextResponse.json({ error: 'Failed to load bookings' }, { status: 500 });
    //select
  }
}
