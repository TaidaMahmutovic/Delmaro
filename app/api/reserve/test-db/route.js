import { db } from '@/lib/db'; // ✅ works if db.js is in /app/lib/


export async function GET() {
  try {
    const db = await connectDB();
    const [rows] = await db.execute('SELECT * FROM bookings LIMIT 5');
    return new Response(JSON.stringify(rows), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
