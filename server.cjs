var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// server.ts
var import_express = __toESM(require("express"), 1);
var import_path = __toESM(require("path"), 1);
var import_vite = require("vite");
var import_genai = require("@google/genai");
var import_dotenv = __toESM(require("dotenv"), 1);
import_dotenv.default.config();
var app = (0, import_express.default)();
var PORT = 3e3;
app.use(import_express.default.json({ limit: "50mb" }));
var aiClient = null;
function getGeminiClient() {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      throw new Error("GEMINI_API_KEY environment variable is required");
    }
    aiClient = new import_genai.GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build"
        }
      }
    });
  }
  return aiClient;
}
app.post("/api/generate-questions", async (req, res) => {
  const { curriculum, identity, config } = req.body;
  const totalWanted = config.multipleChoiceCount + config.shortAnswerCount + config.trueFalseCount;
  try {
    const ai = getGeminiClient();
    const prompt = `Anda adalah seorang pakar kurikulum pendidikan di Indonesia.
Rumuskan soal evaluasi yang kontekstual, berbobot, akurat, bebas dari miskonsepsi, dan sesuai indikator kompetensi siswa.

INFORMASI IDENTITAS SOAL:
- Kurikulum: ${curriculum}
- Level / Jenjang: ${identity.level}
- Kelas: ${identity.grade}
- Mata Pelajaran: ${identity.subject}
- Topik / Materi Pembelajaran: ${identity.topic}
- Jenis Instrumen / Evaluasi: ${identity.instrumentType}
- Format Opsi PG: ${identity.optionsFormat}

JUMLAH BUTIR SOAL YANG WAJIB DIBUAT (TOTAL: ${totalWanted} SOAL):
- Pilihan Ganda: ${config.multipleChoiceCount} soal
- Isian Singkat: ${config.shortAnswerCount} soal
- Benar / Salah: ${config.trueFalseCount} soal

DISTRIBUSI DIFIKULTAS:
- MUDAH: ${Math.round(config.difficultyEasy / 100 * totalWanted)} soal
- SEDANG: ${Math.round(config.difficultyMedium / 100 * totalWanted)} soal
- SULIT: ${Math.round(config.difficultyHard / 100 * totalWanted)} soal

ATURAN FORMAT JAWABAN:
1. Pilihan Ganda (type: "Pilihan Ganda"): Harus menyediakan opsi jawaban (options) sebanyak ${identity.optionsFormat === "5 Opsi (A-E)" ? "5" : "4"} buah dalam bentuk array string (seperti ["Pilihan A", "Pilihan B", "Pilihan C", "Pilihan D"]). Kunci jawaban (correctAnswer) diisi dengan string huruf pilihan yang benar ("A", "B", "C", "D", atau "E").
2. Isian Singkat (type: "Isian Singkat"): Tidak memiliki opsi jawaban. Kunci jawaban (correctAnswer) diisi teks jawaban singkat penjelas (misal: "Fotosintesis", "Bilah", "75 N").
3. Benar / Salah (type: "Benar/Salah"): Tidak memiliki opsi jawaban. Kunci jawaban (correctAnswer) bernilai string tepat "Benar" atau "Salah".

Setiap soal wajib dilengkapi penjelasan singkat ("explanation") yang menerangkan rasionalisasi jawaban benar, serta indikator ketercapaian kompetensi ("competencyIndicator").
Kembalikan respon hanya dalam bentuk JSON array yang mewakili butir-butir soal tersebut.`;
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction: "Anda adalah pembuat instrumen asesmen nasional Indonesia yang menulis soal berkualitas tinggi terstruktur tanpa penjelasan luar, murni dalam skema JSON array.",
        responseMimeType: "application/json",
        responseSchema: {
          type: import_genai.Type.ARRAY,
          items: {
            type: import_genai.Type.OBJECT,
            properties: {
              type: { type: import_genai.Type.STRING, description: "Tepat: 'Pilihan Ganda', 'Isian Singkat', atau 'Benar/Salah'" },
              difficulty: { type: import_genai.Type.STRING, description: "Tepat: 'MUDAH', 'SEDANG', atau 'SULIT'" },
              questionText: { type: import_genai.Type.STRING, description: "Teks pertanyaan utama dalam Bahasa Indonesia" },
              options: {
                type: import_genai.Type.ARRAY,
                items: { type: import_genai.Type.STRING },
                description: "Daftar opsi jika Pilihan Ganda. Contoh: ['Opsi A', 'Opsi B', 'Opsi C', 'Opsi D']"
              },
              correctAnswer: { type: import_genai.Type.STRING, description: "Kunci jawaban: 'A'/'B'/'C'/'D'/'E' untuk PG, kata/teks singkat untuk Isian, atau 'Benar'/'Salah' untuk Benar/Salah" },
              explanation: { type: import_genai.Type.STRING, description: "Rasionalisasi mengapa kunci tersebut benar" },
              competencyIndicator: { type: import_genai.Type.STRING, description: "Tujuan pembelajaran atau indikator kompetensi yang dites" }
            },
            required: ["type", "difficulty", "questionText", "correctAnswer", "explanation"]
          }
        }
      }
    });
    const textOutput = response.text || "[]";
    const parsedQuestions = JSON.parse(textOutput);
    const questionsWithMeta = parsedQuestions.map((q, i) => ({
      ...q,
      id: `ai_${Date.now()}_${i}`,
      number: i + 1,
      options: q.options || void 0
    }));
    return res.json({
      success: true,
      source: "ai",
      questions: questionsWithMeta
    });
  } catch (error) {
    console.error("Gemini AI Generation failed, falling back to local simulation:", error.message);
    return res.status(200).json({
      success: false,
      source: "simulation",
      message: error.message || "Gagal menghubungi Gemini AI."
    });
  }
});
app.post("/api/generate-modul", async (req, res) => {
  const { identity, profilPancasila, modelPembelajaran, targetSiswa, alokasiWaktu } = req.body;
  try {
    const ai = getGeminiClient();
    const prompt = `Buatkan sebuah Rencana Pembelajaran / Modul Ajar Kurikulum Merdeka yang sangat komprehensif, terstruktur rapi, mendalam, dan kaya materi pembelajaran untuk guru pengampu di Indonesia.

INFORMASI DASAR MODUL:
- Nama Guru: ${identity.teacherName}
- Nama Satuan Pendidikan: ${identity.schoolName}
- Mata Pelajaran: ${identity.subject}
- Materi Pokok / Topik Pembelajaran: ${identity.topic}
- Jenjang & Kelas: ${identity.level} - ${identity.grade}
- Alokasi Waktu: ${alokasiWaktu || "2 JP (2 x 40 menit)"}
- Profil Pelajar Pancasila: ${profilPancasila || "Mandiri, Bernalar Kritis, Kreatif"}
- Model Pembelajaran: ${modelPembelajaran || "Problem-Based Learning"}
- Target Peserta Didik: ${targetSiswa || "Rombel Reguler / Umum"}

PETUNJUK FORMAT DAN ESTETIKA (PENTING):
1. Gunakan Markdown Standard murni Tanpa Tag HTML / CSS kustom.
2. Gunakan heading bertingkat yang rapi:
   - Judul Modul Ajar menggunakan Heading 1 (#) di paling atas.
   - Pilar Utama (I. INFORMASI UMUM, II. KOMPONEN INTI, III. LAMPIRAN) menggunakan Heading 1 (#) atau Heading 2 (##).
   - Sub-komponen menggunakan Heading 3 (###) atau Heading 4 (####).
3. Buat TABEL IDENTITAS MODUL di awal yang rapi menggunakan format tabel Markdown standar:
   | Komponen | Deskripsi |
   | :--- | :--- |
4. Gunakan bullet points (-) atau penomoran (1.) dengan indentasi spasi yang konsisten agar struktur hierarki daftar terbaca dengan sempurna.
5. Berikan spasi satu baris kosong di antara setiap paragraf, sub-heading, dan komponen guna menciptakan tata letak cetak dokumen akademik yang bersih, seimbang, dan elegan (tidak berhimpitan).
6. Tampilkan semua tabel asesmen, target, dan kriteria penilaian secara simetris dan rapi dengan pemisah kolom pipa | yang lengkap.

Modul Ajar Pembelajaran harus mencakup 3 PILAR UTAMA di bawah secara mendalam dan berbobot:

1. **I. INFORMASI UMUM**: Identitas Penulis Modul (Tabel), Kompetensi Awal, Profil Pelajar Pancasila yang dituju, Sarana & Prasarana, Target Peserta Didik, dan Model Pembelajaran Terpilih.
2. **II. KOMPONEN INTI**:
   - **Tujuan Pembelajaran** (spesifik, terukur, berbobot)
   - **Pemahaman Bermakna** (nilai keberdayaan dunia nyata)
   - **Pertanyaan Pemantik** (menggugah nalar berfikir kritis sebelum kegiatan inti)
   - **Persiapan Pembelajaran**
   - **Kegiatan Pembelajaran Lengkap**:
     * Kegiatan Pendahuluan (Orientasi, Apersepsi, Motivasi [durasi menit])
     * Kegiatan Inti (Uraikan tahap demi tahap sesuai Sintaks Model Pembelajaran "${modelPembelajaran}" [durasi menit]. Cantumkan panduan instruksi guru serta respon kritis murid yang diharapkan)
     * Kegiatan Penutup (Umpan balik, Refleksi guru/siswa, Doa penutup [durasi menit])
   - **Asesmen**: Asesmen Diagnostik (Sikap), Asesmen Formatif (Aktivitas), Asesmen Sumatif (Kognitif)
   - **Pengayaan & Remedial**
   - **Refleksi Peserta Didik dan Pendidik** (pertanyaan refleksi mendalam)
3. **III. LAMPIRAN**:
   - Lembar Kerja Peserta Didik (LKPD) yang aplikatif dan menuntut pemecahan masalah kritis
   - Bahan Bacaan Guru & Peserta Didik (materi narasi materi yang solid tentang topik tersebut semacam rangkuman bahan ajar siap baca)
   - Glosarium (definisi istilah-istilah sulit kunci)
   - Daftar Pustaka (referensi akademik)

Harap susun rencana pembelajaran ini dalam Bahasa Indonesia yang sangat profesional, mendidik, menginspirasi, dan dapat langsung diprint atau dipraktikkan di depan kelas oleh guru.`;
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction: "Anda adalah pengembang kurikulum dan instruktur nasional Kurikulum Merdeka di KEMENDIKBUD RI. Tulis Modul Ajar berkualitas premium dalam format Markdown tanpa basa-basi pengantar pembuka/penutup. Langsung berikan modul."
      }
    });
    return res.json({
      success: true,
      markdown: response.text || "Gagal menghasilkan konten modul."
    });
  } catch (error) {
    console.error("Gemini AI Modul Ajar Generation failed:", error.message);
    return res.status(500).json({
      success: false,
      message: error.message || "Gagal menghasilkan Modul Ajar. Pastikan API Key diatur di Settings."
    });
  }
});
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await (0, import_vite.createServer)({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    const distPath = import_path.default.join(process.cwd(), "dist");
    app.use(import_express.default.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(import_path.default.join(distPath, "index.html"));
    });
  }
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}
startServer();
//# sourceMappingURL=server.cjs.map
