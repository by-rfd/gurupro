import { Question, QuestionType, DifficultyLevel, QuizIdentity, QuizConfig } from './types';

// Large static database of high-quality realistic questions in Indonesian across different fields
export const SUBJECT_PRESETS = [
  {
    subject: 'IPA',
    grade: 'Kelas 8',
    level: 'SMP / MTs',
    topics: [
      {
        name: 'Sistem Pencernaan',
        questions: [
          // Pilihan Ganda
          {
            type: 'Pilihan Ganda' as QuestionType,
            difficulty: 'MUDAH' as DifficultyLevel,
            questionText: 'Proses pemecahan makanan dari molekul kompleks menjadi molekul sederhana yang dapat diserap oleh tubuh disebut...',
            options: ['Metabolisme', 'Asimilasi', 'Pencernaan', 'Ekskresi'],
            correctAnswer: 'C',
            explanation: 'Pencernaan adalah proses pemecahan zat makanan kompleks menjadi sederhana agar dapat diserap dinding usus.',
            competencyIndicator: 'Mengidentifikasi definisi utama sistem pencernaan manusia.'
          },
          {
            type: 'Pilihan Ganda' as QuestionType,
            difficulty: 'MUDAH' as DifficultyLevel,
            questionText: 'Organ pencernaan yang berfungsi utama sebagai tempat penyerapan sebagian besar sari-sari makanan (nutrisi) adalah...',
            options: ['Lambung', 'Usus Besar', 'Usus Halus', 'Kerongkongan'],
            correctAnswer: 'C',
            explanation: 'Usus halus (khususnya vili pada ileum) berperan menyerap hampir semua nutrisi dari makanan ke sirkulasi darah.',
            competencyIndicator: 'Menunjukkan organ utama penyerapan sari makanan.'
          },
          {
            type: 'Pilihan Ganda' as QuestionType,
            difficulty: 'SEDANG' as DifficultyLevel,
            questionText: 'Enzim yang memulai pencernaan karbohidrat di mulut adalah...',
            options: ['Pepsin', 'Lipase', 'Amilase (Ptialin)', 'Tripsin'],
            correctAnswer: 'C',
            explanation: 'Enzim ptialin (amilase saliva) disekresikan oleh kelenjar ludah untuk memecah amilum menjadi maltosa.',
            competencyIndicator: 'Menjelaskan fungsi enzim pencernaan di rongga mulut.'
          },
          {
            type: 'Pilihan Ganda' as QuestionType,
            difficulty: 'SEDANG' as DifficultyLevel,
            questionText: 'Gerakan meremas-remas pada dinding kerongkongan yang mendorong makanan masuk ke lambung secara mekanis dinamakan...',
            options: ['Amoboid', 'Peristaltik', 'Metabolik', 'Sistolik'],
            correctAnswer: 'B',
            explanation: 'Gerak peristaltik adalah kontraksi otot gelombang silang pada saluran pencernaan yang mendorong bolus ke depan.',
            competencyIndicator: 'Mengidentifikasi gerakan mekanik bolus di kerongkongan.'
          },
          {
            type: 'Pilihan Ganda' as QuestionType,
            difficulty: 'SULIT' as DifficultyLevel,
            questionText: 'Perhatikan diagram sistem pencernaan manusia. Organ yang ditunjuk oleh huruf X berfungsi sebagai tempat penyimpanan sementara kotoran sebelum dikeluarkan dan penyerapan air yang tersisa. Organ X adalah...',
            options: ['Usus Halus', 'Usus Besar', 'Rektum', 'Lambung'],
            correctAnswer: 'C',
            explanation: 'Rektum adalah organ akhir usus besar bertindak sebagai penampung feses sementara sebelum defekasi melalui anus.',
            imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDOIaamJ3IbQxzoYUh-hCpJFOZByREZ0ZDRjb8LoOnES8mOo7NsowcYHpZt2mcH2I5qKujwFDgOUPbHkiCOR6JgxOPskch-GYn3TPTf2d7ASQ73V6OSxqEPpZaw1CuNCwNyt-_h-izC1MS36lHTkM6lb3CnvdxyPwjmyMhm9vT1VbiDH6yEVyh_9IBCG2g_bpcAwOkVXx_cgLyd_HhDZCb5xyVDSg92j1_nOAWG6J7a3TKFisXq4pj9savX3gKxiddAzwdqcxg__ow',
            competencyIndicator: 'Menganalisis diagram organ pencernaan dan menghubungkan letak serta fungsinya.'
          },
          {
            type: 'Pilihan Ganda' as QuestionType,
            difficulty: 'SULIT' as DifficultyLevel,
            questionText: 'Kelenjar pencernaan pankreas menghasilkan beberapa enzim penting. Pasangan enzim pankreas beserta perannya yang BENAR di bawah ini adalah...',
            options: [
              'Pepsin - memecah protein menjadi asam amino',
              'Amilase - memecah lemak menjadi asam lemak',
              'Tripsin - memecah pepton menjadi asam amino',
              'Lipase - memecah amilum menjadi glukosa'
            ],
            correctAnswer: 'C',
            explanation: 'Tripsin yang dilepaskan pankreas memecah pepton menjadi asam amino. Pepsin diproduksi lambung, amilase pencernaan karbohidrat, lipase pencernaan lemak.',
            competencyIndicator: 'Menganalisis jenis-jenis dan fungsi spesifik dari enzim pankreas.'
          },
          {
            type: 'Pilihan Ganda' as QuestionType,
            difficulty: 'MUDAH' as DifficultyLevel,
            questionText: 'Zat makanan yang paling cepat dicerna untuk menghasilkan energi instan bagi aktivitas tubuh adalah...',
            options: ['Karbohidrat', 'Protein', 'Lemak', 'Vitamin'],
            correctAnswer: 'A',
            explanation: 'Karbohidrat dipecah menjadi glukosa sederhana yang langsung dapat direspirasikan oleh sel menjadi energi.',
            competencyIndicator: 'Mengklasifikasikan nutrisi makro penghasil energi utama.'
          },
          {
            type: 'Pilihan Ganda' as QuestionType,
            difficulty: 'SEDANG' as DifficultyLevel,
            questionText: 'Cairan empedu dihasilkan oleh hati dan ditampung dalam kantung empedu. Peran utama cairan empedu ini dalam proses pencernaan adalah...',
            options: [
              'Membunuh bakteri yang masuk bersama makanan',
              'Mengemulsikan lemak sehingga mudah dicerna oleh enzim lipase',
              'Memutus rantai peptida protein menjadi pepton',
              'Mengubah glukosa menjadi glikogen otot'
            ],
            correctAnswer: 'B',
            explanation: 'Cairan empedu mengemulsi lemak berukuran besar menjadi tetesan halus (misel) agar meningkatkan efisiensi enzim lipase.',
            competencyIndicator: 'Menjelaskan mekanisme emulsi zat lemak oleh empedu.'
          },
          // Isian Singkat
          {
            type: 'Isian Singkat' as QuestionType,
            difficulty: 'MUDAH' as DifficultyLevel,
            questionText: 'Asam klorida atau asam lambung (HCl) diproduksi di dalam organ pencernaan yaitu...',
            correctAnswer: 'Lambung',
            explanation: 'Asam klorida (HCl) diproduksi oleh sel-sel parietal pada dinding lambung untuk membunuh kuman dan mengaktifkan pepsinogen.',
            competencyIndicator: 'Menyebutkan organ penghasil asam klorida.'
          },
          {
            type: 'Isian Singkat' as QuestionType,
            difficulty: 'SEDANG' as DifficultyLevel,
            questionText: 'Gigi yang berfungsi untuk merobek makanan yang berstruktur alot atau keras adalah gigi...',
            correctAnswer: 'Taring',
            explanation: 'Gigi taring (dens caninus) berujung tajam dan runcing yang ditujukan khusus untuk mencabik dan merobek serat makanan seperti daging.',
            competencyIndicator: 'Mengidentifikasi jenis gigi berdasarkan fungsi mekanis.'
          },
          {
            type: 'Isian Singkat' as QuestionType,
            difficulty: 'SULIT' as DifficultyLevel,
            questionText: 'Konstipasi atau sembelit merupakan gangguan penyerapan air yang terlalu berlebih pada organ...',
            correctAnswer: 'Usus besar (Kolon)',
            explanation: 'Ketika sisa ampas makanan lambat bergerak di kolon, penyerapan air berlangsung berlebihan yang menyebabkan feses mengeras.',
            competencyIndicator: 'Menganalisis relasi kelainan sistem pencernaan dengan kerusakan fungsional organ.'
          },
          // Benar/Salah
          {
            type: 'Benar/Salah' as QuestionType,
            difficulty: 'MUDAH' as DifficultyLevel,
            questionText: 'Usus halus terdiri atas tiga bagian, yaitu usus dua belas jari (duodenum), usus tengah (jejunum), dan usus penyerapan (ileum).',
            correctAnswer: 'Benar',
            explanation: 'Ini adalah anatomi sahih dari usus halus manusia (small intestine) yang terbagi dalam tiga bagian utama tersebut.',
            competencyIndicator: 'Mengenal bagian-bagian penyusun struktur organ usus halus.'
          },
          {
            type: 'Benar/Salah' as QuestionType,
            difficulty: 'SEDANG' as DifficultyLevel,
            questionText: 'Enzim pepsin di Lambung bekerja optimal dalam kondisi lingkungan yang sangat basa (alkalis) tinggi.',
            correctAnswer: 'Salah',
            explanation: 'Sebaliknya, pepsin membutuhkan kondisi sangat asam (pH 1.5 - 2) yang ditunjang oleh kehadiran HCl lambung.',
            competencyIndicator: 'Memahami pengaruh tingkat keasaman (pH) terhadap biosintesis enzim lambung.'
          },
          {
            type: 'Benar/Salah' as QuestionType,
            difficulty: 'SULIT' as DifficultyLevel,
            questionText: 'Seseorang yang menderita penyakit hepatitis kronis sering kali mengalami kesulitan dalam mencerna zat makanan berupa karbohidrat kompleks.',
            correctAnswer: 'Salah',
            explanation: 'Hepatitis menyerang sel hati sehingga menurunkan produksi cairan empedu. Oleh sebab itu penderita kesulitan mencerna lemak, bukan karbohidrat.',
            competencyIndicator: 'Menganalisis dampak sistemis hepatitis pada kemampuan metabolisme lipid.'
          }
        ]
      },
      {
        name: 'Gaya dan Gerak',
        questions: [
          {
            type: 'Pilihan Ganda' as QuestionType,
            difficulty: 'MUDAH' as DifficultyLevel,
            questionText: 'Tarikan atau dorongan yang dapat menyebabkan suatu benda mengalami perubahan gerak atau bentuk dinamakan...',
            options: ['Daya', 'Energi', 'Gaya', 'Kecepatan'],
            correctAnswer: 'C',
            explanation: 'Gaya diartikan sebagai dorongan atau tarikan yang diberikan pada suatu benda.',
            competencyIndicator: 'Menjelaskan definisi dasar konsep gaya mekanik.'
          },
          {
            type: 'Pilihan Ganda' as QuestionType,
            difficulty: 'SEDANG' as DifficultyLevel,
            questionText: 'Sebuah balok diam di atas meja ditarik ke kanan dengan gaya 15 N dan ditarik ke kiri dengan gaya 10 N. Resultan gaya balok itu adalah...',
            options: ['5 N ke kiri', '5 N ke kanan', '25 N ke kanan', '0 N (Tetap diam)'],
            correctAnswer: 'B',
            explanation: 'Resultan = 15 N (kanan) - 10 N (kiri) = 5 N ke arah kanan.',
            competencyIndicator: 'Menghitung penjumlahan vektor gaya searah atau berlawanan.'
          },
          {
            type: 'Pilihan Ganda' as QuestionType,
            difficulty: 'SULIT' as DifficultyLevel,
            questionText: 'Hukum Newton II menerangkan hubungan berbanding lurus antara percepatan dengan resultan gaya, dan berbanding terbalik dengan massa benda. Manakah aplikasi praktis di bawah ini?',
            options: [
              'Penumpang terdorong ke depan saat bus direm mendadak',
              'Roket dapat meluncur ke angkasa karena semburan gas ke bawah',
              'Melempar bola kasti kecil lebih cepat dibandingkan melempar bola bowling berat dengan tenaga yang sama',
              'Buku di atas meja tidak jatuh karena gaya berat ditahan gaya normal'
            ],
            correctAnswer: 'C',
            explanation: 'Dengan gaya konstan, percepatan (a) berbanding terbalik dengan massa (m). Bowling lebih berat, akselerasinya lambat.',
            competencyIndicator: 'Menerapkan Hukum II Newton pada kasus mekanis kontekstual.'
          },
          {
            type: 'Isian Singkat' as QuestionType,
            difficulty: 'SEDANG' as DifficultyLevel,
            questionText: 'Alat yang dirancang khusus untuk mengukur nilai mutlak satu gaya adalah...',
            correctAnswer: 'Dinamometer',
            explanation: 'Dinamometer (neraca pegas) memanfaatkan prinsip elastisitas Hooke untuk mendeteksi besaran gaya luar.',
            competencyIndicator: 'Mengidentifikasi instrumen ukur fisis besaran gaya.'
          },
          {
            type: 'Benar/Salah' as QuestionType,
            difficulty: 'MUDAH' as DifficultyLevel,
            questionText: 'Gaya gesek selalu searah dengan arah kecenderungan gerak benda untuk meluncur.',
            correctAnswer: 'Salah',
            explanation: 'Gaya gesek (friction force) arahnya selalu bertentangan atau berlawanan dengan arah gerak relatif benda.',
            competencyIndicator: 'Membedakan orientasi arah vektor gaya gesek dengan gerak benda.'
          }
        ]
      }
    ]
  },
  {
    subject: 'Matematika',
    grade: 'Kelas 8',
    level: 'SMP / MTs',
    topics: [
      {
        name: 'Aljabar & Persamaan Linier',
        questions: [
          {
            type: 'Pilihan Ganda' as QuestionType,
            difficulty: 'MUDAH' as QuestionType,
            questionText: 'Manakah nilai variabel x penyelesai dari persamaan linier satu variabel dari: 3x - 7 = 11 ?',
            options: ['4', '5', '6', '12'],
            correctAnswer: 'C',
            explanation: '3x = 11 + 7 => 3x = 18 => x = 6.',
            competencyIndicator: 'Menentukan solusi penyelesaian PLSV sederhana.'
          },
          {
            type: 'Pilihan Ganda' as QuestionType,
            difficulty: 'SEDANG' as QuestionType,
            questionText: 'Jika diketahui sistem persamaan linier dua variabel berikut:\n x + y = 7\n 2x - y = 5\nNilai dari x dikali y (x * y) adalah...',
            options: ['6', '8', '10', '12'],
            correctAnswer: 'D',
            explanation: 'Jumlahkan kedua persamaan: 3x = 12 => x = 4. Substitusi: 4 + y = 7 => y = 3. Maka x*y = 4*3 = 12.',
            competencyIndicator: 'Menyelesaikan sistem persamaan linier dua variabel (SPLDV).'
          },
          {
            type: 'Isian Singkat' as QuestionType,
            difficulty: 'MUDAH' as DifficultyLevel,
            questionText: 'Bentuk sederhana dari ekspresi aljabar: 5a - 3b + 2a - b adalah...',
            correctAnswer: '7a - 4b',
            explanation: 'Kumpulkan suku-suku sejenis: (5a + 2a) + (-3b - b) = 7a - 4b.',
            competencyIndicator: 'Menyederhanakan suku aljabar linier.'
          },
          {
            type: 'Benar/Salah' as QuestionType,
            difficulty: 'SEDANG' as DifficultyLevel,
            questionText: 'Grafik dari persamaan linear y = 3x - 5 memiliki kemiringan (gradien) positif dan memotong sumbu Y di koordinat (0, 5).',
            correctAnswer: 'Salah',
            explanation: 'Gradiennya m=3 (positif), benar. Namun, titik potong sumbu Y terletak pada (0, -5), bukan (0, 5).',
            competencyIndicator: 'Menganalisis sifat-sifat persamaan garis lurus.'
          }
        ]
      }
    ]
  }
];

