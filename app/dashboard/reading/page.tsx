"use client";

import React, { useState, useEffect } from 'react';
import { useUser } from '@/app/UserContext';
import { useRouter } from 'next/navigation';
import { Clock, CheckCircle, XCircle } from 'lucide-react';

export default function ReadingPage() {
  const { userId, loading } = useUser();
  const router = useRouter();

  useEffect(() => {
    console.log('ReadingPage - userId:', userId, 'loading:', loading);
    if (loading) {
      console.log('Loading state is true, waiting for user data');
      return;
    }
    // Tambahkan penundaan kecil untuk memastikan state sinkron
    const timer = setTimeout(() => {
      if (!userId) {
        console.log('No userId after delay, redirecting to login');
        router.push('/login');
      } else {
        console.log('User authenticated, proceeding with reading page');
      }
    }, 100); // Penundaan 100ms untuk sinkronisasi
    return () => clearTimeout(timer);
  }, [loading, userId, router]);

  const [timeLeft, setTimeLeft] = useState(35 * 60); // 35 menit dalam detik
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState<number | null>(null);

  useEffect(() => {
    if (!submitted && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0) {
      handleSubmit();
    }
  }, [submitted, timeLeft]);

  const handleAnswerChange = (questionId: number, value: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleSubmit = () => {
    setSubmitted(true);
    const calculatedScore = calculateScore();
    setScore(calculatedScore);
    console.log('Score calculated:', calculatedScore);
  };

  const calculateScore = () => {
    let correct = 0;
    if (answers[1] === 'b') correct++;
    if (answers[2] === 'c') correct++;
    if (answers[3] === 'a') correct++;
    if (answers[4] === 'd') correct++;
    return (correct / 4) * 100;
  };

  const passage = `
    The Industrial Revolution, which began in the late 18th century, marked a significant turning point in human history. This period saw the transition from agrarian, handicraft-based economies to ones dominated by industry and machine manufacturing. Originating in Britain, the revolution spread to Europe and North America, driven by innovations such as the steam engine and the spinning jenny. Factories emerged, leading to urbanization as people moved to cities for work. However, this progress came at a cost, including poor working conditions and environmental degradation. Historians debate whether the benefits outweighed the drawbacks, but its impact on modern society is undeniable.
  `;

  const questions = [
    {
      id: 1,
      text: 'What is the main topic of the passage?',
      options: [
        { value: 'a', label: 'The history of agriculture' },
        { value: 'b', label: 'The Industrial Revolution' },
        { value: 'c', label: 'Modern factory systems' },
        { value: 'd', label: 'Environmental policies' },
      ],
      correct: 'b',
    },
    {
      id: 2,
      text: 'Where did the Industrial Revolution originate?',
      options: [
        { value: 'a', label: 'North America' },
        { value: 'b', label: 'Europe' },
        { value: 'c', label: 'Britain' },
        { value: 'd', label: 'Asia' },
      ],
      correct: 'c',
    },
    {
      id: 3,
      text: 'What was a negative effect of the Industrial Revolution?',
      options: [
        { value: 'a', label: 'Poor working conditions' },
        { value: 'b', label: 'Increased agricultural output' },
        { value: 'c', label: 'Improved transportation' },
        { value: 'd', label: 'Urban planning' },
      ],
      correct: 'a',
    },
    {
      id: 4,
      text: 'What can be inferred about the historians mentioned?',
      options: [
        { value: 'a', label: 'They agree on the revolution’s impact' },
        { value: 'b', label: 'They focus only on benefits' },
        { value: 'c', label: 'They debate its overall value' },
        { value: 'd', label: 'They ignore environmental issues' },
      ],
      correct: 'c',
    },
  ];

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <p className="text-slate-600 text-lg font-medium">Memuat...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-slate-800 mb-6">Reading Comprehension Practice</h1>
        <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-200">
          <div className="flex justify-between items-center mb-4">
            <span className="text-lg font-medium text-slate-600">
              Time Left: {formatTime(timeLeft)}
            </span>
            <button
              onClick={handleSubmit}
              disabled={submitted}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
            >
              Submit
            </button>
          </div>

          <div className="prose max-w-none mb-6">
            <p>{passage}</p>
          </div>

          {questions.map((q) => (
            <div key={q.id} className="mb-4">
              <p className="text-md font-medium text-slate-700 mb-2">
                {q.id}. {q.text}
              </p>
              {q.options.map((opt) => (
                <div key={opt.value} className="flex items-center mb-2">
                  <input
                    type="radio"
                    id={`q${q.id}-o${opt.value}`}
                    name={`question${q.id}`}
                    value={opt.value}
                    checked={answers[q.id] === opt.value}
                    onChange={() => handleAnswerChange(q.id, opt.value)}
                    disabled={submitted}
                    className="mr-2"
                  />
                  <label
                    htmlFor={`q${q.id}-o${opt.value}`}
                    className="text-sm text-slate-600"
                  >
                    {opt.label}
                  </label>
                </div>
              ))}
              {submitted && (
                <p className="ml-6 mt-2 text-sm">
                  {answers[q.id] === q.correct ? (
                    <span className="text-green-600 flex items-center">
                      <CheckCircle className="w-4 h-4 mr-1" /> Correct
                    </span>
                  ) : (
                    <span className="text-red-600 flex items-center">
                      <XCircle className="w-4 h-4 mr-1" /> Incorrect (Correct: {q.options.find(o => o.value === q.correct)?.label})
                    </span>
                  )}
                </p>
              )}
            </div>
          ))}

          {submitted && score !== null && (
            <div className="mt-6 text-center">
              <h2 className="text-xl font-bold text-slate-800">Your Score: {score}%</h2>
              <button
                onClick={() => router.push('/dashboard')}
                className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Back to Dashboard
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}