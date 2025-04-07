'use client';
import { useEffect, useState } from 'react';

export default function BookingsPage() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    // This is where your fetch logic goes
    fetch('/api/bookings')
      .then(res => res.json())
      .then(data => setBookings(data));
  }, []);

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">📋 All Bookings</h1>
      <table className="w-full bg-white shadow rounded">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="py-2 px-4">Guest</th>
            <th className="py-2 px-4">Room</th>
            <th className="py-2 px-4">Check-in</th>
            <th className="py-2 px-4">Check-out</th>
            <th className="py-2 px-4">Payment</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((b, i) => (
            <tr key={i} className="border-t">
              <td className="py-2 px-4">{b.first_name} {b.last_name}</td>
              <td className="py-2 px-4">{b.room_type} (Room {b.room_number})</td>
              <td className="py-2 px-4">{new Date(b.check_in_date).toLocaleDateString()}</td>
              <td className="py-2 px-4">{new Date(b.check_out_date).toLocaleDateString()}</td>
              <td className="py-2 px-4">${b.amount ?? '—'} ({b.payment_method ?? '—'})</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