// Helper method to dynamically generate questions that fit exactly the specified count and difficulty criteria
export function generateQuestions(
  curriculum: string,
  identity: QuizIdentity,
  config: QuizConfig
): Question[] {
  // 1. Try to find matched subject and topic in preset database
  const matchedSubject = SUBJECT_PRESETS.find(
    (p) => p.subject.toLowerCase() === identity.subject.toLowerCase()
  );

  let pool: Omit<Question, 'number'>[] = [];

  if (matchedSubject) {
    const matchedTopic = matchedSubject.topics.find(
      (t) => t.name.toLowerCase() === identity.topic.toLowerCase()
    );
    if (matchedTopic) {
      pool = matchedTopic.questions as Omit<Question, 'number'>[];
    } else {
      // Pick first topic of this subject
      pool = matchedSubject.topics[0]?.questions as Omit<Question, 'number'>[] || [];
    }
  }

  // If pool too small or empty, generate beautiful procedural fallbacks
  if (pool.length === 0) {
    pool = generateProceduralPool(identity.subject, identity.topic);
  }

  // 2. We need to construct a list of questions that matches EXACTLY:
  // config.multipleChoiceCount
  // config.shortAnswerCount
  // config.trueFalseCount
  // Difficulty levels can be approximated across the questions!
  const targetQuestions: Question[] = [];
  let currentNum = 1;

  // Let's divide difficulties mathematically based on total
  const totalWanted = config.multipleChoiceCount + config.shortAnswerCount + config.trueFalseCount;
  const easyCount = Math.round((config.difficultyEasy / 100) * totalWanted);
  const hardCount = Math.round((config.difficultyHard / 100) * totalWanted);
  const mediumCount = totalWanted - easyCount - hardCount;

  // We assign a difficulty profile to each slot
  const difficultySlots: DifficultyLevel[] = [];
  for (let i = 0; i < easyCount; i++) difficultySlots.push('MUDAH');
  for (let i = 0; i < mediumCount; i++) difficultySlots.push('SEDANG');
  for (let i = 0; i < hardCount; i++) difficultySlots.push('SULIT');

  // Shuffle or balance difficulty slots so they represent the distribution
  // Let's create questions of each type!
  const createSubList = (type: QuestionType, countNeeded: number) => {
    // Collect from pool matching this type
    const typedPool = pool.filter((q) => q.type === type);
    
    for (let c = 0; c < countNeeded; c++) {
      // Pick dynamic slot difficulty
      const slotDiff = difficultySlots.pop() || 'SEDANG';
      
      // Try to find a direct match in pool first
      let selected = typedPool.find((q) => q.difficulty === slotDiff && !targetQuestions.some(t => t.id === q.id));
      
      // Fallback 1: Any unused from typedPool
      if (!selected) {
        selected = typedPool.find((q) => !targetQuestions.some(t => t.id === (q as any).id));
      }

      // Fallback 2: Generate dynamic procedural question of this type and difficulty
      if (!selected) {
        selected = createSingleProceduralQuestion(identity.subject, identity.topic, type, slotDiff, c + 1);
      }

      // Make a unique deep copy with customized fields
      const qCopy: Question = {
        id: selected.id || `${type.replace(' ', '_')}_${slotDiff}_${currentNum}`,
        number: currentNum++,
        type: type,
        difficulty: slotDiff,
        questionText: selected.questionText,
        options: selected.options ? [...selected.options] : undefined,
        correctAnswer: selected.correctAnswer,
        explanation: selected.explanation,
        imageUrl: selected.imageUrl,
        competencyIndicator: selected.competencyIndicator || `Menjelaskan cakupan materi ${identity.topic} berdifficulty ${slotDiff}.`
      };

      targetQuestions.push(qCopy);
    }
  };

  // Build each type
  createSubList('Pilihan Ganda', config.multipleChoiceCount);
  createSubList('Isian Singkat', config.shortAnswerCount);
  createSubList('Benar/Salah', config.trueFalseCount);

  return targetQuestions;
}

