'use client';
import { useSearchParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link'; // ✅ Required for navigation links

const roomImages = {
  'Luxury Suite': '/luxury-suite.png',
  'Cozy Budget Room': '/budget-room.png',
  'Ocean View Room': '/ocean-view.png',
  'Standard Single Room': '/single-room.png',
  'Standard Double Room': '/double -room.png',
  'Twin Room': '/twin-room.png',
  'Family Room': '/family-room.png',
  'Deluxe King Room': '/deluxe-room.png',
  'Accessible Room': '/accessible-room.png'
};

export default function RoomDetails() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const roomName = searchParams.get('room') || 'Deluxe King Room';
  const imageSrc = roomImages[roomName] || '/room-example.jpg';

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    checkIn: '',
    checkOut: '',
    guests: 1,
    paymentMethod: 'Credit Card',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('/api/reserve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          room: roomName,
          checkIn: formData.checkIn,
          checkOut: formData.checkOut,
          guests: formData.guests,
          paymentMethod: formData.paymentMethod,
        }),
      });

      if (!res.ok) throw new Error('Reservation failed');

      alert(`✅ Reservation Confirmed for ${roomName}!`);
      router.push('/');
    } catch (err) {
      console.error('💥 Error in /api/reserve:', err.message);
      alert('❌ Failed to submit reservation.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">

      {/* ✅ Navbar with Return Button */}
      <nav className="bg-black text-white px-6 py-3 flex justify-between items-center shadow-md">
        <h1 className="text-lg font-bold">Room Reservation</h1>
        <button
          onClick={() => router.back()}
          className="bg-white text-black px-4 py-1 rounded hover:bg-gray-200 transition"
        >
          ← Return
        </button>
      </nav>

      <div className="w-full max-w-4xl mx-auto mt-8 mb-10 rounded-xl overflow-hidden shadow-md">
        <img src={imageSrc} alt={roomName} className="w-full h-64 object-cover" />
      </div>

      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10 p-8">
        <div className="md:col-span-2">
          <h1 className="text-4xl font-bold text-blue-800 mb-2">{roomName}</h1>
          <p className="text-lg text-gray-600 mb-4">
            From <span className="text-blue-700 font-semibold">$150/night</span>
          </p>
          <p className="text-gray-700 mb-6 leading-relaxed">
            Enjoy your stay in our comfortable {roomName.toLowerCase()}, perfect for relaxing or working while away from home.
          </p>
          <div className="grid grid-cols-2 gap-4 text-gray-700 text-sm">
            <p>🛌 Comfortable Bed</p>
            <p>📶 Free Wi-Fi</p>
            <p>📺 Smart TV</p>
            <p>🚱 Private Bathroom</p>
            <p>🥤 Mini Bar</p>
            <p>🌆 Balcony View</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md h-fit">
          <form onSubmit={handleSubmit} className="space-y-4">
            <h2 className="text-xl font-bold text-blue-700 mb-2">Reserve Now</h2>

            <input type="text" name="firstName" placeholder="First Name" className="w-full border border-gray-300 p-2 rounded-lg text-black" value={formData.firstName} onChange={handleChange} required />
            <input type="text" name="lastName" placeholder="Last Name" className="w-full border border-gray-300 p-2 rounded-lg text-black" value={formData.lastName} onChange={handleChange} required />
            <input type="email" name="email" placeholder="Email" className="w-full border border-gray-300 p-2 rounded-lg text-black" value={formData.email} onChange={handleChange} required />
            <input type="tel" name="phone" placeholder="Phone Number" className="w-full border border-gray-300 p-2 rounded-lg text-black" value={formData.phone} onChange={handleChange} required />
            <input type="text" name="address" placeholder="Address" className="w-full border border-gray-300 p-2 rounded-lg text-black" value={formData.address} onChange={handleChange} required />

            <div className="flex gap-4">
              <input type="date" name="checkIn" className="w-full border border-gray-300 p-2 rounded-lg text-black" value={formData.checkIn} onChange={handleChange} required />
              <input type="date" name="checkOut" className="w-full border border-gray-300 p-2 rounded-lg text-black" value={formData.checkOut} onChange={handleChange} required />
            </div>

            <input type="number" name="guests" min="1" className="w-full border border-gray-300 p-2 rounded-lg text-black" value={formData.guests} onChange={handleChange} placeholder="Guests" required />

            <select name="paymentMethod" value={formData.paymentMethod} onChange={handleChange} className="w-full border border-gray-300 p-2 rounded-lg text-black">
              <option value="Credit Card">Credit Card</option>
              <option value="Cash">Cash</option>
              <option value="Online">Online</option>
            </select>

            <button type="submit" className="bg-green-600 text-white px-6 py-2 w-full rounded-lg hover:bg-green-700 transition">
              Confirm Reservation
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
