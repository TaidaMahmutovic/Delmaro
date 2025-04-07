import '../styles/globals.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';



export const metadata = {
  title: 'My Hotel',
  description: 'Hotel Booking Platform',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning> {/* ✅ prevent hydration mismatch */}
      <body className="flex flex-col min-h-screen bg-white text-gray-800">
        {/* ✅ Wrap Navbar + Footer in div to prevent hydration mismatch */}
        <div suppressHydrationWarning>
          <Navbar />
        </div>
        <main className="flex-grow">{children}</main>
        <div suppressHydrationWarning>
          <Footer />
        </div>
      </body>
    </html>
  );
}
