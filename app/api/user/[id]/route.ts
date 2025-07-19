import { NextRequest, NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_DATABASE || 'toefl',
};

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    if (!params.id) {
      return NextResponse.json({ message: 'User ID is required' }, { status: 400 });
    }

    const connection = await mysql.createConnection(dbConfig);
    const [rows] = await connection.execute(
      'SELECT full_name FROM users WHERE id = ?',
      [params.id]
    ) as [any[], any];

    await connection.end();

    if (Array.isArray(rows) && rows.length > 0) {
      return NextResponse.json({ fullName: rows[0].full_name });
    }

    return NextResponse.json({ message: 'User not found' }, { status: 404 });
  } catch (error: any) {
    console.error('Error fetching user:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}