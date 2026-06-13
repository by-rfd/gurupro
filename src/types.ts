export type CurriculumType = 'Merdeka' | 'KBC' | 'K13' | 'Hybrid';

export type QuestionType = 'Pilihan Ganda' | 'Isian Singkat' | 'Benar/Salah';

export type DifficultyLevel = 'MUDAH' | 'SEDANG' | 'SULIT';

export interface Question {
  id: string; // unique identifier
  number: number;
  type: QuestionType;
  difficulty: DifficultyLevel;
  questionText: string;
  options?: string[]; // for multiple choice, usually 4 options
  correctAnswer: string; // "A", "B", "C", "D" for PG, text for Isian, "Benar"/"Salah" for Benar/Salah
  explanation: string;
  imageUrl?: string;
  competencyIndicator?: string; // for blueprint / kisi-kisi
}

export interface QuizIdentity {
  teacherName: string;
  schoolName: string;
  level: string;
  grade: string;
  subject: string;
  topic: string;
  instrumentType: string;
  optionsFormat: string;
}

export interface QuizConfig {
  multipleChoiceCount: number;
  shortAnswerCount: number;
  trueFalseCount: number;
  difficultyEasy: number; // percentage
  difficultyMedium: number;
  difficultyHard: number;
}
