import React, { useState } from 'react';
import { Question, QuestionType, DifficultyLevel } from '../types';
import { X, Plus, AlertCircle } from 'lucide-react';

interface AddQuestionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (question: Omit<Question, 'id' | 'number'>) => void;
  nextNumber: number;
}

export default function AddQuestionModal({ isOpen, onClose, onSave, nextNumber }: AddQuestionModalProps) {
  const [type, setType] = useState<QuestionType>('Pilihan Ganda');
  const [difficulty, setDifficulty] = useState<DifficultyLevel>('SEDANG');
  const [questionText, setQuestionText] = useState('');
  const [options, setOptions] = useState<string[]>(['', '', '', '']);
  const [correctAnswer, setCorrectAnswer] = useState('A');
  const [explanation, setExplanation] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [competencyIndicator, setCompetencyIndicator] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleOptionChange = (index: number, value: string) => {
    const updated = [...options];
    updated[index] = value;
    setOptions(updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!questionText.trim()) {
      setError('Teks soal tidak boleh kosong!');
      return;
    }

    if (type === 'Pilihan Ganda') {
      if (options.some(opt => !opt.trim())) {
        setError('Semua 4 opsi jawaban pilihan ganda harus diisi!');
        return;
      }
    }

    let finalCorrect = correctAnswer;
    if (type === 'Isian Singkat') {
      if (!correctAnswer.trim()) {
        setError('Kunci jawaban isian singkat harus diisi!');
        return;
      }
    } else if (type === 'Benar/Salah') {
      if (correctAnswer !== 'Benar' && correctAnswer !== 'Salah') {
        finalCorrect = 'Benar';
      }
    }

    onSave({
      type,
      difficulty,
      questionText: questionText.trim(),
      options: type === 'Pilihan Ganda' ? options.map(o => o.trim()) : undefined,
      correctAnswer: finalCorrect,
      explanation: explanation.trim() || 'Pembahasan kunci jawaban standar guru.',
      imageUrl: imageUrl.trim() || undefined,
      competencyIndicator: competencyIndicator.trim() || 'Megidentifikasi korelasi kompetensi materi.'
    });

    // Reset Form
    setQuestionText('');
    setOptions(['', '', '', '']);
    setCorrectAnswer('A');
    setExplanation('');
    setImageUrl('');
    setCompetencyIndicator('');
    setError('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-100 max-w-2xl w-full max-h-[90vh] overflow-y-auto flex flex-col">
        <div className="p-5 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white z-10">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-green-50 text-green-600 rounded-lg">
              <Plus className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-800 text-base">Tambah Soal Baru (No. {nextNumber})</h3>
              <p className="text-xs text-slate-400">Buat pertanyaan kustom Anda secara presisi</p>
            </div>
          </div>
          <button 
            type="button"
            onClick={onClose} 
            className="p-1 rounded-lg text-slate-400 hover:bg-slate-50 hover:text-slate-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 flex-1">
          {error && (
            <div className="p-3 bg-red-50 text-red-600 rounded-xl text-xs flex items-center gap-2 border border-red-100">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-600 block mb-1">Tipe Soal</label>
              <select
                className="w-full text-xs rounded-lg border-gray-200 p-2.5 bg-white focus:ring-brand-purple focus:border-brand-purple"
                value={type}
                onChange={(e) => {
                  const val = e.target.value as QuestionType;
                  setType(val);
                  setCorrectAnswer(val === 'Pilihan Ganda' ? 'A' : val === 'Benar/Salah' ? 'Benar' : '');
                }}
              >
                <option value="Pilihan Ganda">Pilihan Ganda (PG)</option>
                <option value="Isian Singkat">Isian Singkat</option>
                <option value="Benar/Salah">Benar / Salah</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-600 block mb-1">Tingkat Kesulitan</label>
              <select
                className="w-full text-xs rounded-lg border-gray-200 p-2.5 bg-white focus:ring-brand-purple focus:border-brand-purple"
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value as DifficultyLevel)}
              >
                <option value="MUDAH">MUDAH</option>
                <option value="SEDANG">SEDANG</option>
                <option value="SULIT">SULIT</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-600 block mb-1">Indikator Pencapaian Kompetensi (IPK)</label>
            <input
              type="text"
              placeholder="Contoh: Menganalisis peran enzim ptyalin dalam pencernaan karbohidrat."
              className="w-full text-xs rounded-lg border-gray-200 p-2.5 focus:ring-brand-purple focus:border-brand-purple"
              value={competencyIndicator}
              onChange={(e) => setCompetencyIndicator(e.target.value)}
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-600 block mb-1">Teks Pertanyaan Soal</label>
            <textarea
              rows={3}
              placeholder="Tuliskan pertanyaan lengkap di sini..."
              className="w-full text-xs rounded-lg border-gray-200 p-2.5 focus:ring-brand-purple focus:border-brand-purple"
              value={questionText}
              onChange={(e) => setQuestionText(e.target.value)}
            />
          </div>

          {type === 'Pilihan Ganda' ? (
            <div className="space-y-2 bg-slate-50 p-4 rounded-xl border border-dashed border-slate-200">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wide block mb-1">Pilihan Jawaban (A - D)</span>
              {options.map((option, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <span className="w-5 text-sm font-bold text-slate-400">{String.fromCharCode(65 + idx)}.</span>
                  <input
                    type="text"
                    required
                    placeholder={`Isi pilihan ${String.fromCharCode(65 + idx)}`}
                    className="flex-1 text-xs rounded-lg bg-white border-gray-200 p-2 focus:ring-brand-purple focus:border-brand-purple"
                    value={option}
                    onChange={(e) => handleOptionChange(idx, e.target.value)}
                  />
                </div>
              ))}
              <div className="mt-3">
                <label className="text-xs font-semibold text-slate-600 block mb-1">Kunci Jawaban yang Benar</label>
                <select
                  className="w-full text-xs rounded-lg border-gray-200 p-2 bg-white focus:ring-brand-purple"
                  value={correctAnswer}
                  onChange={(e) => setCorrectAnswer(e.target.value)}
                >
                  <option value="A">Pilihan A</option>
                  <option value="B">Pilihan B</option>
                  <option value="C">Pilihan C</option>
                  <option value="D">Pilihan D</option>
                </select>
              </div>
            </div>
          ) : type === 'Benar/Salah' ? (
            <div className="bg-slate-50 p-4 rounded-xl border border-dashed border-slate-200">
              <label className="text-xs font-semibold text-slate-600 block mb-1">Kunci Jawaban</label>
              <div className="flex gap-4 mt-2">
                <button
                  type="button"
                  onClick={() => setCorrectAnswer('Benar')}
                  className={`flex-1 py-2 px-4 rounded-lg font-bold text-xs border text-center transition-all ${
                    correctAnswer === 'Benar'
                      ? 'bg-green-100 text-green-700 border-green-300'
                      : 'bg-white text-slate-500 border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  BENAR
                </button>
                <button
                  type="button"
                  onClick={() => setCorrectAnswer('Salah')}
                  className={`flex-1 py-2 px-4 rounded-lg font-bold text-xs border text-center transition-all ${
                    correctAnswer === 'Salah'
                      ? 'bg-red-100 text-red-700 border-red-300'
                      : 'bg-white text-slate-500 border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  SALAH
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-slate-50 p-4 rounded-xl border border-dashed border-slate-200">
              <label className="text-xs font-semibold text-slate-600 block mb-1">Tulis Kunci Jawaban Singkat</label>
              <input
                type="text"
                placeholder="Contoh: Asam Klorida atau Jantung atau Organel Sel"
                className="w-full text-xs rounded-lg bg-white border-gray-200 p-2.5 focus:ring-brand-purple focus:border-brand-purple"
                value={correctAnswer}
                onChange={(e) => setCorrectAnswer(e.target.value)}
              />
            </div>
          )}

          <div>
            <label className="text-xs font-semibold text-slate-600 block mb-1">Pembahasan / Catatan Penjelas</label>
            <textarea
              rows={2}
              placeholder="Berikan penjelasan logis mengapa jawaban tersebut benar untuk dicantumkan di lembar kunci jawaban..."
              className="w-full text-xs rounded-lg border-gray-200 p-2.5 focus:ring-brand-purple"
              value={explanation}
              onChange={(e) => setExplanation(e.target.value)}
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-600 block mb-1">Link URL Ilustrasi Gambar / Diagram (Opsional)</label>
            <input
              type="text"
              placeholder="https://images.unsplash.com/photo-... atau simulasikan letak gambar"
              className="w-full text-xs rounded-lg border-gray-200 p-2.5 focus:ring-brand-purple"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />
          </div>

          <div className="p-4 bg-amber-50 rounded-xl border border-amber-100 flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
            <p className="text-[10px] text-amber-700 leading-relaxed">
              Soal baru ini akan ditambahkan sebagai soal kustom di bagian paling akhir instrumen tes Anda saat ini. Anda dapat mengunduh paket lengkap lembar soal ini di tab Soal ataupun Kunci.
            </p>
          </div>

          <div className="pt-4 border-t border-gray-100 flex justify-end gap-2 sticky bottom-0 bg-white py-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-200 rounded-xl bg-white hover:bg-slate-50 font-bold text-xs text-slate-500 transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-brand-darkPurple hover:bg-brand-purple font-bold text-xs text-white transition-all shadow-lg shadow-brand-purple/20"
            >
              Simpan Soal kustom
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
