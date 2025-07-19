import { NextRequest, NextResponse } from 'next/server';
import mysql from 'mysql2/promise';
import bcrypt from 'bcrypt';

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_DATABASE || 'toefl'
});

interface SignupRequest {
  fullName: string;
  email: string;
  password: string;
}

export async function POST(req: NextRequest) {
  try {
    const body: SignupRequest = await req.json();

    if (!body.fullName || !body.email || !body.password) {
      return NextResponse.json(
        { message: 'Full name, email, and password are required' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { message: 'Invalid email format' },
        { status: 400 }
      );
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(body.password, saltRounds);

    const connection = await pool.getConnection();
    try {
      await connection.execute(
        'INSERT INTO users (full_name, email, password) VALUES (?, ?, ?)',
        [body.fullName, body.email, hashedPassword]
      );

      await connection.end();
      return NextResponse.json(
        { message: 'User registered successfully' },
        { status: 201 }
      );
    } catch (dbError: any) {
      await connection.end();
      if (dbError.code === 'ER_DUP_ENTRY') {
        return NextResponse.json(
          { message: 'Email already registered' },
          { status: 409 }
        );
      }
      throw dbError;
    }
  } catch (error: any) {
    console.error('Signup error:', error);
    return NextResponse.json(
      { message: 'Internal server error: ' + (error.message || 'Unknown error') },
      { status: 500 }
    );
  }
}