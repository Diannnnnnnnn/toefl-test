"use client";

import React, { useState, FormEvent } from 'react';
import Link from 'next/link';
import { BookOpen, CheckCircle, ArrowRight } from 'lucide-react';
import Navbar from '../Navbar';
import { useRouter } from 'next/navigation';

interface FormData {
  email: string;
  password: string;
}

export default function SignIn() {
  const [formData, setFormData] = useState<FormData>({ email: '', password: '' });
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        throw new Error(data?.message || 'Server error');
      }

      const data = await response.json();
      console.log('SignIn response:', data); // Debug
      if (!data.token || !data.userId) {
        throw new Error('Invalid response from server: token or userId missing');
      }
      localStorage.setItem('token', data.token);
      localStorage.setItem('userId', data.userId);
      console.log('Stored token:', localStorage.getItem('token')); // Debug
      console.log('Stored userId:', localStorage.getItem('userId')); // Debug
      setSuccess('Login successful! Redirecting...');
      // Redirect ke dashboard dan refresh setelah 1ms
      router.push('/dashboard');
      setTimeout(() => {
        router.refresh(); // Refresh state klien untuk memastikan dashboard dimuat
      }, 0,1);
    } catch (err: any) {
      setError(err.message || 'Failed to login. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <section className="relative pt-24 pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-50 via-white to-cyan-50"></div>
          <div className="absolute top-20 right-0 w-96 h-96 bg-gradient-to-br from-blue-100/40 to-cyan-100/40 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-br from-emerald-100/40 to-teal-100/40 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-md mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-black mb-6 text-slate-800">
              Masuk ke TOEFL ITP Pro
            </h1>
            <p className="text-xl text-slate-600 mb-8">
              Akses platform pembelajaran Anda dan lanjutkan perjalanan menuju skor TOEFL ITP impian!
            </p>

            <div className="bg-white p-8 rounded-3xl shadow-lg border border-slate-200/50 backdrop-blur-sm">
              <form onSubmit={handleSubmit} className="space-y-6">
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

                {error && <p className="text-red-500 text-sm font-medium" role="alert">{error}</p>}
                {success && <p className="text-green-500 text-sm font-medium" role="status">{success}</p>}

                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-2xl font-bold text-lg hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl flex items-center justify-center ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {isLoading ? 'Loading...' : 'Masuk Sekarang'}
                  {!isLoading && <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform" />}
                </button>
              </form>

              <p className="mt-6 text-slate-600">
                Belum punya akun?{' '}
                <Link href="/register" className="text-blue-600 hover:text-blue-700 font-semibold">
                  Daftar
                </Link>
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-8 text-sm">
              <div className="flex items-center text-slate-600">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                <span>Akses Instan</span>
              </div>
              <div className="flex items-center text-slate-600">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                <span>Dukungan 24/7</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}