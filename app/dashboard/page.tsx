"use client";

import React from 'react';
import Link from 'next/link';
import DashboardNavbar from '../DashboardNavbar';
import DashboardSidebar from '../DashboardSidebar';
import { UserProvider, useUser } from '../UserContext';

export default function DashboardPage() {
  return (
    <UserProvider>
      <Dashboard />
    </UserProvider>
  );
}

function Dashboard() {
  const { userName, userId, loading } = useUser();

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <p className="text-slate-600 text-lg font-medium">Memuat...</p>
      </div>
    );
  }

  if (!userId) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <p className="text-red-500 text-lg font-medium">Sesi telah berakhir. Silakan masuk kembali.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <DashboardNavbar userId={userId} />
      <DashboardSidebar />
      <div className="ml-64 pt-26 p-6">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800 mb-4">
            Selamat Datang, {userName}!
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Mulai perjalanan Anda menuju skor TOEFL ITP impian dengan latihan terstruktur.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Link href="/dashboard/listening" className="block">
            <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-200/50 hover:shadow-xl transition-shadow duration-300 flex items-center justify-center text-center h-48">
              <h2 className="text-2xl font-semibold text-slate-800">Listening</h2>
              <p className="text-base text-slate-600 mt-2">Latihan mendengarkan</p>
            </div>
          </Link>

          <Link href="/dashboard/reading" className="block">
            <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-200/50 hover:shadow-xl transition-shadow duration-300 flex items-center justify-center text-center h-48">
              <h2 className="text-2xl font-semibold text-slate-800">Reading</h2>
              <p className="text-base text-slate-600 mt-2">Latihan membaca</p>
            </div>
          </Link>

          <Link href="/dashboard/structure" className="block">
            <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-200/50 hover:shadow-xl transition-shadow duration-300 flex items-center justify-center text-center h-48">
              <h2 className="text-2xl font-semibold text-slate-800">Structure</h2>
              <p className="text-base text-slate-600 mt-2">Latihan struktur</p>
            </div>
          </Link>
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/dashboard/progress"
            className="px-8 py-3 text-lg bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-cyan-700 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            Lihat Progress
          </Link>
        </div>
      </div>
    </div>
  );
}