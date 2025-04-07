'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useState } from 'react';

export default function Contact() {
  const router = useRouter();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000); // Reset confirmation message
  };

  return (
    <>
      {/* Navbar */}
      <nav className="bg-black px-6 py-4 text-white shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold">Delmaro</Link>
          <div className="flex gap-6 text-sm">
            <Link href="/" className="hover:text-blue-400">Home</Link>
            <Link href="/about" className="hover:text-blue-400">About</Link>
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

      <section className="w-full min-h-screen bg-gradient-to-br from-white to-blue-50 px-6 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-blue-800 mb-4 flex justify-center items-center gap-2">
            📬 Contact Us
          </h2>
          <p className="text-lg text-gray-700 mb-10">
            Have questions, feedback, or need help with your reservation? Fill out the form and our team will get back to you shortly.
          </p>

          <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-lg space-y-6 text-left">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
              required
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
              required
            />
            <textarea
              placeholder="Your Message"
              rows="5"
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
              required
            ></textarea>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
            >
              ✉️ Send Message
            </button>

            {submitted && (
              <p className="text-green-600 font-medium mt-4 text-center">
                ✅ Message sent successfully! We'll be in touch soon.
              </p>
            )}
          </form>

          <div className="mt-12 text-gray-500 text-sm">
            Or reach us directly: <br />
            📞 <span className="font-semibold">+387 33 123 456</span> &nbsp;|&nbsp;
            ✉️ <span className="font-semibold">support@delmaro.com</span>
          </div>
        </div>
      </section>
    </>
  );
}
