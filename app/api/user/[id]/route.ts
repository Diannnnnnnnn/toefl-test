import { NextRequest, NextResponse } from 'next/server';
import mysql from 'mysql2/promise';
import jwt from 'jsonwebtoken';

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_DATABASE || 'toefl',
});

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export async function GET(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  let connection;
  try {
    const authHeader = req.headers.get('authorization');
    console.log('Received Authorization header:', authHeader); // Debug

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ message: 'Unauthorized: No token provided' }, { status: 401 });
    }

    const token = authHeader.split(' ')[1];
    console.log('Extracted token:', token); // Debug

    if (!token) {
      return NextResponse.json({ message: 'Unauthorized: Empty token' }, { status: 401 });
    }

    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
    console.log('Decoded token:', decoded); // Debug

    // Await params to get the id
    const { id } = await context.params;

    if (decoded.userId !== id) {
      return NextResponse.json({ message: 'Unauthorized: Invalid token' }, { status: 401 });
    }

    if (!id) {
      return NextResponse.json({ message: 'User ID is required' }, { status: 400 });
    }

    connection = await pool.getConnection();
    const [rows] = await connection.execute('SELECT full_name FROM users WHERE id = ?', [id]) as [any[], any];

    if (Array.isArray(rows) && rows.length > 0) {
      return NextResponse.json({ fullName: rows[0].full_name });
    }

    return NextResponse.json({ message: 'User not found' }, { status: 404 });
  } catch (error: any) {
    console.error('Error fetching user:', error);
    if (error.name === 'JsonWebTokenError') {
      return NextResponse.json({ message: `Unauthorized: Invalid token - ${error.message}` }, { status: 401 });
    }
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  } finally {
    if (connection) connection.release();
  }
}