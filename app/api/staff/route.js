import { db } from '../../lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  const [rows] = await db.execute('SELECT * FROM staff');
  return NextResponse.json(rows);
}
