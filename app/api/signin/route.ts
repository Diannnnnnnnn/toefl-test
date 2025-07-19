import { NextRequest, NextResponse } from 'next/server';
import mysql from 'mysql2/promise';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_DATABASE || 'toefl',
});

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

interface SigninRequest {
  email: string;
  password: string;
}

export async function POST(req: NextRequest) {
  let connection;
  try {
    const body: SigninRequest = await req.json();

    if (!body.email || !body.password) {
      return NextResponse.json({ message: 'Email and password are required' }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json({ message: 'Invalid email format' }, { status: 400 });
    }

    connection = await pool.getConnection();
    const [rows] = await connection.execute('SELECT * FROM users WHERE email = ?', [body.email]) as [any[], any];

    if (Array.isArray(rows) && rows.length === 0) {
      return NextResponse.json({ message: 'Invalid email or password' }, { status: 401 });
    }

    const user = rows[0] as { id: number; password: string };
    const isMatch = await bcrypt.compare(body.password, user.password);

    if (!isMatch) {
      return NextResponse.json({ message: 'Invalid email or password' }, { status: 401 });
    }

    const token = jwt.sign({ userId: user.id.toString() }, JWT_SECRET, { expiresIn: '1h' });
    console.log('Generated token:', token); // Debug

    return NextResponse.json({ message: 'Login successful', userId: user.id.toString(), token }, { status: 200 });
  } catch (error: any) {
    console.error('Signin error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  } finally {
    if (connection) connection.release();
  }
}