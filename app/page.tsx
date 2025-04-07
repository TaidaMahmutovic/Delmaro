'use client';
import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

const adminCredentials = {
  email: 'admin@delmaro.com',
  password: 'admin123',
};

const availableRooms = [
  {
    name: 'Luxury Suite',
    price: 250,
    description: 'Elegant suite with a jacuzzi and balcony view.',
    image: '/luxury-suite.png',
  },
  {
    name: 'Cozy Budget Room',
    price: 89,
    description: 'Simple room with all essentials for a quick stay.',
    image: '/budget-room.png',
  },
  {
    name: 'Ocean View Room',
    price: 180,
    description: 'Wake up to a stunning ocean view and sea breeze.',
    image: '/ocean-view.png',
  },
  {
      name: 'Standard Single Room',
      price: 70,
      description: 'Comfortable room for solo travelers with a single bed and workspace.',
      image: '/single-room.png',
    },
    {
      name: 'Standard Double Room',
      price: 100,
      description: 'Spacious room with a queen-sized bed, perfect for couples.',
      image: '/double -room.png',
    },
    {
      name: 'Twin Room',
      price: 95,
      description: 'Two single beds ideal for friends or colleagues.',
      image: '/twin-room.png',
    },
    {
      name: 'Family Room',
      price: 130,
      description: 'Large room with multiple beds for families with children.',
      image: '/family-room.png',
    },
    {
      name: 'Deluxe King Room',
      price: 150,
      description: 'Elegant room with a king-sized bed, sofa, and city view.',
      image: '/deluxe-room.png',
    },
    {
      name: 'Accessible Room',
      price: 90,
      description: 'Fully equipped for accessibility with wider doorways and safety bars.',
      image: '/accessible-room.png',
    }
  ];
  

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [mode, setMode] = useState('register');
  const [registeredUser, setRegisteredUser] = useState(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    password: '',
  });

  useEffect(() => {
    const loggedIn = localStorage.getItem('loggedIn');
    if (loggedIn === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (
      formData.firstName &&
      formData.lastName &&
      formData.email &&
      formData.phone &&
      formData.address &&
      formData.password
    ) {
      setRegisteredUser(formData);
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        password: '',
      });
      setMode('login');
      alert('✅ Registered successfully! Now log in.');
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();

    // ✅ Admin login
    if (
      formData.email === adminCredentials.email &&
      formData.password === adminCredentials.password
    ) {
      localStorage.setItem('loggedIn', 'true');
      localStorage.setItem('isAdmin', 'true');
      setIsAuthenticated(true);
      return;
    }

    // ✅ Regular user login
    if (
      registeredUser &&
      formData.email === registeredUser.email &&
      formData.password === registeredUser.password
    ) {
      localStorage.setItem('loggedIn', 'true');
      localStorage.setItem('isAdmin', 'false');
      setIsAuthenticated(true);
    } else {
      alert('❌ Invalid credentials.');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <form
          onSubmit={mode === 'register' ? handleRegister : handleLogin}
          className="bg-white p-8 rounded-xl shadow-md w-full max-w-md space-y-4"
        >
          <h2 className="text-2xl font-bold text-center text-blue-800">
            {mode === 'register' ? 'Register' : 'Login'}
          </h2>

          {mode === 'register' && (
            <>
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                className="w-full border border-gray-300 p-2 rounded"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                className="w-full border border-gray-300 p-2 rounded"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                className="w-full border border-gray-300 p-2 rounded"
                value={formData.phone}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="address"
                placeholder="Address"
                className="w-full border border-gray-300 p-2 rounded"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </>
          )}

          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full border border-gray-300 p-2 rounded"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full border border-gray-300 p-2 rounded"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <button className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700">
            {mode === 'register' ? 'Register' : 'Login'}
          </button>

          <p className="text-center text-sm text-gray-500">
            {mode === 'register' ? (
              <>
                Already have an account?{' '}
                <span
                  onClick={() => setMode('login')}
                  className="text-blue-600 cursor-pointer underline"
                >
                  Login here
                </span>
              </>
            ) : (
              <>
                Don’t have an account?{' '}
                <span
                  onClick={() => setMode('register')}
                  className="text-blue-600 cursor-pointer underline"
                >
                  Register now
                </span>
              </>
            )}
          </p>
        </form>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <main className="flex-grow">
        <section className="px-6 py-12 max-w-7xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-blue-900 mb-6">
            Welcome to Delmaro
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-10">
            Discover premium comfort, trending rooms, and affordable luxury all
            in one place.
            <br />
            Logged in as: <strong>{registeredUser?.email}</strong>
          </p>
        </section>

        <section className="px-6 py-12 max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-blue-800 mb-8 text-center">
            Available Rooms
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {availableRooms.map((room, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-md overflow-hidden"
              >
                <img
                  src={room.image}
                  alt={room.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6 text-left">
                  <h3 className="text-xl font-semibold text-blue-700">
                    {room.name}
                  </h3>
                  <p className="text-sm text-gray-500">${room.price}/night</p>
                  <p className="text-gray-600 mt-2">{room.description}</p>
                  <a
                    href={`/reservation?room=${encodeURIComponent(room.name)}`}
                    className="mt-4 inline-block bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
                  >
                    Reserve
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
