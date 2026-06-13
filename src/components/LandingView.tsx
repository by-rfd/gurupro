import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, FileText, BookOpen, GraduationCap, ArrowRight, ShieldCheck } from 'lucide-react';
import RfdLogo from './RfdLogo';

interface LandingViewProps {
  onSelectFeature: (feature: 'Soal' | 'Modul') => void;
}

export default function LandingView({ onSelectFeature }: LandingViewProps) {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 md:py-12 text-center select-none font-sans">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Large Centered Logo and Brand */}
        <RfdLogo showText={true} iconSize={68} className="justify-center mb-8 scale-110" textColorClass="text-slate-800 text-xl" textSubClass="text-xs text-slate-400" />

        <div className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-100 text-brand-darkPurple rounded-full px-4 py-1.5 mb-6 text-xs font-bold shadow-sm">
          <Sparkles className="w-4 h-4 text-orange-500 animate-pulse" />
          <span>Sistem Pembelajaran AI Terintegrasi Kurikulum Nasional</span>
        </div>
        
        <h1 className="font-display font-extrabold text-3xl md:text-5xl text-slate-800 leading-tight tracking-tight mb-4">
          Gerbang Pintar Administrasi <span className="text-brand-purple bg-clip-text">Guru Indonesia</span>
        </h1>
        
        <p className="max-w-2xl mx-auto text-slate-500 text-sm md:text-base leading-relaxed mb-12">
          Rancang materi asesmen kelas dan rancangan rencana pelaksanaan pembelajaran (Modul Ajar) secara komprehensif, berbasis AI yang dilaras dengan Kurikulum Merdeka, K13, KBC, dan Hybrid.
        </p>
      </motion.div>

      {/* Grid Menu Pilihan */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
        
        {/* Pilihan 1: Pembuat Soal */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          onClick={() => onSelectFeature('Soal')}
          className="group bg-white p-6 md:p-8 rounded-3xl border border-slate-100 hover:border-brand-purple shadow-md hover:shadow-xl transition-all cursor-pointer text-left flex flex-col justify-between"
          id="btn-select-soal"
        >
          <div>
            <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-brand-purple group-hover:text-white transition-colors shadow-inner">
              <FileText className="w-6 h-6 animate-pulse" />
            </div>
            <h3 className="font-display font-bold text-xl text-slate-800 mb-2 group-hover:text-brand-purple">
              Generator Soal Otomatis
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed mb-6">
              Rancang kisi-kisi, kunci jawaban, dan butir soal evaluasi (Pilihan Ganda, Isian, Benar/Salah) yang teratur, divalidasi dengan taksonomi kognitif dan simulasi interaktif siswa.
            </p>
          </div>
          
          <div className="flex items-center justify-between text-xs font-bold text-indigo-600 border-t border-slate-50 pt-4">
            <span className="flex items-center gap-1 bg-indigo-50 px-3 py-1 rounded-full text-[10px]">
              <ShieldCheck className="w-3.5 h-3.5 text-indigo-500" />
              Selesai dalam 2 Menit
            </span>
            <div className="flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              <span>Masuk Aplikasi</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </motion.div>

        {/* Pilihan 2: Modul Ajar */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          onClick={() => onSelectFeature('Modul')}
          className="group bg-white p-6 md:p-8 rounded-3xl border border-slate-100 hover:border-emerald-500 shadow-md hover:shadow-xl transition-all cursor-pointer text-left flex flex-col justify-between"
          id="btn-select-modul"
        >
          <div>
            <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-emerald-500 group-hover:text-white transition-colors shadow-inner">
              <BookOpen className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-xl text-slate-800 mb-2 group-hover:text-emerald-600">
              Penyusun Modul Ajar AI
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed mb-6">
              Susun Rencana Pelaksanaan Pembelajaran (RPP) Kurikulum Merdeka yang lengkap dengan komponen Inti, Pertanyaan Pemantik, Sintaks Kegiatan PBL/PjBL, LKPD, hingga Glosarium akademik kelas.
            </p>
          </div>
          
          <div className="flex items-center justify-between text-xs font-bold text-emerald-600 border-t border-slate-50 pt-4">
            <span className="flex items-center gap-1 bg-emerald-50 px-3 py-1 rounded-full text-[10px] text-emerald-700 border-emerald-100">
              <GraduationCap className="w-3.5 h-3.5 text-emerald-550" />
              Rekomendasi Kemendikbud
            </span>
            <div className="flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              <span>Masuk Aplikasi</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </motion.div>

      </div>

      {/* Footer Info */}
      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 0.6 }}
        className="text-[10px] text-slate-400 mt-16"
      >
        Lembaga Pendukung Kurikulum Terbuka Indonesia &bull; Akun Premium Unlimited Aktif
      </motion.p>
    </div>
  );
}
