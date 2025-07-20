"use client";

import React, { useState, useEffect } from "react";
import { Clock, CheckCircle, XCircle } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Skill1Page() {
  const router = useRouter();
  const [timeLeft, setTimeLeft] = useState(35 * 60);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState<number | null>(null);

  const questions = [
    { id: 1, text: "What is the main focus of the passage?", options: [{ value: "a", label: "Medieval warfare" }, { value: "b", label: "The Renaissance" }, { value: "c", label: "Scientific inventions" }, { value: "d", label: "European politics" }], correct: "b" },
  ];

  useEffect(() => {
    if (!submitted && timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0) handleSubmit();
  }, [submitted, timeLeft]);

  const handleAnswerChange = (questionId: number, value: string) => setAnswers((prev) => ({ ...prev, [questionId]: value }));
  const handleSubmit = () => { setSubmitted(true); setScore(answers[1] === "b" ? 100 : 0); };
  const handleReset = () => { setSubmitted(false); setScore(null); setAnswers({}); setTimeLeft(35 * 60); };
  const formatTime = (seconds: number) => `${Math.floor(seconds / 60)}:${seconds % 60 < 10 ? "0" : ""}${seconds % 60}`;

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-slate-800 mb-6">Skill 1: Answer Main Idea Questions</h1>
        <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-200">
          <div className="flex justify-between items-center mb-6">
            <span className="text-lg font-medium text-slate-600">Time Left: {formatTime(timeLeft)}</span>
          </div>
          <div className="prose max-w-none mb-6">
            <p>The Renaissance, a period from the 14th to the 17th century, was a time of cultural rebirth in Europe...</p>
          </div>
          {questions.map((q) => (
            <div key={q.id} className="mb-4 p-4 border-b border-slate-200">
              <p className="text-md font-medium text-slate-700 mb-2">{q.id}. {q.text}</p>
              {q.options.map((opt) => (
                <div key={opt.value} className="flex items-center mb-2">
                  <input type="radio" id={`q${q.id}-o${opt.value}`} name={`question${q.id}`} value={opt.value} checked={answers[q.id] === opt.value} onChange={() => handleAnswerChange(q.id, opt.value)} disabled={submitted} className="mr-2" />
                  <label htmlFor={`q${q.id}-o${opt.value}`} className="text-sm text-slate-600">{opt.label}</label>
                </div>
              ))}
              {submitted && (
                <p className="ml-6 mt-2 text-sm">
                  {answers[q.id] === q.correct ? <span className="text-green-600 flex items-center"><CheckCircle className="w-4 h-4 mr-1" /> Correct</span> : <span className="text-red-600 flex items-center"><XCircle className="w-4 h-4 mr-1" /> Incorrect (Correct: {q.options.find((o) => o.value === q.correct)?.label})</span>}
                </p>
              )}
            </div>
          ))}
          <div className="mt-6 flex flex-col md:flex-row justify-center gap-4">
            {!submitted && <button onClick={handleSubmit} className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 w-full md:w-auto">Submit</button>}
            {submitted && score !== null && (
              <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
                <button onClick={handleReset} className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 w-full md:w-auto">Ulangi</button>
                <span className="text-xl font-bold text-slate-800">Your Score: {score}%</span>
              </div>
            )}
          </div>
        </div>
        <div className="mt-6 text-center">
          <button onClick={() => router.push("/dashboard/reading")} className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Kembali</button>
        </div>
      </div>
    </div>
  );
}