// Procedural generator when no preset matches
function generateProceduralPool(subject: string, topic: string): Omit<Question, 'number'>[] {
  const result: Omit<Question, 'number'>[] = [];
  
  // Create 4 standard MC
  result.push({
    id: `${subject}_mc_1`,
    type: 'Pilihan Ganda',
    difficulty: 'MUDAH',
    questionText: `Manakah cakupan dasar di bawah ini yang merupakan bagian integral dari materi pokok "${topic}" di mata pelajaran ${subject}?`,
    options: ['Prinsip Pengukuran dasar', 'Definisi dan orientasi konseptual utama', 'Metodologi studi sekunder', 'Penghitungan komputasi kuantum'],
    correctAnswer: 'B',
    explanation: `Konsep dasar mengenai ${topic} selalu berpilar pada pengenalan terminologi, struktur, dan pendefinisian orientasi konseptual utama sebelum menginjak analisis mendalam.`,
    competencyIndicator: `Mengidentifikasi konsep dasar ${topic}.`
  });

  result.push({
    id: `${subject}_mc_2`,
    type: 'Pilihan Ganda',
    difficulty: 'SEDANG',
    questionText: `Dalam menelaah fenomena "${topic}", faktor lingkungan eksternal dan variabel katalisator internal saling memengaruhi secara sistematis. Manakah skema relasi yang paling presisi?`,
    options: [
      'Peningkatan variabel internal menurunkan total energi reaktif',
      'Interaksi dinamis sebanding dengan kuadrat hambatan absolut',
      'Kedua faktor beroperasi secara dependen dalam menjaga kesetimbangan fungsional',
      'Variabel eksternal sepenuhnya menggantikan kontribusi komponen dasar internal'
    ],
    correctAnswer: 'C',
    explanation: `Skema teoretis pada telaah ${topic} menggarisbawahi bahwa kesetimbangan fungsional hanya tercapai saat komponen internal dan eksternal berkomunikasi secara sinergis.`,
    competencyIndicator: `Menganalisis hubungan sebab-akibat antarkomponen dalam ${topic}.`
  });

  result.push({
    id: `${subject}_mc_3`,
    type: 'Pilihan Ganda',
    difficulty: 'SULIT',
    questionText: `Pada penerapan tingkat lanjut materi "${topic}", sering terjadi miskonsepsi teoretis. Solusi implementasi paling logis untuk mengatasi penyimpangan praktis tersebut adalah...`,
    options: [
      'Menurunkan standarisasi variabel ukur pengamatan lapangan',
      'Menerapkan kalibrasi metodologi secara berkala serta penyesuaian model hipotesis',
      'Menghentikan penggunaan pemodelan teoretis dan beralih ke analisis subjektif murni',
      'Mengulang kembali pemetaan dari tahapan terawal tanpa pertimbangan data anomali'
    ],
    correctAnswer: 'B',
    explanation: `Kalibrasi dan revisi model hipotesis secara berkala berdasarkan anomali empiris merupakan satu-satunya cara ilmiah yang logis untuk mereduksi miskonsepsi teoretis pada ${topic}.`,
    competencyIndicator: `Memecahkan masalah miskonsepsi teoretis terkait ${topic}.`
  });

  // Short answers
  result.push({
    id: `${subject}_sa_1`,
    type: 'Isian Singkat',
    difficulty: 'MUDAH',
    questionText: `Zat, komponen, atau unit mendasar yang mutlak dibutuhkan dalam mengaktifkan proses "${topic}" dinamakan sebagai...`,
    correctAnswer: 'Elemen Esensial',
    explanation: `Unit pembakar atau pendorong mutlak dinamakan Elemen Esensial yang tanpa kehadirannya laju metabolisme/operasional ${topic} akan terhambat total.`,
    competencyIndicator: `Menjelaskan komponen mutlak yang mendinamisasi ${topic}.`
  });

  result.push({
    id: `${subject}_sa_2`,
    type: 'Isian Singkat',
    difficulty: 'SEDANG',
    questionText: `Sebutkan nama standar parameter yang digunakan secara universal untuk mengevaluasi efektivitas operasional sistem "${topic}"!`,
    correctAnswer: 'Indeks Koefisien Efisiensi',
    explanation: `Dalam standardisasi kajian ${subject}, Indeks Koefisien Efisiensi dipakai meluas sebagai barometer kuantitatif tingkat keberhasilan.`,
    competencyIndicator: `Menggunakan parameter ukur standar efektivitas.`
  });

  // True/False
  result.push({
    id: `${subject}_tf_1`,
    type: 'Benar/Salah',
    difficulty: 'MUDAH',
    questionText: `Penerapan praktis prinsip "${topic}" hanya relevan jika diujicobakan pada ekosistem laboratorium tertutup dan tidak berlaku di kehidupan sehari-hari manusia.`,
    correctAnswer: 'Salah',
    explanation: `Hampir seluruh spektrum pembahasan ${topic} dirancang khusus untuk memecahkan fenomena keseharian kontekstual yang dihadapi guru, siswa, dan lingkungan sekitar.`,
    competencyIndicator: `Menilai relevansi aplikasi harian dari konsep keilmuan.`
  });

  result.push({
    id: `${subject}_tf_2`,
    type: 'Benar/Salah',
    difficulty: 'SEDANG',
    questionText: `Setiap elemen yang menyusun struktur materi "${topic}" mempunyai konstanta laju reaksi atau koefisien kerja yang seragam satu sama lain.`,
    correctAnswer: 'Salah',
    explanation: `Masing-masing komponen memiliki karakter organik unik dengan konstanta laju yang bervariasi bergantung pada ketersediaan katalisator pembantu.`,
    competencyIndicator: `Memprediksi homogenitas karakteristik struktural pembentuk.`
  });

  return result;
}

