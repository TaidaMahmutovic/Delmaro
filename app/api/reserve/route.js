import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: 'Sarah28042022',
  database: 'hoteldb',
};

export async function POST(req) {
  try {
    const body = await req.json();
    console.log('✅ Incoming request body:', body);

    const {
      firstName,
      lastName,
      email,
      phone,
      address,
      room,
      checkIn,
      checkOut,
      guests,
      paymentMethod, // ✅ added this
    } = body;

    const connection = await mysql.createConnection(dbConfig);

    // Check if guest exists
    const [guestRows] = await connection.execute(
      'SELECT guest_id FROM guests WHERE email = ?',
      [email]
    );

    let guestId;
    if (guestRows.length > 0) {
      guestId = guestRows[0].guest_id;
    } else {
      const [result] = await connection.execute(
        'INSERT INTO guests (first_name, last_name, email, phone, address) VALUES (?, ?, ?, ?, ?)',
        [firstName, lastName, email, phone, address]
      );
      guestId = result.insertId;
    }

    // Check if room exists by room_type
    const [roomRows] = await connection.execute(
      'SELECT room_id, price FROM rooms WHERE room_type = ? LIMIT 1',
      [room]
    );

    if (roomRows.length === 0) {
      console.error('❌ No room found for:', room);
      await connection.end();
      return NextResponse.json({ error: 'Room not found' }, { status: 400 });
    }

    const roomId = roomRows[0].room_id;
    const roomPrice = roomRows[0].price;

    // Insert booking
    const [bookingResult] = await connection.execute(
      'INSERT INTO bookings (guest_id, room_id, check_in_date, check_out_date, status) VALUES (?, ?, ?, ?, ?)',
      [guestId, roomId, checkIn, checkOut, 'Booked']
    );

    const bookingId = bookingResult.insertId;

    // Calculate total amount
    const nights =
      Math.ceil(
        (new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24)
      ) || 1;
    const amount = roomPrice * nights;

    // Insert payment
    await connection.execute(
      'INSERT INTO payments (booking_id, amount, payment_date, payment_method, status) VALUES (?, ?, NOW(), ?, ?)',
      [bookingId, amount, paymentMethod, 'Paid']
    );

    await connection.end();

    console.log('✅ Reservation and payment inserted successfully');
    return NextResponse.json({ message: 'Reservation and payment saved' });

  } catch (error) {
    console.error('💥 ERROR in /api/reserve:', error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
