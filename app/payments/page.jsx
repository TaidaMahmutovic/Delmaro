'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link'; // ✅ This was missing!

export default function PaymentsPage() {
  const [payments, setPayments] = useState([]);
  const router = useRouter();

  useEffect(() => {
    if (localStorage.getItem('isAdmin') !== 'true') {
      router.push('/');
      return;
    }

    fetch('/api/payments')
      .then(res => res.json())
      .then(data => setPayments(data));
  }, []);

  return (
    <>
      {/* ✅ Navbar */}
      <nav className="bg-black px-4 py-3 text-white shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/" className="text-xl font-bold">Delmaro</Link>
          <div className="flex gap-6 text-sm">
            <Link href="/" className="hover:text-blue-400">Home</Link>
            <Link href="/about" className="hover:text-blue-400">About</Link>
            <Link href="/guests" className="hover:text-blue-400">Guest</Link>
            <Link href="/rooms" className="hover:text-blue-400">Rooms</Link>
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

      {/* ✅ Payments Table */}
      <div className="p-8 max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">💳 Payments</h1>
        <table className="w-full bg-white shadow rounded">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="py-2 px-4">Amount</th>
              <th className="py-2 px-4">Method</th>
              <th className="py-2 px-4">Status</th>
              <th className="py-2 px-4">Date</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((p, i) => (
              <tr key={i} className="border-t">
                <td className="py-2 px-4">${p.amount}</td>
                <td className="py-2 px-4">{p.payment_method}</td>
                <td className="py-2 px-4">{p.status}</td>
                <td className="py-2 px-4">
                  {new Date(p.payment_date).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
