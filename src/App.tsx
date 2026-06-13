/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  Key, 
  Layers, 
  GraduationCap, 
  BarChart3, 
  Printer, 
  Download, 
  Plus, 
  Flame, 
  Award, 
  Sparkles,
  CheckCircle2, 
  User, 
  School, 
  Sliders,
  Play,
  BookOpen,
  Info,
  ArrowLeft,
  Settings
} from 'lucide-react';
import { CurriculumType, Question, QuizIdentity, QuizConfig, QuestionType } from './types';
import { generateQuestions, SUBJECT_PRESETS } from './data';
import QuestionsList from './components/QuestionsList';
import SyllabusGrid from './components/SyllabusGrid';
import InteractiveQuiz from './components/InteractiveQuiz';
import AnalyticsDashboard from './components/AnalyticsDashboard';
import AddQuestionModal from './components/AddQuestionModal';

// NEW Extracted components
import LandingView from './components/LandingView';
import ModulAjarView from './components/ModulAjarView';
import RfdLogo from './components/RfdLogo';

export default function App() {
  // Navigation Routing State: 'None' (Landing Menu) | 'Soal' (Generate Questions) | 'Modul' (Generate Modul Ajar)
  const [activeFeature, setActiveFeature] = useState<'None' | 'Soal' | 'Modul'>('None');

  // Core States
  const [curriculum, setCurriculum] = useState<CurriculumType>('Merdeka');
  
  const [identity, setIdentity] = useState<QuizIdentity>({
    teacherName: 'Faisal',
    schoolName: 'SDN SUKAMAJU',
    level: 'SMP / MTs',
    grade: 'Kelas 8',
    subject: 'IPA',
    topic: 'Sistem Pencernaan',
    instrumentType: 'Sumatif Harian',
    optionsFormat: '4 Opsi (A-D)'
  });

  const [config, setConfig] = useState<QuizConfig>({
    multipleChoiceCount: 10,
    shortAnswerCount: 0,
    trueFalseCount: 0,
    difficultyEasy: 30,
    difficultyMedium: 50,
    difficultyHard: 20
  });

  const [questions, setQuestions] = useState<Question[]>([]);
  const [activeTab, setActiveTab] = useState<'Soal' | 'Kunci' | 'Kisi-kisi' | 'Kuis' | 'Analisis'>('Soal');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // States for loaders
  const [isGeneratingQuestions, setIsGeneratingQuestions] = useState(false);
  const [generatingMessage, setGeneratingMessage] = useState('Merumuskan materi...');

  // State for mobile view responsive switcher tabs
  const [mobileSubTab, setMobileSubTab] = useState<'config' | 'result'>('config');

  // Initialize questions on load (simulation first)
  useEffect(() => {
    const total = config.multipleChoiceCount + config.shortAnswerCount + config.trueFalseCount;
    const generated = generateQuestions(curriculum, identity, config);
    setQuestions(generated);
  }, []);

  // Show a gorgeous toast message helper
  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // AI-Powered & Simulation Integrated Questions Generator
  const handleGenerateQuestions = async (silent = false) => {
    const total = config.multipleChoiceCount + config.shortAnswerCount + config.trueFalseCount;
    if (total <= 0) {
      if (!silent) triggerToast('Kesalahan: Total jumlah soal harus lebih besar dari 0!');
      return;
    }

    const sumDifficulty = config.difficultyEasy + config.difficultyMedium + config.difficultyHard;
    if (sumDifficulty !== 100) {
      if (!silent) triggerToast('Peringatan: Jumlah proporsi tingkat kesulitan harus bernilai tepat 100%!');
      // Adjust to 100% mathematically
      setConfig(prev => ({
        ...prev,
        difficultyEasy: 30,
        difficultyMedium: 50,
        difficultyHard: 20
      }));
    }

    if (silent) {
      const generated = generateQuestions(curriculum, identity, config);
      setQuestions(generated);
      return;
    }

    setIsGeneratingQuestions(true);
    setMobileSubTab('result'); // Switch to result view on mobile to show progress

    // Cycle educational loaders
    const loadingStates = [
      'Menghubungi AI Gemini...',
      'Menganalisis Kategori Taksonomi ...',
      'Merumuskan Soal Kurikulum...',
      'Validasi Kunci Jawaban...',
      'Menyusun Pembahasan Rinci...'
    ];
    let step = 0;
    setGeneratingMessage(loadingStates[0]);
    const stepInterval = setInterval(() => {
      step = (step + 1) % loadingStates.length;
      setGeneratingMessage(loadingStates[step]);
    }, 2500);

    try {
      const response = await fetch('/api/generate-questions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ curriculum, identity, config })
      });
      
      clearInterval(stepInterval);
      const resData = await response.json();

      if (resData.success && resData.questions && resData.questions.length > 0) {
        setQuestions(resData.questions);
        triggerToast(`Sukses AI: ${resData.questions.length} Butir Soal berhasil dirumuskan AI!`);
      } else {
        throw new Error(resData.message || 'Gagal merancang soal.');
      }

    } catch (err: any) {
      clearInterval(stepInterval);
      console.warn("AI Question generation failed / fallback logic used:", err.message);
      triggerToast('Info: Mengaktifkan bank soal simulasi kurikulum instan...');
      
      // Fallback local procedular generator
      setTimeout(() => {
        const generated = generateQuestions(curriculum, identity, config);
        setQuestions(generated);
        triggerToast(`Sukses: ${generated.length} Butir Soal simulasi berhasil disusun!`);
      }, 500);
    } finally {
      setIsGeneratingQuestions(false);
    }
  };

  // Action: Update custom questions inline
  const handleUpdateQuestion = (updated: Question) => {
    setQuestions(prev => prev.map(q => q.id === updated.id ? updated : q));
    triggerToast(`Soal No. ${updated.number} berhasil diperbarui.`);
  };

  // Action: Delete single question
  const handleDeleteQuestion = (id: string) => {
    const remaining = questions.filter(q => q.id !== id);
    // Renumber
    const renumbered = remaining.map((q, idx) => ({
      ...q,
      number: idx + 1
    }));
    setQuestions(renumbered);
    
    // Decrease count configurations to reflect deletion in left panel
    const deletedQ = questions.find(q => q.id === id);
    if (deletedQ) {
      if (deletedQ.type === 'Pilihan Ganda') {
        setConfig(prev => ({ ...prev, multipleChoiceCount: Math.max(0, prev.multipleChoiceCount - 1) }));
      } else if (deletedQ.type === 'Isian Singkat') {
        setConfig(prev => ({ ...prev, shortAnswerCount: Math.max(0, prev.shortAnswerCount - 1) }));
      } else {
        setConfig(prev => ({ ...prev, trueFalseCount: Math.max(0, prev.trueFalseCount - 1) }));
      }
    }
    
    triggerToast(`Soal berhasil dihapus.`);
  };

  // Action: Add custom question
  const handleAddQuestion = (newQ: Omit<Question, 'id' | 'number'>) => {
    const nextNum = questions.length + 1;
    const added: Question = {
      ...newQ,
      id: `custom_${Date.now()}`,
      number: nextNum
    };
    setQuestions(prev => [...prev, added]);

    // Increase configuration stats
    if (newQ.type === 'Pilihan Ganda') {
      setConfig(prev => ({ ...prev, multipleChoiceCount: prev.multipleChoiceCount + 1 }));
    } else if (newQ.type === 'Isian Singkat') {
      setConfig(prev => ({ ...prev, shortAnswerCount: prev.shortAnswerCount + 1 }));
    } else {
      setConfig(prev => ({ ...prev, trueFalseCount: prev.trueFalseCount + 1 }));
    }

    triggerToast(`Berhasil menambahkan Soal Kustom No. ${nextNum}!`);
  };

  // Export functions (simulate downloads or copy beautifully)
  const exportToWord = () => {
    let text = `=========================================\n`;
    text += `LEMBAR SOAL UJIAN - ${identity.instrumentType.toUpperCase()}\n`;
    text += `=========================================\n`;
    text += `Satuan Pendidikan : ${identity.schoolName}\n`;
    text += `Mata Pelajaran    : ${identity.subject}\n`;
    text += `Kelas / Jenjang   : ${identity.grade} / ${identity.level}\n`;
    text += `Topik Pembahasan  : ${identity.topic}\n`;
    text += `Kurikulum Acuan   : Kurikulum ${curriculum}\n`;
    text += `Nama Guru Pengampu: ${identity.teacherName}\n`;
    text += `-----------------------------------------\n\n`;

    questions.forEach(q => {
      text += `${q.number}. [${q.type}] (${q.difficulty})\n`;
      text += `   ${q.questionText}\n`;
      if (q.type === 'Pilihan Ganda' && q.options) {
        q.options.forEach((opt, idx) => {
          text += `   ${String.fromCharCode(65 + idx)}. ${opt}\n`;
        });
      }
      text += `\n`;
    });

    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Soal_${identity.subject.replace(/\s+/g, '_')}_${identity.topic.replace(/\s+/g, '_')}.txt`;
    link.click();
    triggerToast('Download Lembar Soal (.TXT) sukses dimulai!');
  };

  const exportPDFMock = () => {
    window.print();
  };

  return (
    <div className="bg-gray-50 min-h-screen text-slate-700 font-sans antialiased pb-12 selection:bg-brand-purple/25">
      
      {/* Toast Alert Popup */}
      {toastMessage && (
        <div className="fixed top-24 right-6 z-50 bg-slate-900 text-white rounded-xl shadow-2xl px-4 py-3 border border-slate-750 text-xs flex items-center gap-2 animate-bounce">
          <Sparkles className="w-4 h-4 text-brand-purple animate-pulse" />
          <span className="font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Main Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-40 shadow-sm print:hidden">
        <div className="max-w-7xl mx-auto px-6 py-3 flex flex-col sm:flex-row items-center justify-between gap-4">
          
          <div className="flex items-center gap-3 cursor-pointer select-none" onClick={() => setActiveFeature('None')}>
            {/* Elegant Custom Uploaded Logo & Text Branding */}
            <RfdLogo showText={true} iconSize={42} textColorClass="text-slate-805" textSubClass="text-[10px] text-slate-400" />
          </div>

          <div className="flex items-center gap-2">
            {activeFeature !== 'None' && (
              <button 
                onClick={() => { setActiveFeature('None'); triggerToast("Kembali ke Menu Utama."); }}
                className="bg-slate-100 hover:bg-slate-200 text-slate-650 text-xs px-3 py-1.5 rounded-xl border border-slate-200 font-bold flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Menu Utama</span>
              </button>
            )}
            
            <a 
              href="#subscription"
              onClick={(e) => { e.preventDefault(); triggerToast("Pemberitahuan: Anda berada di Akun PRO Guru Premium Unlimited!"); }}
              className="bg-brand-lightBlue hover:bg-indigo-100 text-brand-purple text-[10px] px-3.5 py-1.5 rounded-full font-black tracking-widest border border-brand-purple/20 flex items-center gap-1.5 hover:scale-105 transition-all shadow-sm"
            >
              <Award className="w-3.5 h-3.5" />
              <span>AKUN PRO GURU</span>
            </a>
          </div>

        </div>
      </header>

      {/* ROUTER PANEL BODY VIEW */}
      
      {/* 1. LANDING/SPLASH PANEL */}
      {activeFeature === 'None' && (
        <LandingView onSelectFeature={(feature) => {
          setActiveFeature(feature);
          if (feature === 'Soal') {
            triggerToast("Mengaktifkan Modul Pembuat Soal Otomatis...");
          } else {
            triggerToast("Mengaktifkan Modul Penyusun Modul Ajar...");
          }
        }} />
      )}

      {/* 2. MODUL AJAR LAYOUT VIEW */}
      {activeFeature === 'Modul' && (
        <ModulAjarView 
          onBackToMenu={() => setActiveFeature('None')} 
          triggerToast={triggerToast} 
        />
      )}

      {/* 3. GENERATE SOAL INTERFACE PANEL */}
      {activeFeature === 'Soal' && (
        <div className="max-w-7xl mx-auto px-4 py-2">
          
          <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-4 mb-4 flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-2">
              <span className="p-1 h-fit w-fit bg-brand-lightBlue text-brand-purple rounded-md">
                <Sliders className="w-4 h-4" />
              </span>
              <div>
                <h2 className="text-sm font-extrabold text-slate-800">Modul Pembuat Soal Otomatis</h2>
                <p className="text-[10px] text-slate-400">Ubah konfigurasi form dan klik "Buat Soal Otomatis" untuk merombak bank soal pelajaran Anda.</p>
              </div>
            </div>
          </div>

          {/* Mobile switcher tabs for Form vs Result - PERFECT FLUIDITY */}
          <div className="lg:hidden flex bg-white border border-slate-200 rounded-xl p-1 mb-4 shadow-sm">
            <button 
              onClick={() => setMobileSubTab('config')}
              className={`flex-1 py-2.5 rounded-lg text-xs font-bold text-center transition-all cursor-pointer ${
                mobileSubTab === 'config' ? 'bg-brand-purple text-white shadow-md' : 'text-slate-500 hover:bg-slate-50'
              }`}
            >
              Atur parameter Form
            </button>
            <button 
              onClick={() => setMobileSubTab('result')}
              className={`flex-1 py-1.5 rounded-lg text-xs font-bold text-center transition-all cursor-pointer ${
                mobileSubTab === 'result' ? 'bg-brand-purple text-white shadow-md' : 'text-slate-500 hover:bg-slate-50'
              }`}
            >
              Lihat Hasil Soal ({questions.length})
            </button>
          </div>

          <div className="flex flex-col lg:flex-row gap-6">
            
            {/* LEFT CONTROL PANEL - SIDEBAR */}
            <aside className={`w-full lg:w-[360px] flex-shrink-0 flex flex-col gap-4 ${mobileSubTab === 'config' ? 'flex' : 'hidden lg:flex'}`}>
              
              {/* Section: Pilih Kurikulum */}
              <section className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100" data-purpose="curriculum-selection">
                <div className="flex items-center gap-2 mb-4">
                  <div className="p-1.5 bg-indigo-50 text-brand-purple rounded-lg">
                    <Sliders className="w-4 h-4" />
                  </div>
                  <h2 className="font-bold text-slate-800 text-xs uppercase tracking-wider">Kurikulum Pengarah</h2>
                </div>
                
                <div className="grid grid-cols-2 gap-2">
                  <button 
                    onClick={() => { setCurriculum('Merdeka'); triggerToast('Kurikulum diganti: Merdeka'); }}
                    className={`flex flex-col items-start p-3 rounded-xl border-2 transition-all cursor-pointer ${
                      curriculum === 'Merdeka' 
                        ? 'border-brand-purple bg-brand-lightBlue text-left' 
                        : 'border-slate-100 hover:border-slate-200 text-left hover:bg-slate-50'
                    }`}
                  >
                    <span className={`text-xs font-black ${curriculum === 'Merdeka' ? 'text-brand-purple' : 'text-slate-700'}`}>Merdeka</span>
                    <span className="text-[9px] text-slate-400 mt-0.5">Deep Learning</span>
                  </button>
                  
                  <button 
                    onClick={() => { setCurriculum('KBC'); triggerToast('Kurikulum diganti: KBC'); }}
                    className={`flex flex-col items-start p-3 rounded-xl border-2 transition-all cursor-pointer ${
                      curriculum === 'KBC' 
                        ? 'border-green-500 bg-green-50/50 text-left' 
                        : 'border-slate-100 hover:border-slate-200 text-left hover:bg-slate-50'
                    }`}
                  >
                    <span className={`text-xs font-black ${curriculum === 'KBC' ? 'text-green-600' : 'text-slate-700'}`}>KBC</span>
                    <span className="text-[9px] text-slate-400 mt-0.5">Madrasah</span>
                  </button>
                  
                  <button 
                    onClick={() => { setCurriculum('K13'); triggerToast('Kurikulum diganti: K13'); }}
                    className={`flex flex-col items-start p-3 rounded-xl border-2 transition-all cursor-pointer ${
                      curriculum === 'K13' 
                        ? 'border-orange-500 bg-orange-50/30 text-left' 
                        : 'border-slate-100 hover:border-slate-200 text-left hover:bg-slate-50'
                    }`}
                  >
                    <span className={`text-xs font-black ${curriculum === 'K13' ? 'text-orange-600' : 'text-slate-700'}`}>K13</span>
                    <span className="text-[9px] text-slate-400 mt-0.5">Klasik 2013</span>
                  </button>

                  <button 
                    onClick={() => { setCurriculum('Hybrid'); triggerToast('Kurikulum diganti: Hybrid'); }}
                    className={`flex flex-col items-start p-3 rounded-xl border-2 transition-all cursor-pointer ${
                      curriculum === 'Hybrid' 
                        ? 'border-purple-600 bg-purple-50/50 text-left' 
                        : 'border-slate-100 hover:border-slate-200 text-left hover:bg-slate-50'
                    }`}
                  >
                    <span className={`text-xs font-black ${curriculum === 'Hybrid' ? 'text-purple-600' : 'text-slate-700'}`}>Hybrid</span>
                    <span className="text-[9px] text-slate-400 mt-0.5">Gabungan CP & KD</span>
                  </button>
                </div>
              </section>

              {/* Section: Identitas Soal */}
              <section className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100" data-purpose="identity-form">
                <div className="flex items-center gap-2 mb-4">
                  <div className="p-1.5 bg-sky-50 text-sky-600 rounded-lg">
                    <GraduationCap className="w-4 h-4" />
                  </div>
                  <h2 className="font-bold text-slate-800 text-xs uppercase tracking-wider">Identitas Lembar Asesmen</h2>
                </div>

                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[10px] text-slate-400 font-bold block mb-1 uppercase tracking-wide">Guru Pengampu</label>
                      <div className="relative">
                        <User className="absolute left-2.5 top-2.5 w-3.5 h-3.5 text-slate-400" />
                        <input 
                          className="w-full text-xs font-semibold rounded-xl border border-slate-200 pl-8 p-1.5 focus:ring-1 focus:ring-brand-purple focus:border-brand-purple focus:outline-none bg-slate-50 focus:bg-white" 
                          type="text" 
                          value={identity.teacherName}
                          onChange={(e) => setIdentity(prev => ({ ...prev, teacherName: e.target.value }))}
                          placeholder="Faisal"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-[10px] text-slate-400 font-bold block mb-1 uppercase tracking-wide">Pendidikan</label>
                      <div className="relative">
                        <School className="absolute left-2.5 top-2.5 w-3.5 h-3.5 text-slate-400" />
                        <input 
                          className="w-full text-xs font-semibold rounded-xl border border-slate-200 pl-8 p-1.5 focus:ring-1 focus:ring-brand-purple focus:border-brand-purple focus:outline-none bg-slate-50 focus:bg-white" 
                          type="text" 
                          value={identity.schoolName}
                          onChange={(e) => setIdentity(prev => ({ ...prev, schoolName: e.target.value }))}
                          placeholder="SDN SUKAMAJU"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[10px] text-slate-400 font-bold block mb-1 uppercase tracking-wide">Jenjang</label>
                      <select 
                        className="w-full text-xs font-semibold rounded-xl border border-slate-200 p-1.5 bg-slate-50 focus:bg-white focus:outline-none"
                        value={identity.level}
                        onChange={(e) => {
                          const levelVal = e.target.value;
                          setIdentity(prev => ({ 
                            ...prev, 
                            level: levelVal,
                            grade: levelVal === 'SD / MI' ? 'Kelas 5' : levelVal === 'SMA / MA' ? 'Kelas 11' : 'Kelas 8'
                          }));
                        }}
                      >
                        <option value="SD / MI">SD / MI</option>
                        <option value="SMP / MTs">SMP / MTs</option>
                        <option value="SMA / MA">SMA / MA</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-[10px] text-slate-400 font-bold block mb-1 uppercase tracking-wide">Kelas Siswa</label>
                      <select 
                        className="w-full text-xs font-semibold rounded-xl border border-slate-200 p-1.5 bg-slate-50 focus:outline-none"
                        value={identity.grade}
                        onChange={(e) => setIdentity(prev => ({ ...prev, grade: e.target.value }))}
                      >
                        {identity.level === 'SD / MI' ? (
                          <>
                            <option value="Kelas 4">Kelas 4</option>
                            <option value="Kelas 5">Kelas 5</option>
                            <option value="Kelas 6">Kelas 6</option>
                          </>
                        ) : identity.level === 'SMA / MA' ? (
                          <>
                            <option value="Kelas 10">Kelas 10</option>
                            <option value="Kelas 11">Kelas 11</option>
                            <option value="Kelas 12">Kelas 12</option>
                          </>
                        ) : (
                          <>
                            <option value="Kelas 7">Kelas 7</option>
                            <option value="Kelas 8">Kelas 8</option>
                            <option value="Kelas 9">Kelas 9</option>
                          </>
                        )}
                      </select>
                    </div>
                  </div>

                  {/* Mata Pelajaran - MANUAL TEXT INPUT as requested in #1 */}
                  <div>
                    <label className="text-[10px] text-slate-450 font-bold block mb-1 uppercase tracking-wide">Mata Pelajaran (Tulis Manual)</label>
                    <input 
                      type="text"
                      className="w-full text-xs font-semibold rounded-xl border border-slate-200 p-2 bg-slate-50 focus:bg-white focus:ring-1 focus:ring-brand-purple focus:border-brand-purple focus:outline-none"
                      value={identity.subject}
                      onChange={(e) => setIdentity(prev => ({ ...prev, subject: e.target.value }))}
                      placeholder="Contoh: IPA, Matematika, Kimia, IPS"
                    />
                    
                    {/* Suggestion Chips */}
                    <div className="flex flex-wrap gap-1 mt-1.5">
                      {['IPA', 'Matematika', 'Bahasa Indonesia', 'IPS'].map(chip => (
                        <button 
                          key={chip}
                          type="button"
                          onClick={() => {
                            setIdentity(prev => ({ ...prev, subject: chip }));
                            triggerToast(`Berubah ke: ${chip}`);
                          }}
                          className="text-[9px] font-bold px-2 py-0.5 rounded bg-slate-100 hover:bg-slate-200 text-slate-550 border border-slate-200/50 cursor-pointer"
                        >
                          +{chip}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Topik / Sub Materi Pokok - MANUAL TEXT INPUT as requested in #1 */}
                  <div>
                    <label className="text-[10px] text-slate-450 font-bold block mb-1 uppercase tracking-wide">Topik / Sub Materi Pokok (Tulis Manual)</label>
                    <input 
                      type="text"
                      className="w-full text-xs font-bold rounded-xl border border-slate-200 p-2 bg-purple-50 text-indigo-805 focus:bg-white focus:ring-1 focus:ring-brand-purple focus:border-brand-purple focus:outline-none"
                      value={identity.topic}
                      onChange={(e) => setIdentity(prev => ({ ...prev, topic: e.target.value }))}
                      placeholder="Contoh: Sistem Pencernaan, Gaya & Gerak Newton"
                    />
                    
                    {/* Quick topic suggestion chips based on subject selection */}
                    {identity.subject === 'IPA' && (
                      <div className="flex flex-wrap gap-1 mt-1.5">
                        {['Sistem Pencernaan', 'Gaya dan Gerak', 'Pesawat Sederhana'].map(chip => (
                          <button 
                            key={chip}
                            type="button"
                            onClick={() => {
                              setIdentity(prev => ({ ...prev, topic: chip }));
                              triggerToast(`Topik berubah: ${chip}`);
                            }}
                            className="text-[9px] font-bold px-2 py-0.5 rounded bg-indigo-50 hover:bg-indigo-100 text-indigo-650 cursor-pointer"
                          >
                            +{chip}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </section>

              {/* Section: Konfigurasi Soal */}
              <section className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100" data-purpose="config-form">
                <div className="flex items-center gap-2 mb-4">
                  <div className="p-1.5 bg-amber-50 text-amber-500 rounded-lg">
                    <Sliders className="w-4 h-4 text-brand-purple" />
                  </div>
                  <h2 className="font-bold text-slate-800 text-xs uppercase tracking-wider">Konfigurasi Butir Soal</h2>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-2">
                    {/* Dropdown for Instrument type with required values from #2 */}
                    <div>
                      <label className="text-[10px] text-slate-400 font-bold block mb-1 uppercase">Jenis Instrumen</label>
                      <select 
                        className="w-full text-xs font-semibold rounded-xl border border-slate-200 p-1.5 bg-slate-50 focus:outline-none"
                        value={identity.instrumentType}
                        onChange={(e) => setIdentity(prev => ({ ...prev, instrumentType: e.target.value }))}
                      >
                        <option value="Sumatif Harian">Sumatif Harian</option>
                        <option value="Asesmen Sumatif Akhir Semester (ASAS)">Asesmen Sumatif Akhir Semester (ASAS)</option>
                        <option value="Asesmen Sumatif Akhir Tahun (ASAT)">Asesmen Sumatif Akhir Tahun (ASAT)</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-[10px] text-slate-400 font-bold block mb-1 uppercase">Opsi Jwb (PG)</label>
                      <select 
                        className="w-full text-xs font-semibold rounded-xl border border-slate-200 p-1.5 bg-slate-50 focus:outline-none"
                        value={identity.optionsFormat}
                        onChange={(e) => setIdentity(prev => ({ ...prev, optionsFormat: e.target.value }))}
                      >
                        <option value="4 Opsi (A-D)">4 Opsi (A-D)</option>
                        <option value="5 Opsi (A-E)">5 Opsi (A-E)</option>
                      </select>
                    </div>
                  </div>

                  {/* Counts of Question Types */}
                  <div className="grid grid-cols-3 gap-2">
                    <div className="bg-blue-50/50 p-2 rounded-xl border border-blue-100">
                      <label className="text-[9px] font-black text-blue-650 uppercase block mb-1 tracking-wider">Pil. Ganda</label>
                      <input 
                        className="w-full text-base font-black text-blue-800 bg-transparent border-none p-0 focus:ring-0 focus:outline-none" 
                        type="number" 
                        min={0}
                        max={30}
                        value={config.multipleChoiceCount}
                        onChange={(e) => setConfig(prev => ({ ...prev, multipleChoiceCount: Math.max(0, parseInt(e.target.value) || 0) }))}
                      />
                    </div>
                    <div className="bg-green-50/50 p-2 rounded-xl border border-green-100">
                      <label className="text-[9px] font-black text-green-650 block mb-1 uppercase tracking-wider">Isian</label>
                      <input 
                        className="w-full text-base font-black text-green-800 bg-transparent border-none p-0 focus:ring-0 focus:outline-none" 
                        type="number" 
                        min={0}
                        max={15}
                        value={config.shortAnswerCount}
                        onChange={(e) => setConfig(prev => ({ ...prev, shortAnswerCount: Math.max(0, parseInt(e.target.value) || 0) }))}
                      />
                    </div>
                    <div className="bg-orange-50/50 p-2 rounded-xl border border-orange-100">
                      <label className="text-[9px] font-black text-orange-655 block mb-1 uppercase tracking-wider">Benar/Salah</label>
                      <input 
                        className="w-full text-base font-black text-orange-800 bg-transparent border-none p-0 focus:ring-0 focus:outline-none" 
                        type="number" 
                        min={0}
                        max={15}
                        value={config.trueFalseCount}
                        onChange={(e) => setConfig(prev => ({ ...prev, trueFalseCount: Math.max(0, parseInt(e.target.value) || 0) }))}
                      />
                    </div>
                  </div>

                  {/* Proportions difficulty slider / input */}
                  <div className="mt-2 pt-3 border-t border-slate-100">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Tingkat Kesulitan (% Total)</h3>
                      <span className={`text-[10px] font-black ${
                        config.difficultyEasy + config.difficultyMedium + config.difficultyHard === 100 
                          ? 'text-emerald-600' 
                          : 'text-red-500'
                      }`}>
                        Sum: {config.difficultyEasy + config.difficultyMedium + config.difficultyHard}%
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-2">
                      <div className="bg-green-50 p-2 rounded-xl border border-green-200 text-center">
                        <span className="text-[9px] text-green-700 block uppercase font-bold tracking-wide">Mudah</span>
                        <input
                          type="number"
                          className="w-full text-xs font-black text-center text-green-800 bg-transparent border-none p-0 focus:ring-0 focus:outline-none mt-0.5"
                          value={config.difficultyEasy}
                          onChange={(e) => setConfig(prev => ({ ...prev, difficultyEasy: parseInt(e.target.value) || 0 }))}
                        />
                      </div>
                      <div className="bg-yellow-50 p-2 rounded-xl border border-yellow-250 text-center">
                        <span className="text-[9px] text-yellow-750 block uppercase font-bold tracking-wide">Sedang</span>
                        <input
                          type="number"
                          className="w-full text-xs font-black text-center text-yellow-800 bg-transparent border-none p-0 focus:ring-0 focus:outline-none mt-0.5"
                          value={config.difficultyMedium}
                          onChange={(e) => setConfig(prev => ({ ...prev, difficultyMedium: parseInt(e.target.value) || 0 }))}
                        />
                      </div>
                      <div className="bg-red-50 p-2 rounded-xl border border-red-200 text-center">
                        <span className="text-[9px] text-red-750 block uppercase font-bold tracking-wide">Sulit</span>
                        <input
                          type="number"
                          className="w-full text-xs font-black text-center text-red-800 bg-transparent border-none p-0 focus:ring-0 focus:outline-none mt-0.5"
                          value={config.difficultyHard}
                          onChange={(e) => setConfig(prev => ({ ...prev, difficultyHard: parseInt(e.target.value) || 0 }))}
                        />
                      </div>
                    </div>

                    {config.difficultyEasy + config.difficultyMedium + config.difficultyHard !== 100 && (
                      <p className="text-[9px] font-semibold text-red-500 mt-1.5 flex items-center gap-1">
                        <Info className="w-3 h-3" /> Total proporsi harus bernilai tepat 100%!
                      </p>
                    )}
                  </div>

                  {/* Trigger Button: Buat Soal Otomatis */}
                  <button 
                    onClick={() => handleGenerateQuestions()}
                    disabled={config.multipleChoiceCount + config.shortAnswerCount + config.trueFalseCount === 0 || isGeneratingQuestions}
                    className="w-full bg-brand-darkPurple hover:bg-brand-purple disabled:opacity-50 text-white font-bold py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-all mt-4 shadow-lg shadow-brand-purple/20 cursor-pointer hover:scale-[1.01] active:scale-95"
                  >
                    <Sparkles className="w-4.5 h-4.5 text-yellow-200 animate-spin-slow" />
                    <span>Buat Soal dengan AI</span>
                  </button>
                </div>
              </section>

            </aside>

            {/* MAIN CONTENT AREA - SHIFTED ON MOBILE */}
            <div className={`flex-grow flex flex-col gap-6 min-w-0 ${mobileSubTab === 'result' ? 'flex' : 'hidden lg:flex'}`}>
              
              {/* Spinner loader indicator */}
              {isGeneratingQuestions && (
                <div className="bg-white border border-slate-100 p-8 py-16 rounded-2xl shadow-sm text-center flex flex-col items-center justify-center">
                  <div className="relative mb-6">
                    <span className="absolute inline-flex h-12 w-12 rounded-full bg-indigo-500 opacity-20 animate-ping"></span>
                    <div className="w-12 h-12 bg-indigo-500 text-white rounded-full flex items-center justify-center shadow-lg shadow-indigo-500/30">
                      <Sparkles className="w-6 h-6 animate-spin" />
                    </div>
                  </div>
                  <h4 className="font-display font-extrabold text-base text-slate-800">Merumuskan Asesmen AI...</h4>
                  <p className="text-xs text-brand-purple font-bold tracking-wider uppercase mt-1 animate-pulse">{generatingMessage}</p>
                </div>
              )}

              {/* Default Welcome empty state if questions empty */}
              {questions.length === 0 && !isGeneratingQuestions && (
                <div className="bg-white border border-slate-100 p-8 py-16 rounded-2xl shadow-sm text-center">
                  <div className="w-16 h-16 bg-slate-50 text-indigo-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-inner">
                    <FileText className="w-8 h-8" />
                  </div>
                  <h3 className="font-display font-black text-lg text-slate-800 mb-2">Belum Ada Soal Terdaftar</h3>
                  <p className="max-w-md mx-auto text-xs text-slate-400 mb-6">
                    Klik tombol <strong>"Buat Soal dengan AI"</strong> untuk menyusun modul soal evaluasi.
                  </p>
                </div>
              )}

              {questions.length > 0 && !isGeneratingQuestions && (
                <>
                  {/* Horizontal Navigation Tabs */}
                  <nav className="bg-white p-1.5 rounded-2xl border border-slate-100 flex flex-wrap gap-1 shadow-sm items-center" data-purpose="main-tabs">
                    <button 
                      onClick={() => setActiveTab('Soal')}
                      className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                        activeTab === 'Soal' 
                          ? 'bg-brand-purple text-white shadow-md shadow-brand-purple/20' 
                          : 'text-slate-500 hover:bg-slate-50'
                      }`}
                    >
                      <FileText className="w-4 h-4" />
                      <span>Lembar Soal</span>
                    </button>
                    
                    <button 
                      onClick={() => setActiveTab('Kunci')}
                      className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                        activeTab === 'Kunci' 
                          ? 'bg-brand-purple text-white shadow-md shadow-brand-purple/20' 
                          : 'text-slate-500 hover:bg-slate-50'
                      }`}
                    >
                      <Key className="w-4 h-4" />
                      <span>Kunci Jawaban</span>
                    </button>
                    
                    <button 
                      onClick={() => setActiveTab('Kisi-kisi')}
                      className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                        activeTab === 'Kisi-kisi' 
                          ? 'bg-brand-purple text-white shadow-md shadow-brand-purple/20' 
                          : 'text-slate-500 hover:bg-slate-50'
                      }`}
                    >
                      <Layers className="w-4 h-4" />
                      <span>Kisi-kisi</span>
                    </button>
                    
                    <button 
                      onClick={() => setActiveTab('Kuis')}
                      className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                        activeTab === 'Kuis' 
                          ? 'bg-brand-purple text-white shadow-md shadow-brand-purple/20' 
                          : 'text-slate-500 hover:bg-slate-50'
                      }`}
                    >
                      <Play className="w-4 h-4 text-emerald-400" />
                      <span>Kuis Siswa</span>
                    </button>

                    <button 
                      onClick={() => setActiveTab('Analisis')}
                      className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                        activeTab === 'Analisis' 
                          ? 'bg-brand-purple text-white shadow-md shadow-brand-purple/20' 
                          : 'text-slate-500 hover:bg-slate-50'
                      }`}
                    >
                      <BarChart3 className="w-4 h-4" />
                      <span>Analisis</span>
                    </button>

                    {/* Export buttons far right */}
                    <div className="sm:ml-auto flex items-center gap-1 border-l pl-2 border-slate-100 mt-2 sm:mt-0">
                      <button 
                        onClick={exportToWord}
                        className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all cursor-pointer" 
                        title="Unduh (.TXT) Lembar Soal"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={exportPDFMock}
                        className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all cursor-pointer" 
                        title="Cetak via PDF"
                      >
                        <Printer className="w-4 h-4" />
                      </button>
                    </div>
                  </nav>

                  {/* Header metadata display */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <h2 className="text-lg font-black text-slate-805 leading-tight">
                          {identity.instrumentType}
                        </h2>
                        <span className="bg-brand-lightBlue text-brand-purple text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded border border-brand-purple/10">
                          Kurikulum {curriculum}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-450 mt-1 flex items-center gap-1 flex-wrap">
                        <BookOpen className="w-3.5 h-3.5 text-indigo-400" />
                        <span>{identity.subject} - {identity.level} {identity.grade} &bull; Topik: <strong>{identity.topic}</strong> &bull; Total {questions.length} soal terdaftar</span>
                      </p>
                    </div>

                    <button 
                      onClick={() => setIsAddModalOpen(true)}
                      className="bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-black py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-95 shadow-md shadow-emerald-500/15"
                    >
                      <Plus className="w-4 h-4" />
                      <span>+ Tambah Soal Kustom</span>
                    </button>
                  </div>

                  {/* Section division info line */}
                  {activeTab === 'Soal' || activeTab === 'Kunci' ? (
                    <div className="flex items-center gap-2 bg-slate-100 p-2.5 rounded-xl border-l-4 border-brand-purple">
                      <CheckCircle2 className="w-4 h-4 text-brand-purple animate-pulse" />
                      <h3 className="text-[10px] font-extrabold uppercase tracking-widest text-slate-650">
                        Lembar {activeTab === 'Kunci' ? 'Jawaban & Pembahasan' : 'Soal Evaluasi Utama'}
                        <span className="font-medium text-slate-400 lowercase ml-1.5">({questions.length} butir)</span>
                      </h3>
                    </div>
                  ) : null}

                  {/* Route Renderers */}
                  <div className="transition-all">
                    {activeTab === 'Soal' && (
                      <QuestionsList 
                        questions={questions} 
                        mode="Soal"
                        onUpdateQuestion={handleUpdateQuestion}
                        onDeleteQuestion={handleDeleteQuestion}
                      />
                    )}

                    {activeTab === 'Kunci' && (
                      <QuestionsList 
                        questions={questions} 
                        mode="Kunci"
                        onUpdateQuestion={handleUpdateQuestion}
                        onDeleteQuestion={handleDeleteQuestion}
                      />
                    )}

                    {activeTab === 'Kisi-kisi' && (
                      <SyllabusGrid 
                        questions={questions}
                        subject={identity.subject}
                        topic={identity.topic}
                        grade={identity.grade}
                        level={identity.level}
                        curriculum={curriculum}
                      />
                    )}

                    {activeTab === 'Kuis' && (
                      <InteractiveQuiz 
                        questions={questions}
                        topic={identity.topic}
                      />
                    )}

                    {activeTab === 'Analisis' && (
                      <AnalyticsDashboard 
                        questions={questions}
                        subject={identity.subject}
                        topic={identity.topic}
                      />
                    )}
                  </div>
                </>
              )}

            </div>

          </div>

        </div>
      )}

      {/* FOOTER PENDUKUNG */}
      <footer className="max-w-7xl mx-auto px-6 mt-16 pt-5 border-t border-gray-100 print:hidden text-center sm:text-left">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400 font-medium">
          <div>
            <p>&copy; {new Date().getFullYear()} RFD GuruPro. Perangkat kerja terintegrasi Guru Penggerak Indonesia.</p>
          </div>
          <div className="flex gap-4">
            <a href="#panduan" onClick={(e) => { e.preventDefault(); triggerToast("Info: Pilih menu Modul Ajar untuk rencana RPP, atau Soal untuk asesmen."); }} className="hover:text-indigo-650 transition-colors">Panduan Sistem</a>
            <span>&bull;</span>
            <a href="#pro" onClick={(e) => { e.preventDefault(); triggerToast("Lisensi: Hak cipta penuh dipegang oleh masing-masing guru."); }} className="hover:text-indigo-650 transition-colors">Lisensi Guru</a>
          </div>
        </div>
      </footer>

      {/* Floating Action Button for mobile screens */}
      {activeFeature === 'Soal' && (
        <div className="fixed bottom-6 right-6 lg:hidden z-40">
          <button 
            onClick={() => setIsAddModalOpen(true)}
            className="w-14 h-14 bg-indigo-600 hover:bg-brand-purple text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-transform"
          >
            <Plus className="w-6 h-6" />
          </button>
        </div>
      )}

      {/* Add question overlay modal */}
      <AddQuestionModal 
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleAddQuestion}
        nextNumber={questions.length + 1}
      />

    </div>
  );
}
