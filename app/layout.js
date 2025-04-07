import '../styles/globals.css';

export const metadata = {
  title: 'My Hotel',
  description: 'Hotel Reservation App',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="flex flex-col min-h-screen bg-white text-gray-800">
        <div suppressHydrationWarning>
          {children}
        </div>
      </body>
    </html>
  );
}
