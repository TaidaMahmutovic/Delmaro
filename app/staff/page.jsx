'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link'; // ✅ Required for <Link>

export default function StaffPage() {
  const [staff, setStaff] = useState([]);
  const router = useRouter();

  useEffect(() => {
    if (localStorage.getItem('isAdmin') !== 'true') {
      router.push('/');
      return;
    }

    fetch('/api/staff')
      .then(res => res.json())
      .then(data => setStaff(data));
  }, []);

  return (
    <>
      {/* ✅ Navbar moved inside return */}
      <nav className="bg-black px-4 py-3 text-white shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/" className="text-xl font-bold">Delmaro</Link>
          <div className="flex gap-6 text-sm">
            <Link href="/" className="hover:text-blue-400">Home</Link>
            <Link href="/about" className="hover:text-blue-400">About</Link>
            <Link href="/guests" className="hover:text-blue-400">Guest</Link>
            <Link href="/rooms" className="hover:text-blue-400">Rooms</Link>
            <Link href="/payments" className="hover:text-blue-400">Payments</Link>
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

      {/* ✅ Staff Table */}
      <div className="p-8 max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">👥 Staff Members</h1>
        <table className="w-full bg-white shadow rounded">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="py-2 px-4">Name</th>
              <th className="py-2 px-4">Role</th>
              <th className="py-2 px-4">Email</th>
              <th className="py-2 px-4">Phone</th>
            </tr>
          </thead>
          <tbody>
            {staff.map((s, i) => (
              <tr key={i} className="border-t">
                <td className="py-2 px-4">{s.name}</td>
                <td className="py-2 px-4">{s.role}</td>
                <td className="py-2 px-4">{s.email}</td>
                <td className="py-2 px-4">{s.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
