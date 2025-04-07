'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link'; // ✅ Needed for Link to work

export default function RoomsPage() {
  const [rooms, setRooms] = useState([]);
  const router = useRouter();

  useEffect(() => {
    if (localStorage.getItem('isAdmin') !== 'true') {
      router.push('/');
      return;
    }

    fetch('/api/rooms')
      .then(res => res.json())
      .then(data => setRooms(data));
  }, []);

  return (
    <>
      {/* ✅ Navbar inside return */}
      <nav className="bg-black px-4 py-3 text-white shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/" className="text-xl font-bold">Delmaro</Link>
          <div className="flex gap-6 text-sm">
            <Link href="/" className="hover:text-blue-400">Home</Link>
            <Link href="/about" className="hover:text-blue-400">About</Link>
            <Link href="/guests" className="hover:text-blue-400">Guest</Link>
            <Link href="/payments" className="hover:text-blue-400">Payments</Link>
            <Link href="/staff" className="hover:text-blue-400">Staff</Link>
            <Link href="/contact" className="hover:text-blue-400">Contact</Link>
            <button
              onClick={() => {
                localStorage.removeItem('loggedIn');
                router.push('/');
              }}
              className="text-white hover:text-red-400"
            >
              Log out
            </button>
          </div>
        </div>
      </nav>

      {/* ✅ Rooms Table */}
      <div className="p-8 max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">🛏️ Rooms</h1>
        <table className="w-full bg-white shadow rounded">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="py-2 px-4">Room Number</th>
              <th className="py-2 px-4">Type</th>
              <th className="py-2 px-4">Price</th>
              <th className="py-2 px-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {rooms.map((r, i) => (
              <tr key={i} className="border-t">
                <td className="py-2 px-4">{r.room_number}</td>
                <td className="py-2 px-4">{r.room_type}</td>
                <td className="py-2 px-4">${r.price}</td>
                <td className="py-2 px-4">{r.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
