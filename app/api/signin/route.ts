import { NextRequest, NextResponse } from 'next/server';
import mysql from 'mysql2/promise';
import bcrypt from 'bcrypt';

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_DATABASE || 'toefl'
};

interface SigninRequest {
  email: string;
  password: string;
}

export async function POST(req: NextRequest) {
  try {
    const body: SigninRequest = await req.json();

    console.log('Received signin body:', body); // Debug log

    if (!body.email || !body.password) {
      return NextResponse.json(
        { message: 'Email and password are required' },
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

    const connection = await mysql.createConnection(dbConfig);
    console.log('Database connection established'); // Debug log

    try {
      const [rows] = await connection.execute(
        'SELECT * FROM users WHERE email = ?',
        [body.email]
      ) as [any[], any];

      if (Array.isArray(rows) && rows.length === 0) {
        await connection.end();
        return NextResponse.json(
          { message: 'Invalid email or password' },
          { status: 401 }
        );
      }

      const user = rows[0] as { id: number; password: string };
      const isMatch = await bcrypt.compare(body.password, user.password);

      if (!isMatch) {
        await connection.end();
        return NextResponse.json(
          { message: 'Invalid email or password' },
          { status: 401 }
        );
      }

      await connection.end();
      console.log('Login successful for user:', user.id); // Debug log

      return NextResponse.json(
        { message: 'Login successful', userId: user.id },
        { status: 200 }
      );
    } catch (dbError: any) {
      await connection.end();
      console.error('Database error:', dbError); // Debug log
      throw dbError;
    }
  } catch (error: any) {
    console.error('Signin error:', error); // Enhanced error logging
    return NextResponse.json(
      { message: 'Internal server error: ' + (error.message || 'Unknown error') },
      { status: 500 }
    );
  }
}