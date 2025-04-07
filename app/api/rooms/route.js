import { db } from '../../lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  const [rows] = await db.execute('SELECT * FROM rooms');
  return NextResponse.json(rows);
}
