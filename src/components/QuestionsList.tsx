import { useState } from 'react';
import { Question } from '../types';
import { Trash2, Edit3, Check, X, HelpCircle, Image, PlusCircle, AlertCircle } from 'lucide-react';

interface QuestionsListProps {
  questions: Question[];
  mode: 'Soal' | 'Kunci';
  onUpdateQuestion: (updated: Question) => void;
  onDeleteQuestion: (id: string) => void;
}

export default function QuestionsList({ questions, mode, onUpdateQuestion, onDeleteQuestion }: QuestionsListProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editedText, setEditedText] = useState('');
  const [editedOptions, setEditedOptions] = useState<string[]>([]);
  const [editedAnswer, setEditedAnswer] = useState('');
  const [editedExplanation, setEditedExplanation] = useState('');

  if (questions.length === 0) {
    return (
      <div className="bg-white rounded-2xl p-8 text-center border border-gray-100 shadow-sm">
        <AlertCircle className="w-8 h-8 text-slate-400 mx-auto mb-2" />
        <p className="text-sm text-slate-500 font-medium">Belum ada butir soal yang ditambahkan.</p>
        <p className="text-xs text-slate-400 mt-1">Gunakan formulir Identitas & Konfigurasi di sebelah kiri, lalu klik "Buat Soal Otomatis" atau pilih "+ Tambah Soal".</p>
      </div>
    );
  }

  const startEditing = (q: Question) => {
    setEditingId(q.id);
    setEditedText(q.questionText);
    setEditedOptions(q.options ? [...q.options] : []);
    setEditedAnswer(q.correctAnswer);
    setEditedExplanation(q.explanation);
  };

  const cancelEditing = () => {
    setEditingId(null);
  };

  const saveEditing = (originalQuestion: Question) => {
    onUpdateQuestion({
      ...originalQuestion,
      questionText: editedText,
      options: originalQuestion.type === 'Pilihan Ganda' ? editedOptions : undefined,
      correctAnswer: editedAnswer,
      explanation: editedExplanation,
    });
    setEditingId(null);
  };

  const handleOptionChange = (index: number, val: string) => {
    const updated = [...editedOptions];
    updated[index] = val;
    setEditedOptions(updated);
  };

  return (
    <div className="space-y-4">
      {questions.map((q) => {
        const isEditing = editingId === q.id;

        return (
          <article 
            key={q.id} 
            className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm relative group hover:border-brand-purple/30 transition-all duration-250 hover:shadow-md"
          >
            {/* Visual Hover Left Indicator Accent */}
            <div className="absolute left-0 top-6 w-1 h-12 bg-indigo-500 rounded-r opacity-0 group-hover:opacity-100 transition-opacity"></div>
            
            {/* Quick Action bar (Edit/Delete) on top right */}
            <div className="absolute top-4 right-4 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity z-10">
              {!isEditing ? (
                <>
                  <button
                    onClick={() => startEditing(q)}
                    className="p-1.5 bg-slate-50 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors cursor-pointer"
                    title="Ubah Soal"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => onDeleteQuestion(q.id)}
                    className="p-1.5 bg-slate-50 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                    title="Hapus Soal"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </>
              ) : null}
            </div>

            <div className="flex gap-4">
              {/* Question Index Badge */}
              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-50 text-brand-purple flex items-center justify-center font-bold text-sm">
                {q.number}
              </span>

              {/* Editable or Standard Mode */}
              <div className="flex-1 min-w-0">
                {isEditing ? (
                  <div className="space-y-3">
                    <div>
                      <label className="text-[10px] text-slate-400 font-bold block mb-1 uppercase">Teks Pertanyaan</label>
                      <textarea
                        className="w-full text-xs rounded-xl border-gray-200 p-2.5 bg-slate-50 focus:bg-white focus:ring-brand-purple"
                        rows={3}
                        value={editedText}
                        onChange={(e) => setEditedText(e.target.value)}
                      />
                    </div>

                    {q.type === 'Pilihan Ganda' && (
                      <div className="space-y-2 bg-slate-50 p-4 rounded-xl border border-gray-100">
                        <span className="text-[10px] text-slate-400 font-bold block mb-1 uppercase">Opsi Pilihan</span>
                        {editedOptions.map((opt, oIdx) => (
                          <div key={oIdx} className="flex items-center gap-2">
                            <span className="font-bold text-slate-400 text-xs w-4">{String.fromCharCode(65 + oIdx)}.</span>
                            <input
                              type="text"
                              className="flex-1 text-xs rounded-lg border-gray-200 bg-white p-2 focus:ring-brand-purple"
                              value={opt}
                              onChange={(e) => handleOptionChange(oIdx, e.target.value)}
                            />
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-[10px] text-slate-400 font-bold block mb-1 uppercase">Jawaban Benar</label>
                        {q.type === 'Pilihan Ganda' ? (
                          <select
                            className="w-full text-xs rounded-lg border-gray-200 p-2 bg-white"
                            value={editedAnswer}
                            onChange={(e) => setEditedAnswer(e.target.value)}
                          >
                            <option value="A">Opsi A</option>
                            <option value="B">Opsi B</option>
                            <option value="C">Opsi C</option>
                            <option value="D">Opsi D</option>
                          </select>
                        ) : q.type === 'Benar/Salah' ? (
                          <select
                            className="w-full text-xs rounded-lg border-gray-200 p-2 bg-white"
                            value={editedAnswer}
                            onChange={(e) => setEditedAnswer(e.target.value)}
                          >
                            <option value="Benar">Benar</option>
                            <option value="Salah">Salah</option>
                          </select>
                        ) : (
                          <input
                            type="text"
                            className="w-full text-xs rounded-lg border-gray-200 p-2 bg-white"
                            value={editedAnswer}
                            onChange={(e) => setEditedAnswer(e.target.value)}
                          />
                        )}
                      </div>

                      <div>
                        <label className="text-[10px] text-slate-400 font-bold block mb-1 uppercase">IPK / Kompetensi</label>
                        <input
                          type="text"
                          className="w-full text-xs rounded-lg border-gray-200 p-2 bg-white text-slate-500"
                          value={q.competencyIndicator}
                          disabled
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] text-slate-400 font-bold block mb-1 uppercase text-amber-600">Materi Pembahasan Kunci</label>
                      <textarea
                        className="w-full text-xs rounded-xl border-gray-200 p-2 bg-slate-50 focus:bg-white focus:ring-brand-purple"
                        rows={2}
                        value={editedExplanation}
                        onChange={(e) => setEditedExplanation(e.target.value)}
                      />
                    </div>

                    <div className="flex justify-end gap-2 pt-2">
                      <button
                        onClick={cancelEditing}
                        className="px-3 py-1.5 text-xs text-slate-500 border border-gray-200 bg-white hover:bg-slate-50 rounded-lg font-bold flex items-center gap-1"
                      >
                        <X className="w-3.5 h-3.5" /> Batal
                      </button>
                      <button
                        onClick={() => saveEditing(q)}
                        className="px-3 py-1.5 text-xs text-white bg-indigo-650 hover:bg-indigo-700 rounded-lg font-bold flex items-center gap-1"
                      >
                        <Check className="w-3.5 h-3.5" /> Simpan
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    {/* Plain Text Display */}
                    <p className="text-sm leading-relaxed text-slate-700 mb-4 font-medium select-text">{q.questionText}</p>

                    {/* Rendering image illustration diagram if available */}
                    {q.imageUrl && (
                      <div className="my-4 max-w-full rounded-xl overflow-hidden border border-slate-200 bg-slate-50 p-2.5 flex flex-col items-center justify-center">
                        <div className="text-[10px] text-slate-400 italic mb-2 tracking-wide font-medium">
                          Diagram: {q.type} ({q.difficulty})
                        </div>
                        <img 
                          alt="Diagram Soal" 
                          referrerPolicy="no-referrer"
                          className="rounded border border-gray-200 max-w-full h-auto object-cover max-h-64" 
                          src={q.imageUrl} 
                        />
                      </div>
                    )}

                    {/* Display Multiple Choice options if Pilihan Ganda */}
                    {q.type === 'Pilihan Ganda' && q.options && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                        {q.options.map((opt, idx) => {
                          const optionLetter = String.fromCharCode(65 + idx);
                          const isCorrect = mode === 'Kunci' && q.correctAnswer === optionLetter;

                          return (
                            <div 
                              key={idx} 
                              className={`flex items-start gap-2.5 p-2 rounded-xl transition-colors ${
                                isCorrect 
                                  ? 'bg-green-50 border border-green-200 text-green-800 font-semibold' 
                                  : 'text-slate-600'
                              }`}
                            >
                              <span className={`font-mono font-bold text-slate-450 ${
                                isCorrect ? 'text-green-600' : 'text-slate-400'
                              }`}>
                                {optionLetter}.
                              </span>
                              <span className="leading-snug">{opt}</span>
                            </div>
                          );
                        })}
                      </div>
                    )}

                    {/* Display true-false options or input placeholder */}
                    {q.type === 'Benar/Salah' && (
                      <div className="flex gap-4 text-xs font-semibold">
                        <span className={`px-3 py-1.5 rounded-lg border ${
                          mode === 'Kunci' && q.correctAnswer === 'Benar'
                            ? 'bg-green-50 border-green-200 text-green-700 font-bold'
                            : 'bg-slate-50 border-gray-200 text-slate-400'
                        }`}>
                          ✓ BENAR
                        </span>
                        <span className={`px-3 py-1.5 rounded-lg border ${
                          mode === 'Kunci' && q.correctAnswer === 'Salah'
                            ? 'bg-red-50 border-red-200 text-red-700 font-bold'
                            : 'bg-slate-50 border-gray-200 text-slate-400'
                        }`}>
                          ✗ SALAH
                        </span>
                      </div>
                    )}

                    {q.type === 'Isian Singkat' && mode === 'Kunci' && (
                      <div className="mt-2 text-xs">
                        <span className="text-slate-400 font-bold block mb-1 text-[10px] uppercase">Kunci Isian Singkat:</span>
                        <span className="inline-block px-3 py-1.5 bg-green-50 border border-green-200 rounded-lg text-green-800 font-bold font-mono">
                          {q.correctAnswer}
                        </span>
                      </div>
                    )}

                    {/* Technical footer specs tag */}
                    <div className="mt-6 flex flex-wrap items-center justify-between gap-2 text-[10px] font-bold text-slate-450">
                      <div className="flex items-center gap-2">
                        <span className="bg-slate-100 text-slate-500 text-[10px] font-bold px-2 py-1 rounded">
                          {q.type}
                        </span>
                        <span className={`text-[10px] font-bold px-2 py-1 rounded uppercase ${
                          q.difficulty === 'MUDAH' ? 'bg-green-100 text-green-600' :
                          q.difficulty === 'SEDANG' ? 'bg-amber-100 text-yellow-600' :
                          'bg-red-100 text-red-650'
                        }`}>
                          {q.difficulty}
                        </span>
                      </div>

                      {q.competencyIndicator && (
                        <span className="text-[10px] text-slate-400 font-medium italic">
                          IPK: {q.competencyIndicator}
                        </span>
                      )}
                    </div>

                    {/* Pembahasan / Kunci jawaban segment shown purely in Kunci mode */}
                    {mode === 'Kunci' && (
                      <div className="mt-4 pt-4 border-t border-slate-100 bg-amber-50/40 p-3 rounded-xl border border-amber-100/50">
                        <div className="flex items-center gap-1.5 text-xs font-bold text-amber-700 uppercase mb-1">
                          <HelpCircle className="w-3.5 h-3.5" />
                          <span>Kunci Jawaban & Pembahasan Penjelas:</span>
                          <span className="ml-auto font-mono bg-amber-200 py-0.5 px-1.5 rounded">{q.correctAnswer}</span>
                        </div>
                        <p className="text-[11px] leading-relaxed text-slate-600">{q.explanation}</p>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
            
            {/* Soft border separator design details for elegant styling */}
            <div className="absolute right-4 bottom-4 text-slate-200 font-medium text-[9px] pointer-events-none uppercase font-sans tracking-widest leading-none hidden group-hover:block select-none">
              RFD GuruPro Editor
            </div>
          </article>
        );
      })}
    </div>
  );
}
