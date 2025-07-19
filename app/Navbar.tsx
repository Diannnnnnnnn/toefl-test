"use client";

import Link from 'next/link';
import { BookOpen } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-xl flex items-center justify-center shadow-lg">
              <BookOpen className="w-6 h-6 text-white" aria-hidden="true" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
              TOEFL ITP Pro
            </span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="/" className="text-slate-600 hover:text-blue-600 font-medium transition-colors" aria-label="Fitur">
              Fitur
            </a>
            <a href="/" className="text-slate-600 hover:text-blue-600 font-medium transition-colors" aria-label="Testimoni">
              Testimoni
            </a>
            <Link href="/login" className="text-slate-600 hover:text-blue-600 font-medium transition-colors" aria-label="Masuk">
              Masuk
            </Link>
            <Link 
              href="/register" 
              className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl font-semibold hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
              aria-label="Daftar gratis"
            >
              Daftar Gratis
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}