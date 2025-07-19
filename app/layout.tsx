import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'TOEFL ITP Pro',
  description: 'Platform pembelajaran interaktif untuk persiapan TOEFL ITP dengan latihan Listening, Structure, dan Reading.',
  openGraph: {
    title: 'TOEFL ITP Pro',
    description: 'Kuasai TOEFL ITP dengan latihan interaktif dan teknologi AI!',
    url: 'https://toefl-itp-pro.com',
    images: ['/og-image.jpg'],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body className={inter.className}>{children}</body>
    </html>
  );
}