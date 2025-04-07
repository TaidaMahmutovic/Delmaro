'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import AboutUs from '../components/AboutUs'
import Footer from '../components/Footer';
export default function AboutPage() {
  const router = useRouter()

  return (
    <>
       {/* Navbar */}
       <nav className="bg-black px-4 py-3 text-white shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/" className="text-xl font-bold">Delmaro</Link>
          <div className="flex gap-6 text-sm">
            <Link href="/" className="hover:text-blue-400">Home</Link>
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

      {/* About Content */}
      <main className="p-8">
        <AboutUs />
      </main>
      <Footer/>
    </>
  )
}
