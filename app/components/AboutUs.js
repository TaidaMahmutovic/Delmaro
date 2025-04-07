export default function AboutUs() {
  return (
    <section className="w-full min-h-screen bg-white px-6 py-12">
      <div className="w-full max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-blue-700 mb-6">About Delmaro</h2>

        <p className="text-gray-700 mb-4 text-lg">
          <strong>Delmaro</strong> is your trusted partner for booking comfortable, stylish, and affordable hotel rooms.
          Whether you're traveling for work or vacation, we aim to provide a seamless experience from browsing to booking.
        </p>

        <p className="text-gray-700 mb-4 text-lg">
          With a curated selection of hotels, transparent pricing, and user-friendly tools, Delmaro makes travel planning
          stress-free and enjoyable. We focus on quality, convenience, and customer satisfaction.
        </p>

        <hr className="my-6 border-t border-gray-300" />

        <div className="bg-blue-50 p-6 rounded-lg shadow mb-10">
          <h3 className="text-2xl font-semibold text-blue-900 mb-3">🌟 Our Values</h3>
          <ul className="list-disc list-inside space-y-2 text-gray-800">
            <li>Comfort and reliability in every booking</li>
            <li>Transparent and competitive pricing</li>
            <li>Responsive and friendly customer support</li>
            <li>Secure platform with real guest reviews</li>
            <li>Continuous improvement through feedback</li>
          </ul>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white border p-6 rounded-lg shadow-sm hover:shadow-lg transition">
            <h4 className="text-xl font-semibold text-blue-800 mb-2">💼 Business & Leisure</h4>
            <p className="text-gray-600">
              Whether it's a quick business trip or a relaxing holiday, Delmaro offers rooms tailored for every occasion.
            </p>
          </div>

          <div className="bg-white border p-6 rounded-lg shadow-sm hover:shadow-lg transition">
            <h4 className="text-xl font-semibold text-blue-800 mb-2">🧭 Easy Navigation</h4>
            <p className="text-gray-600">
              Enjoy an intuitive platform that makes finding the perfect stay quick and easy, even on your phone.
            </p>
          </div>

          <div className="bg-white border p-6 rounded-lg shadow-sm hover:shadow-lg transition">
            <h4 className="text-xl font-semibold text-blue-800 mb-2">🔒 Trusted & Secure</h4>
            <p className="text-gray-600">
              Book with confidence knowing your data is protected and your stay is secured by verified hosts.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
