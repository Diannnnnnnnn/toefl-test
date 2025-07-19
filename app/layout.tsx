import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'TOEFL ITP Learning Platform',
  description: 'Platform interaktif untuk latihan TOEFL ITP',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={inter.className}>
        <nav className="bg-blue-600 p-4">
          <div className="max-w-6xl mx-auto flex justify-between items-center">
            <h1 className="text-white text-xl font-bold">TOEFL ITP</h1>
            <div className="space-x-4">
              <Link href="/" className="text-white hover:underline">
                Beranda
              </Link>
              <Link href="/listening" className="text-white hover:underline">
                Listening
              </Link>
              <Link href="/structure" className="text-white hover:underline">
                Structure
              </Link>
              <Link href="/reading" className="text-white hover:underline">
                Reading
              </Link>
            </div>
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}