'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link'; // ✅ Added import

export default function GuestsPage() {
  const [guests, setGuests] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const isAdmin = localStorage.getItem('isAdmin');
    if (isAdmin !== 'true') {
      alert('Unauthorized Access');
      router.push('/');
      return;
    }

    fetch('/api/guests')
      .then((res) => res.json())
      .then((data) => setGuests(data));
  }, [router]);

  return (
    <>
      {/* ✅ Moved navbar into return block */}
      <nav className="bg-black px-4 py-3 text-white shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/" className="text-xl font-bold">Delmaro</Link>
          <div className="flex gap-6 text-sm">
            <Link href="/" className="hover:text-blue-400">Home</Link>
            <Link href="/about" className="hover:text-blue-400">About</Link>
            <Link href="/rooms" className="hover:text-blue-400">Rooms</Link>
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

      <div className="p-8 max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">👥 Guests</h1>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="py-3 px-4">Name</th>
                <th className="py-3 px-4">Email</th>
                <th className="py-3 px-4">Phone</th>
                <th className="py-3 px-4">Address</th>
              </tr>
            </thead>
            <tbody>
              {guests.map((g) => (
                <tr key={g.guest_id} className="border-t">
                  <td className="py-2 px-4">{g.first_name} {g.last_name}</td>
                  <td className="py-2 px-4">{g.email}</td>
                  <td className="py-2 px-4">{g.phone}</td>
                  <td className="py-2 px-4">{g.address}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
