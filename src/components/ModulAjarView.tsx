import React, { useState } from 'react';
import { motion } from 'motion/react';
import ReactMarkdown from 'react-markdown';
import { 
  ArrowLeft, 
  Sparkles, 
  Copy, 
  Download, 
  Printer, 
  Check, 
  Info, 
  FileText, 
  HelpCircle, 
  Sliders,
  Settings,
  Flame,
  Award,
  BookOpen
} from 'lucide-react';

interface ModulAjarViewProps {
  onBackToMenu: () => void;
  triggerToast: (msg: string) => void;
}

export default function ModulAjarView({ onBackToMenu, triggerToast }: ModulAjarViewProps) {
  // Form states matching standard Indonesia lesson planning requirements
  const [identity, setIdentity] = useState({
    teacherName: 'Faisal',
    schoolName: 'SDN SUKAMAJU',
    level: 'SMP / MTs',
    grade: 'Kelas 8',
    subject: 'IPA',
    topic: 'Sistem Pencernaan',
  });

  const [alokasiWaktu, setAlokasiWaktu] = useState('2 JP (2 x 40 Menit)');
  const [modelPembelajaran, setModelPembelajaran] = useState('Problem-Based Learning');
  const [targetSiswa, setTargetSiswa] = useState('Siswa Reguler / Umum');
  
  // Profil Pelajar Pancasila checkboxes
  const [profilPancasila, setProfilPancasila] = useState<string[]>([
    'Bernalar Kritis',
    'Mandiri',
    'Kreatif'
  ]);

  // UI States
  const [isGenerating, setIsGenerating] = useState(false);
  const [stepMessage, setStepMessage] = useState('');
  const [generatedMarkdown, setGeneratedMarkdown] = useState<string>('');
  const [copied, setCopied] = useState(false);
  const [mobileSubTab, setMobileSubTab] = useState<'form' | 'result'>('form');

  const pancasilaOptions = [
    'Bernalar Kritis',
    'Mandiri',
    'Kreatif',
    'Gotong Royong',
    'Kebinekaan Global',
    'Beriman, Bertakwa Kepada Tuhan YME, & Berakhlak Mulia'
  ];

  const togglePancasila = (option: string) => {
    if (profilPancasila.includes(option)) {
      setProfilPancasila(prev => prev.filter(item => item !== option));
    } else {
      setProfilPancasila(prev => [...prev, option]);
    }
  };

  // AI Trigger
  const handleGenerateModul = async () => {
    setIsGenerating(true);
    setMobileSubTab('result'); // Automatically switch to result panel to show loading
    
    // Cycle beautiful loading statements to make it feel extremely responsive
    const messages = [
      'Inisialisasi Pembuat Modul...',
      'Menganalisis indikator Capaian Pembelajaran (CP)...',
      'Menyusun Alur Kegiatan Inti dengan Sintaks PBL...',
      'Merumuskan Pertanyaan Pemantik Berpikir Kritis...',
      'Merancang Lembar Kerja Siswa (LKPD) aplikatif...',
      'Menyusun rangkuman bahan bacaan guru & glosarium...'
    ];

    let msgIdx = 0;
    setStepMessage(messages[0]);
    const msgInterval = setInterval(() => {
      msgIdx = (msgIdx + 1) % messages.length;
      setStepMessage(messages[msgIdx]);
    }, 2800);

    try {
      const response = await fetch('/api/generate-modul', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          identity,
          alokasiWaktu,
          modelPembelajaran,
          targetSiswa,
          profilPancasila: profilPancasila.join(', ')
        })
      });

      const data = await response.json();
      clearInterval(msgInterval);

      if (data.success && data.markdown) {
        setGeneratedMarkdown(data.markdown);
        triggerToast('Sukses: Modul Ajar berkualitas premium berhasil dirancang AI!');
      } else {
        throw new Error(data.message || 'Ggal merancang modul.');
      }
    } catch (err: any) {
      clearInterval(msgInterval);
      triggerToast(`Gagal AI: Mengaktifkan modul simulasi instan...`);
      // Simulative fallback fallback
      setTimeout(() => {
        setGeneratedMarkdown(createSimulatedModulAjar());
      }, 500);
    } finally {
      setIsGenerating(false);
    }
  };

  const createSimulatedModulAjar = () => {
    return `# MODUL AJAR KURIKULUM MERDEKA
---
## I. INFORMASI UMUM
* **Nama Guru Pengampu** : ${identity.teacherName}
* **Satuan Pendidikan** : ${identity.schoolName}
* **Mata Pelajaran**    : ${identity.subject}
* **Fase / Kelas**        : Fase D / ${identity.grade}
* **Materi Pokok**       : ${identity.topic}
* **Alokasi Waktu**      : ${alokasiWaktu}
* **Model Pembelajaran** : ${modelPembelajaran}
* **Target Peserta Didik**: ${targetSiswa}
* **Profil Pelajar Pancasila**: ${profilPancasila.join(', ')}

---

## II. KOMPONEN INTI

### A. Tujuan Pembelajaran
1. Melalui model pembelajaran ${modelPembelajaran}, siswa dapat menganalisis dan mendemonstrasikan pemahaman mendalam tentang prinsip-prinsip materi pokok **${identity.topic}** secara tepat.
2. Melatih siswa berpikir ilmiah dan kritis dalam memecahkan studi kasus kontekstual kehidupan sehari-hari terkait dengan materi pembahasan ini.

### B. Pemahaman Bermakna
* Siswa menyadari relevansi teoritis dan aplikasi praktis dari fasa materi **${identity.topic}**, bagaimana ia menunjang kesehatan, tatanan sosial, ataupun rekayasa teknologi sekitar kita.

### C. Pertanyaan Pemantik
1. Mengapa konsep **${identity.topic}** memegang peranan krusial dalam dinamika harian kita?
2. Bagaimana seandainya elemen-elemen penyusun materi ini mengalami anomali atau kerusakan fungsional?

### D. Kegiatan Pembelajaran
#### 1. Kegiatan Pendahuluan (15 Menit)
* Guru mengucapkan salam pembuka, memeriksa kehadiran siswa, dan memimpin doa.
* Guru mengkondisikan suasana belajar yang kondusif di kelas.
* **Apersepsi**: Guru menampilkan gambar pemantik ataupun kasus janggal harian mengenai **${identity.topic}** dan meminta tanggapan spontan dari siswa.

#### 2. Kegiatan Inti (50 Menit)
*Sintaks Model Pembelajaran ${modelPembelajaran}:*
* **Langkah 1 (Orientasi Masalah)**: Guru menyajikan studi kasus atau artikel berita bertema **${identity.topic}** yang membutuhkan pemecahan solusi analitik.
* **Langkah 2 (Organisasi Belajar)**: Siswa dikelompokkan secara heterogen (4-5 siswa). Setiap grup menerima instrumen LKPD terstruktur.
* **Langkah 3 (Penyelidikan Mandiri)**: Anggota kelompok melakukan studi literatur mendalam dan pencarian informasi di perpustakaan atau internet.
* **Langkah 4 (Mengembangkan Karya)**: Masing-masing grup menyusun ringkasan peta konsep/skema gagasan fisis untuk dipresentasikan di papan tulis.
* **Langkah 5 (Analisis & Evaluasi)**: Guru memoderasi sesi diskusi debat antar kelompok, menyamakan persepsi, dan mengapresiasi kinerja kelompok terbaik.

#### 3. Kegiatan Penutup (15 Menit)
* Siswa melangsungkan konklusi kesimpulan akhir pelajaran secara lisan dibimbing oleh Guru.
* Guru memberikan umpan balik (feedback) positif serta evaluasi kognitif lisan singkat.
* Doa penutup dan salam perpisahan.

---

## III. ASESMEN PENILAIAN
* **Asesmen Diagnostik**: Evaluasi kesiapan kognitif awal sebelum pembelajaran dimulai.
* **Asesmen Formatif**: Pengamatan sikap kerja sama dalam kelompok serta performa presentasi lisan.
* **Asesmen Sumatif**: Tes pilihan ganda atau esai tertulis mengenai lingkup materi **${identity.topic}**.

---

## IV. LAMPIRAN

### A. Lembar Kerja Peserta Didik (LKPD)
* **Tugas**: Berdasarkan pembahasan kelompok, buatlah analisis model skematik sistematis tentang keterkaitan fungsional **${identity.topic}** dalam menjaga kesetimbangan alami.
* **Pertanyaan Analitis**: Tuliskan minimal 3 faktor katalis eksternal yang dapat mempercepat degradasi sistem ini, beserta alternatif penanggulangannya!

### B. Glosarium
* **Katalisator**: Bahan atau zat yang dapat mempercepat laju reaksi operasional fisis.
* **Kesetimbangan**: Kondisi stabil di mana gaya atau aktivitas yang berlawanan memiliki bobot seimbang.

### C. Daftar Pustaka
* Kemendikbudristek RI. (2024). *Buku Paket Panduan IPA Guru & Siswa Kelas VIII*. Jakarta: Pusat Kurikulum dan Perbukuan.`;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedMarkdown);
    setCopied(true);
    triggerToast('Konveksi: Modul Ajar berhasil disalin ke papan klip!');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([generatedMarkdown], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Modul_Ajar_${identity.subject.replace(/\s+/g, '_')}_${identity.topic.replace(/\s+/g, '_')}.md`;
    link.click();
    triggerToast('Download Modul Ajar (.MD) berhasil dimulai!');
  };

  return (
    <div className="font-sans">
      
      {/* Sub Header for Modul Ajar */}
      <div className="bg-white border-b border-gray-100 py-4 shadow-sm mb-6 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button 
              onClick={onBackToMenu}
              className="p-2 hover:bg-slate-50 border border-slate-200 rounded-xl transition-all cursor-pointer text-slate-600"
              title="Kembali ke Menu Utama"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-extrabold text-base md:text-lg text-slate-800 leading-none">Modul Penyusun Rencana Pembelajaran (Modul Ajar)</h2>
                <span className="text-[9px] bg-emerald-100 text-emerald-700 font-bold px-1.5 py-0.5 rounded">Fase Kurikulum Merdeka</span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">Generator rancangan ajar (RPP) berkualitas premium berbasis AI</p>
            </div>
          </div>
          
          <div className="hidden sm:flex items-center gap-2 text-xs font-bold text-slate-500 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-100">
            <Award className="w-4 h-4 text-emerald-600 animate-bounce" />
            <span>AKUN PREMIUM AKTIF</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4">
        
        {/* Mobile Sub-tab Navigation */}
        <div className="lg:hidden flex bg-white border border-slate-200 rounded-xl p-1 mb-4 shadow-sm">
          <button 
            onClick={() => setMobileSubTab('form')}
            className={`flex-1 py-2.5 rounded-lg text-xs font-bold text-center transition-all cursor-pointer ${
              mobileSubTab === 'form' ? 'bg-emerald-500 text-white' : 'text-slate-500 hover:bg-slate-50'
            }`}
          >
            Atur Parameter Modul
          </button>
          <button 
            onClick={() => setMobileSubTab('result')}
            className={`flex-1 py-2.5 rounded-lg text-xs font-bold text-center transition-all cursor-pointer ${
              mobileSubTab === 'result' ? 'bg-emerald-500 text-white' : 'text-slate-500 hover:bg-slate-50'
            }`}
          >
            Lihat Modul Ajar
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          
          {/* LEFT: FORM SIDEBAR */}
          <aside className={`w-full lg:w-[360px] flex-shrink-0 flex flex-col gap-4 ${mobileSubTab === 'form' ? 'flex' : 'hidden lg:flex'}`}>
            
            <section className="bg-white p-5 rounded-2xl shadow-sm border border-slate-150">
              <div className="flex items-center gap-2 mb-4 border-b border-slate-50 pb-2">
                <Settings className="w-4 h-4 text-emerald-500" />
                <h3 className="font-bold text-slate-800 text-xs uppercase tracking-wider">Parameter Rencana Ajar</h3>
              </div>

              <div className="space-y-4">
                
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[10px] text-slate-450 font-bold block mb-1 uppercase">Nama Pendidik</label>
                    <input 
                      type="text"
                      className="w-full text-xs font-semibold rounded-xl border border-slate-200 p-2 bg-slate-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                      value={identity.teacherName}
                      onChange={(e) => setIdentity(prev => ({ ...prev, teacherName: e.target.value }))}
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-450 font-bold block mb-1 uppercase">Nama Sekolah</label>
                    <input 
                      type="text"
                      className="w-full text-xs font-semibold rounded-xl border border-slate-200 p-2 bg-slate-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                      value={identity.schoolName}
                      onChange={(e) => setIdentity(prev => ({ ...prev, schoolName: e.target.value }))}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[10px] text-slate-450 font-bold block mb-1 uppercase">Jenjang Sekolah</label>
                    <select 
                      className="w-full text-xs font-semibold rounded-xl border border-slate-200 p-2 bg-slate-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                      value={identity.level}
                      onChange={(e) => {
                        const val = e.target.value;
                        setIdentity(prev => ({
                          ...prev,
                          level: val,
                          grade: val === 'SD / MI' ? 'Kelas 5' : val === 'SMA / MA' ? 'Kelas 11' : 'Kelas 8'
                        }));
                      }}
                    >
                      <option value="SD / MI">SD / MI</option>
                      <option value="SMP / MTs">SMP / MTs</option>
                      <option value="SMA / MA">SMA / MA</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-450 font-bold block mb-1 uppercase">Kelas Siswa</label>
                    <select 
                      className="w-full text-xs font-semibold rounded-xl border border-slate-200 p-2 bg-slate-50 focus:bg-white focus:outline-none"
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

                {/* MANUAL FIELD FOR SUBJECT */}
                <div>
                  <label className="text-[10px] text-slate-455 font-bold block mb-1 uppercase">Mata Pelajaran (Tulis Manual)</label>
                  <input 
                    type="text"
                    className="w-full text-xs font-semibold rounded-xl border border-slate-200 p-2 bg-slate-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    placeholder="Contoh: IPA, IPS, Bahasa Inggris, Pendidikan Pancasila"
                    value={identity.subject}
                    onChange={(e) => setIdentity(prev => ({ ...prev, subject: e.target.value }))}
                  />
                </div>

                {/* MANUAL FIELD FOR MATERIAL/TOPIC */}
                <div>
                  <label className="text-[10px] text-slate-455 font-bold block mb-1 uppercase">Topik / Materi Pembelajaran (Tulis Manual)</label>
                  <input 
                    type="text"
                    className="w-full text-xs font-bold rounded-xl border border-slate-200 p-2 bg-emerald-50 text-emerald-800 focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    placeholder="Contoh: Fotosintesis, Bentuk Aljabar, Ikatan Ion"
                    value={identity.topic}
                    onChange={(e) => setIdentity(prev => ({ ...prev, topic: e.target.value }))}
                  />
                </div>

                <div>
                  <label className="text-[10px] text-slate-450 font-bold block mb-1 uppercase">Alokasi Waktu</label>
                  <input 
                    type="text"
                    className="w-full text-xs font-semibold rounded-xl border border-slate-200 p-2 bg-slate-50 focus:bg-white focus:outline-none"
                    value={alokasiWaktu}
                    onChange={(e) => setAlokasiWaktu(e.target.value)}
                    placeholder="Contoh: 2 JP (2 x 40 menit)"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[10px] text-slate-450 font-bold block mb-1 uppercase">Model Pembelajaran</label>
                    <select 
                      className="w-full text-xs font-semibold rounded-xl border border-slate-200 p-2 bg-slate-50"
                      value={modelPembelajaran}
                      onChange={(e) => setModelPembelajaran(e.target.value)}
                    >
                      <option value="Problem-Based Learning">Problem-Based Learning</option>
                      <option value="Project-Based Learning">Project-Based Learning</option>
                      <option value="Discovery Learning">Discovery Learning</option>
                      <option value="Inquiry Learning">Inquiry Learning</option>
                      <option value="Contextual Teaching & Learning">CTL (Kontekstual)</option>
                      <option value="Ceramah Interaktif">Ceramah / Klasik</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-450 font-bold block mb-1 uppercase">Target Pembelajaran</label>
                    <select 
                      className="w-full text-xs font-semibold rounded-xl border border-slate-200 p-2 bg-slate-50"
                      value={targetSiswa}
                      onChange={(e) => setTargetSiswa(e.target.value)}
                    >
                      <option value="Siswa Reguler / Umum">Siswa Reguler / Umum</option>
                      <option value="Siswa dengan Kesulitan Belajar">Kesulitan Belajar</option>
                      <option value="Siswa Pencapaian Tinggi (Cerdas Istimewa)">Pencapaian Tinggi</option>
                      <option value="Kelompok Inklusi">Kelompok Inklusi</option>
                    </select>
                  </div>
                </div>

                {/* Profil Pelajar Pancasila Selection */}
                <div>
                  <label className="text-[10px] text-slate-450 font-bold block mb-1 uppercase tracking-wider">Profil Pelajar Pancasila</label>
                  <p className="text-[9px] text-slate-400 mb-2">Pilih yang paling sesuai dengan aktivitas modul ini:</p>
                  <div className="space-y-1.5 max-h-36 overflow-y-auto border border-slate-100 p-2.5 rounded-xl bg-slate-50">
                    {pancasilaOptions.map(option => (
                      <label key={option} className="flex items-center gap-2 text-xs font-bold text-slate-600 select-none cursor-pointer">
                        <input 
                          type="checkbox"
                          className="rounded border-slate-300 text-emerald-500 focus:ring-emerald-500"
                          checked={profilPancasila.includes(option)}
                          onChange={() => togglePancasila(option)}
                        />
                        <span>{option}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* AI BUTTON TRIGGER */}
                <button 
                  onClick={handleGenerateModul}
                  disabled={!identity.subject || !identity.topic || isGenerating}
                  className="w-full bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 text-white font-bold py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-all mt-4 cursor-pointer shadow-lg shadow-emerald-500/15"
                >
                  <Sparkles className="w-4.5 h-4.5 text-yellow-100 animate-spin-slow" />
                  <span>Generate Modul dengan AI</span>
                </button>

              </div>
            </section>
          </aside>

          {/* RIGHT: MAIN OUTPUT DISPLAY */}
          <div className={`flex-grow flex flex-col gap-6 min-w-0 ${mobileSubTab === 'result' ? 'flex' : 'hidden lg:flex'}`}>
            
            {/* If there is no plan generated and no loading, show welcoming empty state */}
            {!generatedMarkdown && !isGenerating && (
              <div className="bg-white border border-slate-100 p-8 py-16 rounded-2xl shadow-sm text-center">
                <div className="w-16 h-16 bg-emerald-50 text-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-inner">
                  <BookOpen className="w-8 h-8" />
                </div>
                <h3 className="font-display font-black text-xl text-slate-800 mb-2">Draft Guru Belum Dibuat</h3>
                <p className="max-w-md mx-auto text-xs text-slate-400 leading-relaxed mb-6">
                  Isi formulir parameter rencana pembelajaran di sebelah kiri dan klik tombol <strong>"Generate Modul dengan AI"</strong> untuk menyusun modul kurikulum ajar Merdeka premium dalam hitungan detik.
                </p>
                <div className="flex justify-center">
                  <span className="text-[10px] bg-slate-100 text-slate-500 p-1 px-3.5 rounded-full font-bold">Terintegrasi Standarisasi Kemendikbudristek RI</span>
                </div>
              </div>
            )}

            {/* If Generating - Rich active loading panel */}
            {isGenerating && (
              <div className="bg-white border border-slate-100 p-8 py-16 rounded-2xl shadow-sm text-center flex flex-col items-center justify-center">
                <div className="relative mb-6">
                  <span className="absolute inline-flex h-12 w-12 rounded-full bg-emerald-500 opacity-20 animate-ping"></span>
                  <div className="w-12 h-12 bg-emerald-500 text-white rounded-full flex items-center justify-center shadow-lg shadow-emerald-500/30">
                    <Sparkles className="w-6 h-6 animate-spin" />
                  </div>
                </div>
                
                <h4 className="font-display font-extrabold text-lg text-slate-850">Mengaktifkan Kecerdasan Buatan...</h4>
                <p className="text-xs text-emerald-600 font-bold mt-1 tracking-wider animate-pulse uppercase">{stepMessage}</p>
                
                <p className="max-w-md text-slate-400 text-[11px] leading-relaxed mt-4">
                  Harap tunggu beberapa saat, AI sedang merangkum capaian pembelajaran, menjabarkan pendahuluan, inti beserta lembar aktivitas siswa (LKPD) secara teoretis penuh.
                </p>
              </div>
            )}

            {/* Displaying generated Modul Ajar */}
            {generatedMarkdown && !isGenerating && (
              <div className="flex flex-col gap-4">
                
                {/* Control Action Bar */}
                <div className="bg-white p-3.5 rounded-2xl border border-slate-150 flex items-center justify-between shadow-sm">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span className="text-xs font-bold text-slate-700">Rencana Pelaksanaan Pembelajaran Kurikulum Merdeka</span>
                  </div>
                  
                  <div className="flex items-center gap-1.5">
                    <button 
                      onClick={handleCopy}
                      className="p-2 sm:px-3 sm:py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer"
                      title="Salin Dokumen"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
                      <span className="hidden sm:inline">{copied ? 'Tersalin' : 'Salin Modul'}</span>
                    </button>
                    
                    <button 
                      onClick={handleDownload}
                      className="p-2 sm:px-3 sm:py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer"
                      title="Unduh Berkas (.md)"
                    >
                      <Download className="w-3.5 h-3.5 text-slate-400" />
                      <span className="hidden sm:inline">Download</span>
                    </button>
                    
                    <button 
                      onClick={() => window.print()}
                      className="p-2 sm:px-3 sm:py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-md shadow-emerald-500/15"
                      title="Pratinjau Cetak"
                    >
                      <Printer className="w-3.5 h-3.5 text-yellow-100" />
                      <span className="hidden sm:inline">Cetak</span>
                    </button>
                  </div>
                </div>

                {/* Rendered Document - styled to look like an official A4 Government sheet paper */}
                <article className="bg-white p-8 md:p-12 rounded-3xl border border-slate-200 shadow-sm leading-relaxed prose prose-indigo max-w-none text-slate-850" data-purpose="modul-ajar-document">
                  
                  {/* Decorative Indonesian Emblem Placeholder */}
                  <div className="flex flex-col items-center justify-center border-b border-double border-slate-300 pb-6 mb-8 text-center">
                    <div className="w-12 h-12 bg-slate-50 border border-slate-200 text-slate-500 rounded-full flex items-center justify-center mb-1 font-mono text-[10px] font-bold shadow-inner">
                      GARUDA
                    </div>
                    <span className="font-extrabold uppercase text-[10px] tracking-widest text-slate-400">Republik Indonesia</span>
                    <span className="font-black text-xs text-slate-800 uppercase mt-1">Pariwara Perangkat Pembelajaran Merdeka Belajar</span>
                  </div>

                  <div className="markdown-body">
                    <ReactMarkdown>{generatedMarkdown}</ReactMarkdown>
                  </div>

                </article>

                {/* Footer notes */}
                <div className="bg-slate-50 border border-slate-150 p-4 rounded-xl flex items-start gap-2.5">
                  <Info className="w-4.5 h-4.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <p className="text-[10px] text-slate-550 leading-relaxed">
                    <strong>Pemberitahuan Lisensi:</strong> Modul ajar yang dirancang sepenuhnya sah dan berhak diarsipkan secara komersial oleh masing-masing pendidik seutuhnya. Anda dapat memodifikasi, mereduksi, dan menindaklanjuti proses pembelajaran kelas dengan menjunjung asesmen formatif seperlunya.
                  </p>
                </div>

              </div>
            )}

          </div>

        </div>

      </div>

    </div>
  );
}
