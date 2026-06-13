import React, { useState } from 'react';
import { Question } from '../types';
import { Trophy, CheckCircle, XCircle, RefreshCw, Eye, ArrowRight, HelpCircle } from 'lucide-react';

interface InteractiveQuizProps {
  questions: Question[];
  topic: string;
}

export default function InteractiveQuiz({ questions, topic }: InteractiveQuizProps) {
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const handleSelectOption = (questionId: string, value: string) => {
    if (submitted) return;
    setUserAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const handleTextChange = (questionId: string, value: string) => {
    if (submitted) return;
    setUserAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let correctCount = 0;

    questions.forEach(q => {
      const uAns = (userAnswers[q.id] || '').trim().toLowerCase();
      const cAns = q.correctAnswer.trim().toLowerCase();

      if (q.type === 'Pilihan Ganda') {
        if (uAns === cAns) correctCount++;
      } else if (q.type === 'Benar/Salah') {
        if (uAns === cAns) correctCount++;
      } else {
        // Isian Singkat matches loosely (contains or exact)
        if (uAns === cAns || cAns.includes(uAns) && uAns.length > 1) {
          correctCount++;
        }
      }
    });

    setScore(correctCount);
    setSubmitted(true);
  };

  const handleReset = () => {
    setUserAnswers({});
    setSubmitted(false);
    setScore(0);
  };

  const scorePercentage = Math.round((score / questions.length) * 100);

  return (
    <div className="space-y-6">
      {submitted && (
        <div className="bg-indigo-900 text-white rounded-2xl p-6 shadow-xl relative overflow-hidden flex flex-col md:flex-row items-center gap-6">
          <div className="absolute right-0 bottom-0 opacity-10">
            <Trophy className="w-64 h-64 text-indigo-200" />
          </div>
          
          <div className="w-20 h-20 bg-indigo-500/30 rounded-full flex items-center justify-center text-yellow-300 relative z-10 p-2 border border-white/20">
            <Trophy className="w-12 h-12" />
          </div>

          <div className="flex-1 relative z-10 text-center md:text-left">
            <span className="text-indigo-200 text-xs font-bold uppercase tracking-widest block">Hasil Uji Coba Kuis Otomatis</span>
            <h3 className="text-xl font-bold mt-1 text-yellow-200">Simulasi Sukses Diselesaikan!</h3>
            <p className="text-xs text-indigo-100 max-w-md mt-1 leading-relaxed">
              Anda menjawab benar <strong className="text-yellow-200">{score}</strong> dari <strong className="text-yellow-200">{questions.length}</strong> butir soal ({scorePercentage}%).
            </p>
          </div>

          <div className="text-center md:text-right relative z-10 bg-indigo-950/20 px-6 py-4 rounded-xl border border-white/10 flex flex-col items-center">
            <span className="text-indigo-200 text-[10px] font-bold uppercase tracking-wider">Nilai Anda</span>
            <span className="text-4xl font-extrabold text-white mt-1 font-mono">{scorePercentage}</span>
            <button
              onClick={handleReset}
              className="mt-3 px-4 py-1.5 bg-white text-indigo-900 rounded-xl font-bold text-xs hover:bg-slate-100 transition-all flex items-center gap-1 shadow"
            >
              <RefreshCw className="w-3 h-3" />
              Ulang Kuis
            </button>
          </div>
        </div>
      )}

      {/* Questions submission Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {questions.map((q) => {
          const uAnswer = userAnswers[q.id] || '';
          const isCorrect = submitted && (
            q.type === 'Pilihan Ganda' || q.type === 'Benar/Salah'
              ? uAnswer.trim().toLowerCase() === q.correctAnswer.trim().toLowerCase()
              : q.correctAnswer.trim().toLowerCase().includes(uAnswer.trim().toLowerCase()) && uAnswer.trim().length > 0
          );

          return (
            <article 
              key={q.id} 
              className={`bg-white p-6 rounded-2xl border transition-all ${
                submitted 
                  ? isCorrect 
                    ? 'border-green-300 bg-green-50/10' 
                    : 'border-red-300 bg-red-50/10'
                  : 'border-gray-200 shadow-sm'
              }`}
            >
              <div className="flex gap-4">
                <span className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                  submitted
                    ? isCorrect
                      ? 'bg-green-100 text-green-700'
                      : 'bg-red-100 text-red-700'
                    : 'bg-brand-lightBlue text-brand-purple'
                }`}>
                  {q.number}
                </span>

                <div className="flex-1">
                  <p className="text-sm leading-relaxed text-slate-800 font-medium mb-4">{q.questionText}</p>

                  {/* Optional diagram */}
                  {q.imageUrl && (
                    <div className="my-4 max-w-md rounded-xl overflow-hidden border border-slate-200 bg-slate-50 p-2">
                      <img src={q.imageUrl} alt="Diagram Soal" className="w-full h-auto object-cover max-h-56 rounded-lg" referrerPolicy="no-referrer" />
                    </div>
                  )}

                  {/* Render Answer Interface */}
                  {q.type === 'Pilihan Ganda' && q.options ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                      {q.options.map((opt, oIdx) => {
                        const optChar = String.fromCharCode(65 + oIdx); // A, B, C, D
                        const isSelected = uAnswer === optChar;
                        const isCorrectOpt = q.correctAnswer === optChar;

                        let optClass = 'border-gray-200 hover:bg-slate-50 text-slate-700';
                        if (submitted) {
                          if (isSelected && isCorrect) optClass = 'bg-green-100 border-green-400 text-green-800 font-medium';
                          else if (isSelected && !isCorrect) optClass = 'bg-red-100 border-red-400 text-red-800';
                          else if (isCorrectOpt) optClass = 'bg-green-100 border-green-300 text-green-800 font-medium';
                        } else {
                          if (isSelected) optClass = 'border-brand-purple bg-brand-lightBlue text-brand-darkPurple font-bold ring-2 ring-brand-purple/20';
                        }

                        return (
                          <button
                            key={oIdx}
                            type="button"
                            onClick={() => handleSelectOption(q.id, optChar)}
                            className={`flex items-start text-left gap-2.5 p-3 rounded-xl border text-xs transition-all ${optClass}`}
                          >
                            <span className={`w-5 h-5 rounded flex items-center justify-center font-mono font-bold text-[10px] ${
                              isSelected ? 'bg-brand-purple text-white' : 'bg-slate-100 text-slate-400'
                            }`}>
                              {optChar}
                            </span>
                            <span className="flex-1 leading-snug">{opt}</span>
                          </button>
                        );
                      })}
                    </div>
                  ) : q.type === 'Benar/Salah' ? (
                    <div className="flex gap-4 max-w-xs text-xs">
                      {['Benar', 'Salah'].map((val) => {
                        const isSelected = uAnswer === val;
                        const isCorrectVal = q.correctAnswer === val;

                        let btnClass = 'border-gray-200 bg-white hover:bg-slate-50 text-slate-600';
                        if (submitted) {
                          if (isSelected && isCorrect) btnClass = 'bg-green-100 border-green-400 text-green-800 font-bold';
                          else if (isSelected && !isCorrect) btnClass = 'bg-red-100 border-red-400 text-red-800';
                          else if (isCorrectVal) btnClass = 'bg-green-50 border-green-300 text-green-600 font-semibold';
                        } else {
                          if (isSelected) btnClass = val === 'Benar' ? 'bg-green-550 border-green-500 font-bold bg-green-50 text-green-700 ring-2 ring-green-100' : 'bg-red-50 border-red-500 font-bold text-red-700 ring-2 ring-red-100';
                        }

                        return (
                          <button
                            key={val}
                            type="button"
                            onClick={() => handleSelectOption(q.id, val)}
                            className={`flex-1 py-2.5 px-4 rounded-xl border font-bold uppercase transition-all ${btnClass}`}
                          >
                            {val}
                          </button>
                        );
                      })}
                    </div>
                  ) : (
                    <div>
                      <label className="text-[10px] text-slate-400 font-bold block mb-1">Tuliskan Jawaban Singkat Anda:</label>
                      <input
                        type="text"
                        disabled={submitted}
                        placeholder={submitted ? "Belum menjawab" : "Ketik jawaban di sini..."}
                        className={`w-full text-xs rounded-xl p-2.5 focus:ring-brand-purple max-w-md ${
                          submitted 
                            ? isCorrect 
                              ? 'bg-green-50 border-green-300 text-green-800' 
                              : 'bg-red-50 border-red-300 text-red-800'
                            : 'border-gray-200 bg-white'
                        }`}
                        value={uAnswer}
                        onChange={(e) => handleTextChange(q.id, e.target.value)}
                      />
                    </div>
                  )}

                  {/* Review feedback after submission */}
                  {submitted && (
                    <div className="mt-4 pt-4 border-t border-slate-100 space-y-2">
                      <div className="flex items-center gap-2 text-xs">
                        {isCorrect ? (
                          <span className="bg-green-100 text-green-800 py-0.5 px-2 rounded-full font-bold text-[9px] flex items-center gap-1">
                            <CheckCircle className="w-3 h-3" /> JAWABAN ANDA BENAR
                          </span>
                        ) : (
                          <span className="bg-red-100 text-red-800 py-0.5 px-2 rounded-full font-bold text-[9px] flex items-center gap-1">
                            <XCircle className="w-3 h-3" /> JAWABAN ANDA SALAH
                          </span>
                        )}
                        <span className="text-slate-400 font-medium">Kunci Jawaban: <strong className="text-slate-700 font-mono">{q.correctAnswer}</strong></span>
                      </div>
                      
                      <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-[11px] leading-relaxed text-slate-500">
                        <span className="font-bold text-slate-700 block mb-0.5">Penjelasan Guru:</span>
                        {q.explanation}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </article>
          );
        })}

        {!submitted && (
          <div className="sticky bottom-4 z-20 flex justify-end">
            <button
              type="submit"
              className="bg-brand-darkPurple hover:bg-brand-purple text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-xl transition-all shadow-brand-purple/30 transform hover:-translate-y-0.5"
            >
              <span>Kumpulkan & Lihat Hasil</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </form>
    </div>
  );
}
