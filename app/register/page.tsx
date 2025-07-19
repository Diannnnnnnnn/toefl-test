"use client";

import React, { useState, FormEvent } from 'react';
import Link from 'next/link';
import { BookOpen, CheckCircle, ArrowRight } from 'lucide-react';
import Navbar from '../Navbar';

interface FormData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function SignUp() {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setError('');
    // Add signup logic here (e.g., API call)
    console.log('Form submitted:', formData);
  };

  return (
    <div className="min-h-screen bg-slate-50">
    <Navbar />
      {/* Main Content */}
      <section className="relative pt-24 pb-20 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-50 via-white to-cyan-50"></div>
          <div className="absolute top-20 right-0 w-96 h-96 bg-gradient-to-br from-blue-100/40 to-cyan-100/40 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-br from-emerald-100/40 to-teal-100/40 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-md mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-black mb-6 text-slate-800">
              Daftar ke TOEFL ITP Pro
            </h1>
            <p className="text-xl text-slate-600 mb-8">
              Bergabung gratis dan mulai perjalanan Anda menuju skor TOEFL ITP impian!
            </p>

            <div className="bg-white p-8 rounded-3xl shadow-lg border border-slate-200/50 backdrop-blur-sm">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-slate-700 mb-2">
                    Nama Lengkap
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-slate-50 text-slate-800"
                    placeholder="Masukkan nama lengkap"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-slate-50 text-slate-800"
                    placeholder="Masukkan email"
                  />
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-2">
                    Kata Sandi
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-slate-50 text-slate-800"
                    placeholder="Masukkan kata sandi"
                  />
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-slate-700 mb-2">
                    Konfirmasi Kata Sandi
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-slate-50 text-slate-800"
                    placeholder="Konfirmasi kata sandi"
                  />
                </div>

                {error && (
                  <p className="text-red-500 text-sm font-medium">{error}</p>
                )}

                <button
                  type="submit"
                  className="w-full px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-2xl font-bold text-lg hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl flex items-center justify-center"
                >
                  Daftar Sekarang
                  <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform" />
                </button>
              </form>

              <p className="mt-6 text-slate-600">
                Sudah punya akun?{' '}
                <Link href="/login" className="text-blue-600 hover:text-blue-700 font-semibold">
                  Masuk
                </Link>
              </p>
            </div>

            {/* Benefits Preview */}
            <div className="grid grid-cols-2 gap-4 mt-8 text-sm">
              <div className="flex items-center text-slate-600">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                <span>100% Gratis</span>
              </div>
              <div className="flex items-center text-slate-600">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                <span>Akses Selamanya</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}