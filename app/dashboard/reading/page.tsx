"use client";

import React, { useState } from "react";
import { BookOpen } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ReadingPage() {
  const router = useRouter();
  const [selectedBook, setSelectedBook] = useState<string | null>(null); // State untuk buku yang dipilih

  // Daftar buku yang tersedia
  const books = [
    { id: "longman", name: "Longman TOEFL ITP", description: "Latihan reading dari buku Longman terpercaya." },
    { id: "official", name: "Official Guide TOEFL ITP", description: "Soal resmi dari ETS untuk persiapan terbaik." },
    { id: "custom", name: "Custom Practice", description: "Latihan reading buatan sendiri." },
  ];

  // Daftar skill untuk Longman TOEFL ITP (tanpa konten detail, hanya sebagai template)
  const skills = [
    { id: "skill1", name: "Skill 1: Answer Main Idea Questions", description: "Practice identifying the main idea of a passage." },
    { id: "skill2", name: "Skill 2: Recognize Organization of Ideas", description: "Understand the structure of a passage." },
    { id: "skill3", name: "Skill 3: Answer Stated Detail Questions", description: "Locate specific details in the text." },
    { id: "skill4", name: "Skill 4: Find Unstated Details", description: "Infer missing information." },
    { id: "skill5", name: "Skill 5: Find Pronoun Referents", description: "Identify what pronouns refer to." },
    { id: "skill6", name: "Skill 6: Answer Implied Detail Questions", description: "Infer details not directly stated." },
    { id: "skill7", name: "Skill 7: Answer Transition Questions", description: "Understand transitions between ideas." },
    { id: "skill8", name: "Skill 8: Find Definitions from Structural Clues", description: "Use clues to define words." },
    { id: "skill9", name: "Skill 9: Determine Meanings from Word Parts", description: "Break down words to find meanings." },
    { id: "skill10", name: "Skill 10: Use Context for Difficult Words", description: "Infer meanings of hard words." },
    { id: "skill11", name: "Skill 11: Use Context for Simple Words", description: "Infer meanings of easy words." },
    { id: "skill12", name: "Skill 12: Determine Location of Information", description: "Find where specific details are." },
    { id: "skill13", name: "Skill 13: Determine Tone, Purpose, or Course", description: "Identify the tone or purpose." },
  ];

  if (!selectedBook) {
    return (
      <div className="min-h-screen bg-slate-50 p-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-slate-800 mb-8 text-center">
            Reading Comprehension Dashboard
          </h1>
          <p className="text-lg text-slate-600 mb-6 text-center">
            Pilih buku latihan untuk memulai sesi reading Anda!
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {books.map((book) => (
              <div
                key={book.id}
                className="bg-white p-6 rounded-xl shadow-lg border border-slate-200 hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                onClick={() => setSelectedBook(book.id)}
              >
                <BookOpen className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h2 className="text-xl font-semibold text-slate-800 text-center mb-2">
                  {book.name}
                </h2>
                <p className="text-sm text-slate-600 text-center">
                  {book.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (selectedBook === "longman") {
    return (
      <div className="min-h-screen bg-slate-50 p-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-slate-800 mb-8 text-center">
            Longman TOEFL ITP Skills
          </h1>
          <p className="text-lg text-slate-600 mb-6 text-center">
            Pilih skill untuk memulai latihan reading!
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {skills.map((skill) => (
              <div
                key={skill.id}
                className="bg-white p-6 rounded-xl shadow-lg border border-slate-200 hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                onClick={() => router.push(`/dashboard/reading/${skill.id}`)}
              >
                <BookOpen className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h2 className="text-xl font-semibold text-slate-800 text-center mb-2">
                  {skill.name}
                </h2>
                <p className="text-sm text-slate-600 text-center line-clamp-2">
                  {skill.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-slate-800 mb-6">
          Reading Comprehension Practice
        </h1>
        <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-200">
          <p className="text-center text-slate-600">
            Halaman ini akan dikembangkan untuk setiap skill. Silakan buat file terpisah seperti `/dashboard/reading/skill1/page.tsx`, `/dashboard/reading/skill2/page.tsx`, dll.
          </p>
          <div className="mt-6 text-center">
            <button
              onClick={() => router.push("/")}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Kembali ke Dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}