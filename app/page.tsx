"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Headphones, BookOpen, FileText, Star, Users, Trophy, Zap, Play, ArrowRight, CheckCircle } from 'lucide-react';
import Navbar from './Navbar';

const testimonials = [
  { name: 'Sarah Chen', score: '640', text: 'Platform ini benar-benar membantu saya mencapai target skor TOEFL ITP!', role: 'Mahasiswa UI' },
  { name: 'Ahmad Rahman', score: '610', text: 'Latihan yang interaktif dan mudah dipahami. Sangat recommended!', role: 'Fresh Graduate' },
  { name: 'Maria Santos', score: '580', text: 'Fitur listening-nya sangat membantu meningkatkan kemampuan mendengar saya.', role: 'Professional' },
];

const stats = [
  { icon: Users, value: '50K+', label: 'Siswa Aktif' },
  { icon: Trophy, value: '95%', label: 'Tingkat Keberhasilan' },
  { icon: Star, value: '4.9', label: 'Rating Platform' },
  { icon: Zap, value: '24/7', label: 'Akses Materi' },
];

const features = [
  {
    icon: Headphones,
    title: 'Listening Comprehension',
    description: 'Audio berkualitas tinggi dengan berbagai aksen dan konteks. Dilengkapi dengan subtitle interaktif dan analisis jawaban real-time.',
    color: 'from-blue-500 to-cyan-500',
    bgColor: 'from-blue-900/30',
    borderColor: 'border-blue-500/20',
    textColor: 'text-blue-400',
    hoverColor: 'group-hover:text-blue-300',
    link: '/listening'
  },
  {
    icon: FileText,
    title: 'Structure & Expression',
    description: 'Sistem pembelajaran grammar dengan AI yang menganalisis pola kesalahan dan memberikan penjelasan detail setiap aturan tata bahasa.',
    color: 'from-emerald-500 to-teal-500',
    bgColor: 'from-emerald-900/30',
    borderColor: 'border-emerald-500/20',
    textColor: 'text-emerald-400',
    hoverColor: 'group-hover:text-emerald-300',
    link: '/structure'
  },
  {
    icon: BookOpen,
    title: 'Reading Comprehension',
    description: 'Teks akademik dengan tingkat kesulitan bertingkat. Fitur highlight vocabulary dan speed reading tracker untuk meningkatkan efisiensi membaca.',
    color: 'from-amber-500 to-orange-500',
    bgColor: 'from-amber-900/30',
    borderColor: 'border-amber-500/20',
    textColor: 'text-amber-400',
    hoverColor: 'group-hover:text-amber-300',
    link: '/reading'
  }
];

const benefits = [
  'Materi pembelajaran terstruktur dan komprehensif',
  'Simulasi ujian dengan timing yang akurat',
  'Analisis detail untuk setiap jawaban salah',
  'Progress tracking dan laporan pembelajaran',
  'Akses unlimited ke semua materi latihan',
  'Dukungan dari instruktur berpengalaman'
];

