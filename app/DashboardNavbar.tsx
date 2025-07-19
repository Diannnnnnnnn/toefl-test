"use client";

import React from 'react';
import Link from 'next/link';
import { LogOut } from 'lucide-react';
import { useUser } from './UserContext';
import { useRouter } from 'next/navigation';

export default function DashboardNavbar({ userId }: { userId: string }) {
  const { userName, loading } = useUser();
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('token');
    router.push('/login');
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-white shadow-sm border-b border-slate-200/50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex space-x-6 flex-1">
          <span className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
            TOEFL ITP Pro
          </span>
        </div>
        <div className="flex items-center space-x-6">
          <span className="text-sm font-medium text-slate-700 hidden md:inline">
            Selamat datang, {loading ? 'Memuat...' : userName}
          </span>
          <Link
            href="/profile"
            className="text-sm font-medium text-slate-700 hover:text-blue-600 transition-colors hidden md:inline"
          >
            Profil
          </Link>
          <button
            onClick={handleLogout}
            className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all duration-200 shadow-md hover:shadow-lg flex items-center"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}