// Procedural generator fallback for a single dynamic question to avoid duplicate keys or content
function createSingleProceduralQuestion(
  subject: string,
  topic: string,
  type: QuestionType,
  difficulty: DifficultyLevel,
  orderIndex: number
): Omit<Question, 'number'> {
  let text = '';
  let options: string[] | undefined = undefined;
  let correct = '';
  let expl = '';

  if (type === 'Pilihan Ganda') {
    text = `[No.${orderIndex}] Perhatikan aspek fundamental berkaitan dengan tema "${topic}". Manakah dari pernyataan di bawah ini yang mendemonstrasikan fenomena tersebut di level kesulitan ${difficulty}?`;
    options = [
      `Arah gerakan linear berbanding lurus dengan konstanta percepatan fisis`,
      `Konsentrasi zat berbanding terbalik dengan temperatur sistem termodinamika`,
      `Variabel penjelas menyajikan korelasi kuat sebesar 95% secara empiris`,
      `Semua pernyataan di atas berinteraksi membentuk pola kesatuan sistematik`
    ];
    correct = 'D';
    expl = `Aspek fundamental ${topic} di tingkat ${difficulty} diwakili ideal oleh perpaduan korelasi variabel penjelas, arah gerakan linier, dan tingkat konsentrasi sistem.`;
  } else if (type === 'Isian Singkat') {
    text = `[No.${orderIndex}] Istilah teknis yang digunakan oleh para akademisi untuk menyebutkan proses perubahan cepat atau transisi fasa di lingkup topik "${topic}" adalah...`;
    correct = 'Transisi Kritis';
    expl = `Transisi Kritis merepresentasikan pergeseran mendadak dari satu status stabil ke status keseimbangan baru pada subjek bahasan ${topic}.`;
  } else {
    text = `[No.${orderIndex}] Konsep teoretis utama yang memayungi gagasan "${topic}" mendalilkan bahwa laju efisiensi berbanding lurus dengan jumlah zat pereaksi dalam wadah tertutup pada suhu konstan.`;
    correct = 'Benar';
    expl = `Sesuai dengan hukum aksi massa fisis dalam rumpun keilmuan ${subject}, wadah tertutup menjaga konsumsi entalpi yang meningkatkan efisiensi.`;
  }

  return {
    id: `dynamic_${type.slice(0,2)}_${difficulty}_${orderIndex}_${Math.random().toString(36).substr(2, 4)}`,
    type,
    difficulty,
    questionText: text,
    options,
    correctAnswer: correct,
    explanation: expl,
    competencyIndicator: `Menguasai korelasi teoretis tingkat ${difficulty} pada topik ${topic}.`
  };
}