export default function ModernToeflHomepage() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-24 pb-20 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-50 via-white to-cyan-50"></div>
          <div className="absolute top-20 right-0 w-96 h-96 bg-gradient-to-br from-blue-100/40 to-cyan-100/40 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-br from-emerald-100/40 to-teal-100/40 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <div className={`text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="inline-flex items-center px-4 py-2 bg-blue-100/80 border border-blue-200/50 rounded-full text-blue-700 text-sm font-medium mb-8 backdrop-blur-sm">
              <Star className="w-4 h-4 mr-2 fill-current" />
              Platform TOEFL ITP Terpercaya #1 di Indonesia
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black mb-8 leading-tight">
              <span className="bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 bg-clip-text text-transparent">
                Raih Skor TOEFL ITP
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-700 bg-clip-text text-transparent">
                Impian Anda
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-slate-600 mb-12 max-w-4xl mx-auto leading-relaxed">
              Platform pembelajaran komprehensif dengan metode terbukti yang telah membantu 
              <span className="font-semibold text-blue-600"> ribuan siswa </span> 
              mencapai target skor TOEFL ITP mereka
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Link
                href="/listening"
                className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-2xl font-bold text-lg hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl flex items-center"
              >
                <Play className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" />
                Mulai Latihan Gratis
                <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <button className="px-8 py-4 border-2 border-slate-300 text-slate-700 rounded-2xl font-bold text-lg hover:bg-slate-50 hover:border-slate-400 transition-all duration-300">
                Lihat Video Demo
              </button>
            </div>

            {/* Benefits Preview */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-3xl mx-auto text-sm">
              <div className="flex items-center text-slate-600">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                <span>100% Gratis</span>
              </div>
              <div className="flex items-center text-slate-600">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                <span>Tanpa Batas Waktu</span>
              </div>
              <div className="flex items-center text-slate-600">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                <span>Sertifikat Resmi</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className={`text-center transition-all duration-700 delay-${index * 100} ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-2xl flex items-center justify-center shadow-lg">
                  <stat.icon className="w-8 h-8 text-blue-600" />
                </div>
                <div className="text-3xl font-black text-slate-800 mb-2">{stat.value}</div>
                <div className="text-slate-600 text-sm font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-6 text-slate-800">
              Fitur Pembelajaran Terlengkap
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Tiga komponen utama TOEFL ITP dengan metode pembelajaran interaktif dan analisis mendalam
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`group relative p-8 bg-gradient-to-br ${feature.bgColor} to-transparent border ${feature.borderColor} rounded-3xl backdrop-blur-sm hover:scale-105 transition-all duration-500 overflow-hidden bg-white shadow-lg hover:shadow-xl`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-slate-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="relative z-10">
                  <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className={`text-2xl font-bold text-slate-800 mb-4 ${feature.hoverColor} transition-colors`}>
                    {feature.title}
                  </h3>
                  
                  <p className="text-slate-600 mb-6 leading-relaxed">
                    {feature.description}
                  </p>
                  
                  <Link
                    href={feature.link}
                    className={`flex items-center ${feature.textColor} font-semibold ${feature.hoverColor} transition-colors`}
                  >
                    Mulai Latihan
                    <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-black mb-6 text-slate-800">
                Mengapa Memilih Platform Kami?
              </h2>
              <p className="text-xl text-slate-600 mb-8">
                Lebih dari sekadar latihan soal - dapatkan pengalaman pembelajaran yang komprehensif dan efektif
              </p>
              
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-green-500 mr-4 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700 font-medium">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-600 to-cyan-600 rounded-3xl p-8 text-white shadow-2xl">
                <h3 className="text-2xl font-bold mb-6">Statistik Keberhasilan</h3>
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span>Peningkatan Skor Rata-rata</span>
                      <span className="font-bold">+120 Poin</span>
                    </div>
                    <div className="w-full bg-white/20 rounded-full h-2">
                      <div className="bg-white rounded-full h-2 w-4/5"></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-2">
                      <span>Tingkat Kepuasan</span>
                      <span className="font-bold">98%</span>
                    </div>
                    <div className="w-full bg-white/20 rounded-full h-2">
                      <div className="bg-white rounded-full h-2 w-full"></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-2">
                      <span>Rekomendasi Pengguna</span>
                      <span className="font-bold">96%</span>
                    </div>
                    <div className="w-full bg-white/20 rounded-full h-2">
                      <div className="bg-white rounded-full h-2 w-5/6"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-4xl font-black mb-4 text-slate-800">
            Apa Kata Mereka?
          </h2>
          <p className="text-xl text-slate-600 mb-16">
            Dengar langsung dari siswa yang telah berhasil mencapai target skor mereka
          </p>
          
          <div className="relative max-w-4xl mx-auto">
            <div className="relative h-64 sm:h-56">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-all duration-500 ${
                    index === currentTestimonial ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                >
                  <div className="p-8 bg-white border border-slate-200 rounded-3xl shadow-lg">
                    <p className="text-xl text-slate-700 mb-6 leading-relaxed font-medium">
                      "{testimonial.text}"
                    </p>
                    <div className="flex items-center justify-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                        {testimonial.name[0]}
                      </div>
                      <div className="text-left">
                        <div className="text-slate-800 font-bold">{testimonial.name}</div>
                        <div className="text-slate-500 text-sm">{testimonial.role}</div>
                        <div className="text-blue-600 font-semibold">Skor: {testimonial.score}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex justify-center space-x-2 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentTestimonial ? 'bg-blue-600 scale-125' : 'bg-slate-300 hover:bg-slate-400'
                  }`}
                  onClick={() => setCurrentTestimonial(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-cyan-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-black mb-6">
            Mulai Perjalanan Sukses Anda Hari Ini
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Bergabung dengan ribuan siswa yang telah berhasil meningkatkan skor TOEFL ITP mereka. 
            100% gratis, tanpa biaya tersembunyi.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/register"
              className="px-10 py-4 bg-white text-blue-600 rounded-2xl font-bold text-lg hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl"
            >
              Daftar Sekarang - GRATIS
            </Link>
            
            <Link
              href="/demo"
              className="px-8 py-4 border-2 border-white/30 text-white rounded-2xl font-bold text-lg hover:bg-white/10 transition-all duration-300"
            >
              Coba Demo
            </Link>
          </div>
          
          <p className="text-sm opacity-75 mt-6">
            ✓ Tanpa kartu kredit   ✓ Akses selamanya   ✓ Dukungan 24/7
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold">TOEFL ITP Pro</span>
              </div>
              <p className="text-slate-400 mb-6 max-w-md">
                Platform pembelajaran TOEFL ITP terpercaya dengan metode terbukti untuk membantu Anda mencapai skor impian.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-slate-400 hover:text-white transition-colors">Facebook</a>
                <a href="#" className="text-slate-400 hover:text-white transition-colors">Instagram</a>
                <a href="#" className="text-slate-400 hover:text-white transition-colors">Twitter</a>
                <a href="#" className="text-slate-400 hover:text-white transition-colors">LinkedIn</a>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Platform</h3>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors">Fitur</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Harga</a></li>
                <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Dukungan</h3>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors">Bantuan</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Kontak</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Kebijakan Privasi</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Syarat & Ketentuan</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-slate-800 mt-12 pt-8 text-center">
            <p className="text-slate-400">
              © 2025 TOEFL ITP Pro. All rights reserved. | 
              <a href="mailto:support@toeflitp.com" className="text-blue-400 hover:text-blue-300 ml-1">
                support@toeflitp.com
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}