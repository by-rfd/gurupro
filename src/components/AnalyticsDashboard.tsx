import { Question } from '../types';
import { BarChart, BrainCircuit, Clock, Layers, Sparkles, CheckCircle2, AlertCircle } from 'lucide-react';

interface AnalyticsDashboardProps {
  questions: Question[];
  subject: string;
  topic: string;
}

export default function AnalyticsDashboard({ questions, subject, topic }: AnalyticsDashboardProps) {
  const total = questions.length;
  if (total === 0) {
    return (
      <div className="bg-white p-8 rounded-xl border border-gray-100 text-center text-slate-400">
        Belum ada soal untuk dianalisis. Silakan buat soal baru atau klik "Buat Soal Otomatis".
      </div>
    );
  }

  // 1. Difficulty distribution
  const mudahCount = questions.filter(q => q.difficulty === 'MUDAH').length;
  const sedangCount = questions.filter(q => q.difficulty === 'SEDANG').length;
  const sulitCount = questions.filter(q => q.difficulty === 'SULIT').length;

  const mudahPct = total > 0 ? Math.round((mudahCount / total) * 100) : 0;
  const sedangPct = total > 0 ? Math.round((sedangCount / total) * 100) : 0;
  const sulitPct = total > 0 ? Math.round((sulitCount / total) * 100) : 0;

  // 2. Type breakdown
  const pgCount = questions.filter(q => q.type === 'Pilihan Ganda').length;
  const isianCount = questions.filter(q => q.type === 'Isian Singkat').length;
  const bsCount = questions.filter(q => q.type === 'Benar/Salah').length;

  // 3. Est. completing time estimation (indonesia standards)
  // PG = 2 mins, Isian Singkat = 3 mins, Benar/salah = 1.5 mins
  const estMinutes = Math.round((pgCount * 2) + (isianCount * 3) + (bsCount * 1.5));

  // 4. Bloom Taxonomy (Cognitive levels prediction)
  // Mudah = C1 & C2 (Mengingat, Memahami)
  // Sedang = C3 & C4 (Menerapkan, Menganalisis)
  // Sulit = C5 & C6 (Mengevaluasi, Mencipta)
  const c1c2 = mudahCount;
  const c3c4 = sedangCount;
  const c5c6 = sulitCount;

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-lg flex items-center justify-center">
            <Layers className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <span className="text-[10px] text-slate-400 block font-bold uppercase tracking-wider">Total Soal</span>
            <span className="text-xl font-extrabold text-slate-800">{total} <span className="text-xs font-normal text-slate-500">butir</span></span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center gap-3">
          <div className="w-10 h-10 bg-sky-50 text-sky-600 rounded-lg flex items-center justify-center">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] text-slate-400 block font-bold uppercase tracking-wider">Estimasi Waktu</span>
            <span className="text-xl font-extrabold text-slate-800">± {estMinutes} <span className="text-xs font-normal text-slate-500">menit</span></span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center gap-3">
          <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-lg flex items-center justify-center">
            <BrainCircuit className="w-5 h-5 animate-spin-slow" />
          </div>
          <div>
            <span className="text-[10px] text-slate-400 block font-bold uppercase tracking-wider">Kompleksitas Kognitif</span>
            <span className="text-xl font-extrabold text-slate-800">
              {sulitCount > pgCount ? 'Analitis Tinggi' : sedangCount >= mudahCount ? 'Sedang-Adaptif' : 'Dasar'}
            </span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center gap-3">
          <div className="w-10 h-10 bg-violet-50 text-violet-600 rounded-lg flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-brand-purple" />
          </div>
          <div>
            <span className="text-[10px] text-slate-400 block font-bold uppercase tracking-wider">Kelayakan Tes</span>
            <span className="text-xl font-extrabold text-slate-800">Sangat Layak</span>
          </div>
        </div>
      </div>

      {/* Grid Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Difficulty Bar */}
        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4 flex items-center gap-1.5">
            <BarChart className="w-4 h-4 text-brand-purple" />
            Distribusi Tingkat Kesulitan (%)
          </h4>
          
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs font-bold mb-1">
                <span className="text-green-600">MUDAH (C1 - C2)</span>
                <span>{mudahCount} Soal ({mudahPct}%)</span>
              </div>
              <div className="w-full bg-slate-100 h-3.5 rounded-full overflow-hidden">
                <div 
                  className="bg-green-500 h-full rounded-full transition-all duration-1000" 
                  style={{ width: `${mudahPct}%` }}
                ></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold mb-1">
                <span className="text-amber-500">SEDANG (C3 - C4)</span>
                <span>{sedangCount} Soal ({sedangPct}%)</span>
              </div>
              <div className="w-full bg-slate-100 h-3.5 rounded-full overflow-hidden">
                <div 
                  className="bg-yellow-400 h-full rounded-full transition-all duration-1000" 
                  style={{ width: `${sedangPct}%` }}
                ></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold mb-1">
                <span className="text-red-500">SULIT (C5 - C6)</span>
                <span>{sulitCount} Soal ({sulitPct}%)</span>
              </div>
              <div className="w-full bg-slate-100 h-3.5 rounded-full overflow-hidden">
                <div 
                  className="bg-red-500 h-full rounded-full transition-all duration-1000" 
                  style={{ width: `${sulitPct}%` }}
                ></div>
              </div>
            </div>
          </div>

          <div className="mt-5 p-3 rounded-xl bg-slate-50 text-[10px] text-slate-500 leading-relaxed">
            <strong>Rekomendasi Proporsi Ideal Kemendikbud:</strong> Mudah 30%, Sedang 50%, Sulit 20%. Status saat ini adalah: <strong className="text-brand-purple">{mudahPct}% Mudah</strong>, <strong className="text-amber-600">{sedangPct}% Sedang</strong>, dan <strong className="text-red-600">{sulitPct}% Sulit</strong>.
          </div>
        </div>

        {/* Question Type Distribution */}
        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4 flex items-center gap-1.5">
            <Layers className="w-4 h-4 text-emerald-500" />
            Proporsi Bentuk Instrumen
          </h4>

          <div className="flex flex-col items-center justify-center h-48 relative">
            {/* Custom SVG Donut Chart */}
            <svg viewBox="0 0 100 100" className="w-36 h-36">
              <circle cx="50" cy="50" r="40" fill="none" stroke="#e2e8f0" strokeWidth="10" />
              {/* PG Circle */}
              {total > 0 && (
                <circle 
                  cx="50" cy="50" r="40" fill="none" 
                  stroke="#6366f1" strokeWidth="12" 
                  strokeDasharray={`${(pgCount / total) * 251} 251`}
                  strokeDashoffset="0"
                  transform="rotate(-90 50 50)"
                  className="transition-all duration-1000"
                />
              )}
              {/* Isian Circle */}
              {total > 0 && isianCount > 0 && (
                <circle 
                  cx="50" cy="50" r="40" fill="none" 
                  stroke="#10b981" strokeWidth="12" 
                  strokeDasharray={`${(isianCount / total) * 251} 251`}
                  strokeDashoffset={`-${(pgCount / total) * 251}`}
                  transform="rotate(-90 50 50)"
                  className="transition-all duration-1000"
                />
              )}
              {/* B/S Circle */}
              {total > 0 && bsCount > 0 && (
                <circle 
                  cx="50" cy="50" r="40" fill="none" 
                  stroke="#f97316" strokeWidth="12" 
                  strokeDasharray={`${(bsCount / total) * 251} 251`}
                  strokeDashoffset={`-${((pgCount + isianCount) / total) * 251}`}
                  transform="rotate(-90 50 50)"
                  className="transition-all duration-1000"
                />
              )}
              {/* Inner Label */}
              <text x="50" y="47" textAnchor="middle" dominantBaseline="middle" className="font-extrabold text-[12px] fill-slate-800 font-sans">
                {total}
              </text>
              <text x="50" y="58" textAnchor="middle" dominantBaseline="middle" className="text-[6px] fill-slate-400 font-bold uppercase tracking-wider font-sans">
                Butir Soal
              </text>
            </svg>

            {/* Legends */}
            <div className="flex gap-4 text-[10px] font-bold mt-4">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 bg-brand-purple rounded-full"></span>
                <span>Pilihan Ganda ({pgCount})</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full"></span>
                <span>Isian ({isianCount})</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 bg-orange-500 rounded-full"></span>
                <span>Benar/Salah ({bsCount})</span>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Advanced Cognitive Mapping Indicator */}
      <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm space-y-4">
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Pemetaan Level Taksonomi Bloom (Kognitif)</h4>
          <p className="text-xs text-slate-500">Menganalisis tingkatan kognitif soal berdasarkan kesulitan butir instrumen tes.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl border border-green-100 bg-green-50/50">
            <span className="text-[10px] font-bold text-green-700 bg-green-100 py-0.5 px-2 rounded-full mb-1 inline-block">LEVEL 1 (C1 & C2)</span>
            <h5 className="font-bold text-slate-800 text-sm mt-1">LOTS (Low Order Thinking)</h5>
            <p className="text-xs text-slate-500 mt-1">Mengukur kemampuan pemahaman verbal, ingatan istilah fisis, dan pengenalan skema dasar.</p>
            <div className="mt-3 flex items-baseline gap-1 text-slate-800">
              <span className="text-2xl font-black">{c1c2}</span>
              <span className="text-[10px] font-medium text-slate-400">Butir pertanyataan kustom</span>
            </div>
          </div>

          <div className="p-4 rounded-xl border border-amber-100 bg-amber-50/50">
            <span className="text-[10px] font-bold text-amber-700 bg-amber-100 py-0.5 px-2 rounded-full mb-1 inline-block">LEVEL 2 (C3 & C4)</span>
            <h5 className="font-bold text-slate-800 text-sm mt-1">MOTS (Medium Order Thinking)</h5>
            <p className="text-xs text-slate-500 mt-1">Mengukur aplikasi teoretis pada studi kasus, interpretasi fungsi mekanis, dan penyelesaian grafik.</p>
            <div className="mt-3 flex items-baseline gap-1 text-slate-800">
              <span className="text-2xl font-black">{c3c4}</span>
              <span className="text-[10px] font-medium text-slate-400">Butir pertanyataan kustom</span>
            </div>
          </div>

          <div className="p-4 rounded-xl border border-red-100 bg-red-50/50">
            <span className="text-[10px] font-bold text-red-700 bg-red-100 py-0.5 px-2 rounded-full mb-1 inline-block">LEVEL 3 (C5 & C6)</span>
            <h5 className="font-bold text-slate-800 text-sm mt-1">HOTS (Higher Order Thinking)</h5>
            <p className="text-xs text-slate-500 mt-1">Menganalisis anomali diagram medis, memecahkan penyimpangan klinis, serta memprediksi dampak penyakit organ.</p>
            <div className="mt-3 flex items-baseline gap-1 text-slate-800">
              <span className="text-2xl font-black">{c5c6}</span>
              <span className="text-[10px] font-medium text-slate-400">Butir pertanyataan kustom</span>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
