"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Headphones, Book, Layout, CheckCircle, Menu, X } from 'lucide-react';

export default function DashboardSidebar() {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="fixed top-16 h-[calc(100vh-4rem)] z-40 bg-white shadow-md border-r border-slate-200/50 transition-all duration-300">
      <div className="w-64 max-w-xs">
        <button
          onClick={toggleSidebar}
          className="p-4 text-slate-600 hover:text-blue-600 md:hidden flex items-center justify-center w-full"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
        <div
          className={`flex flex-col space-y-1 p-4 ${isOpen ? 'block' : 'hidden md:block'}`}
        >
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-slate-800">Menu</h2>
          </div>
          <Link
            href="/dashboard/listening"
            className="flex items-center space-x-3 p-2 rounded-lg hover:bg-slate-100 text-slate-700 hover:text-blue-600 transition-colors"
          >
            <Headphones className="w-5 h-5" />
            <span>Listening</span>
          </Link>
          <Link
            href="/dashboard/reading"
            className="flex items-center space-x-3 p-2 rounded-lg hover:bg-slate-100 text-slate-700 hover:text-blue-600 transition-colors"
          >
            <Book className="w-5 h-5" />
            <span>Reading</span>
          </Link>
          <Link
            href="/dashboard/structure"
            className="flex items-center space-x-3 p-2 rounded-lg hover:bg-slate-100 text-slate-700 hover:text-blue-600 transition-colors"
          >
            <Layout className="w-5 h-5" />
            <span>Structure</span>
          </Link>
          <Link
            href="/dashboard/progress"
            className="flex items-center space-x-3 p-2 rounded-lg hover:bg-slate-100 text-slate-700 hover:text-blue-600 transition-colors"
          >
            <CheckCircle className="w-5 h-5" />
            <span>Progress</span>
          </Link>
        </div>
      </div>
    </div>
  );
}