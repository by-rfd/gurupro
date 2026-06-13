import { Question } from '../types';
import { Clipboard, Printer, CheckCircle, FileSpreadsheet } from 'lucide-react';
import { useState } from 'react';

interface SyllabusGridProps {
  questions: Question[];
  subject: string;
  topic: string;
  grade: string;
  level: string;
  curriculum: string;
}

export default function SyllabusGrid({ questions, subject, topic, grade, level, curriculum }: SyllabusGridProps) {
  const [copied, setCopied] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  const handleCopy = () => {
    const headers = 'No\tAlur Tujuan Pemelajaran (ATP) / Indikator\tMateri Pokok\tBentuk Soal\tLevel Kognitif\tNomor Soal\tKunci Jawaban\n';
    const rows = questions.map(q => {
      const levelKognitif = q.difficulty === 'MUDAH' ? 'Level 1 (C1-C2)' : q.difficulty === 'SEDANG' ? 'Level 2 (C3-C4)' : 'Level 3 (C5-C6)';
      return `${q.number}\t${q.competencyIndicator || 'Menganalisis sistem fisis'}\t${topic}\t${q.type}\t${levelKognitif}\t${q.number}\t${q.correctAnswer}`;
    }).join('\n');

    navigator.clipboard.writeText(headers + rows);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
      {/* Header Controls */}
      <div className="p-4 bg-slate-50 border-b border-gray-100 flex flex-wrap items-center justify-between gap-2">
        <div>
          <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Kisi-Kisi Penamaan Soal & Butir Penilaian</h4>
          <p className="text-[10px] text-slate-400">Gunakan kisi-kisi ini untuk mengunduh, mencetak, atau memasukkan ke Excel / Google Sheets.</p>
        </div>
        
        <div className="flex gap-2">
          <button 
            onClick={handleCopy}
            className="px-3 py-1.5 rounded-lg border border-gray-200 bg-white hover:bg-slate-50 font-bold text-xs text-slate-600 flex items-center gap-1.5 transition-colors"
          >
            {copied ? (
              <>
                <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                <span className="text-emerald-600">Berhasil Disalin!</span>
              </>
            ) : (
              <>
                <Clipboard className="w-3.5 h-3.5 text-slate-400" />
                <span>Salin untuk Excel</span>
              </>
            )}
          </button>
          
          <button 
            onClick={handlePrint}
            className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 font-bold text-xs text-white flex items-center gap-1.5 transition-colors shadow-sm"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Cetak Kisi-Kisi</span>
          </button>
        </div>
      </div>

      {/* Meta specifications */}
      <div className="p-4 grid grid-cols-2 md:grid-cols-4 gap-4 border-b border-slate-100 text-xs">
        <div>
          <span className="text-slate-400 block text-[9px] uppercase font-bold tracking-wider">Mata Pelajaran</span>
          <span className="font-bold text-slate-700">{subject}</span>
        </div>
        <div>
          <span className="text-slate-400 block text-[9px] uppercase font-bold tracking-wider">Kelas / Jenjang</span>
          <span className="font-bold text-slate-700">{grade} ({level})</span>
        </div>
        <div>
          <span className="text-slate-400 block text-[9px] uppercase font-bold tracking-wider">Topik Materi</span>
          <span className="font-bold text-slate-700">{topic}</span>
        </div>
        <div>
          <span className="text-slate-400 block text-[9px] uppercase font-bold tracking-wider">Kurikulum Pengarah</span>
          <span className="font-bold text-brand-purple">{curriculum}</span>
        </div>
      </div>

      {/* Blueprint Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-100 border-b border-slate-200 text-[10px] uppercase font-bold text-slate-500 tracking-wider">
              <th className="py-3 px-4 text-center w-12">No</th>
              <th className="py-3 px-4 max-w-sm">Indikator Pencapaian Kompetensi (IPK) / Capaian Pembelajaran</th>
              <th className="py-3 px-4">Materi Pokok</th>
              <th className="py-3 px-4">Bentuk Soal</th>
              <th className="py-3 px-4">Level Kognitif</th>
              <th className="py-3 px-4 text-center">No. Soal</th>
              <th className="py-3 px-4 text-center">Jawaban</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-xs">
            {questions.map((q, idx) => (
              <tr key={q.id} className="hover:bg-slate-50/50 transition-colors">
                <td className="py-3.5 px-4 text-center font-bold text-slate-400">{idx + 1}</td>
                <td className="py-3.5 px-4 font-medium text-slate-700 leading-relaxed max-w-sm">
                  {q.competencyIndicator || `Menganalisis prinsip dan penyelesaian teoritis materi pokok ${topic}.`}
                </td>
                <td className="py-3.5 px-4 text-slate-600">{topic}</td>
                <td className="py-3.5 px-4">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    q.type === 'Pilihan Ganda' ? 'bg-blue-100 text-blue-700' :
                    q.type === 'Isian Singkat' ? 'bg-green-100 text-green-700' :
                    'bg-orange-100 text-orange-700'
                  }`}>
                    {q.type}
                  </span>
                </td>
                <td className="py-3.5 px-4">
                  <span className={`font-bold ${
                    q.difficulty === 'MUDAH' ? 'text-green-600' :
                    q.difficulty === 'SEDANG' ? 'text-amber-500' :
                    'text-red-500'
                  }`}>
                    {q.difficulty === 'MUDAH' ? 'L1 - Mudah (C1/C2)' :
                     q.difficulty === 'SEDANG' ? 'L2 - Sedang (C3/C4)' :
                     'L3 - Sulit (C5/C6)'}
                  </span>
                </td>
                <td className="py-3.5 px-4 text-center font-bold text-slate-600">{q.number}</td>
                <td className="py-3.5 px-4 text-center"><span className="bg-slate-100 text-slate-700 px-2 py-1 rounded font-mono font-bold">{q.correctAnswer}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="p-4 bg-indigo-50/50 border-t border-slate-100 flex items-center gap-2">
        <FileSpreadsheet className="w-4 h-4 text-brand-purple flex-shrink-0" />
        <span className="text-[10px] text-indigo-700">
          <strong>Tips Integrasi:</strong> Klik <strong>"Salin untuk Excel"</strong> lalu langsung tempel (CTRL+V) di Microsoft Excel atau Google Sheets. Kolom dan baris akan otomatis merapikan diri sesuai format standarnya!
        </span>
      </div>
    </div>
  );
}
