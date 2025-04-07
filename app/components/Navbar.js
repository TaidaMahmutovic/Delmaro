'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    const adminFlag = localStorage.getItem('isAdmin') === 'true';
    setIsAdmin(adminFlag);
  }, []);

  return (
    <>
      <nav className="bg-black shadow-md px-4 py-3 relative">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/" className="text-xl font-bold text-white">
            Delmaro
          </Link>
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-white">
              ☰
            </button>
          </div>
          <div className={`flex-col md:flex md:flex-row md:items-center gap-4 ${isOpen ? 'flex' : 'hidden'}`}>
            <div className="relative">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="text-white hover:text-blue-600"
              >
                Menu ▼
              </button>
              {menuOpen && (
                <div className="absolute mt-2 bg-white shadow-md rounded text-black min-w-[160px] right-0 z-50">
                  <Link href="/about" className="block px-4 py-2 hover:bg-blue-100">About</Link>
                  <Link href="/contact" className="block px-4 py-2 hover:bg-blue-100">Contact</Link>
                  {isAdmin && (
                    <>
                      <Link href="/bookings" className="block px-4 py-2 hover:bg-blue-100">Bookings</Link>
                      <Link href="/staff" className="block px-4 py-2 hover:bg-blue-100">Staff</Link>
                      <Link href="/payments" className="block px-4 py-2 hover:bg-blue-100">Payments</Link>
                      <Link href="/rooms" className="block px-4 py-2 hover:bg-blue-100">Rooms</Link>
                    </>
                  )}
                  <button
                    onClick={() => {
                      localStorage.removeItem('loggedIn');
                      localStorage.removeItem('isAdmin');
                      window.location.reload();
                    }}
                    className="block w-full text-left px-4 py-2 hover:bg-red-100 text-red-600"
                  >
                    Log out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}
