import React from 'react';
import AudioPlayer from '../../components/Audioplayer/page';
import { useUser } from '@/app/UserContext';
export default function ListeningPractice() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Latihan Listening TOEFL ITP</h1>
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Percakapan Pendek</h2>
        <div className="mt-4">
          <p className="mb-2">Pertanyaan: Apa topik utama percakapan?</p>
          <ul className="list-disc pl-5">
            <li>
              <input type="radio" name="answer" className="mr-2" />
              A. Rencana liburan
            </li>
            <li>
              <input type="radio" name="answer" className="mr-2" />
              B. Jadwal kuliah
            </li>
            <li>
              <input type="radio" name="answer" className="mr-2" />
              C. Pekerjaan baru
            </li>
            <li>
              <input type="radio" name="answer" className="mr-2" />
              D. Belanja mingguan
            </li>
          </ul>
          <button className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
            Submit Jawaban
          </button>
        </div>
      </div>
    </div>
  );
}