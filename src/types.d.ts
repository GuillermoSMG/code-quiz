export interface Question {
  id: string;
  question: string;
  code: string;
  answers: string[];
  correctAnswer: number;
  userSelectedAnswer?: number;
  isCorrectUserAnswer?: boolean;
}

export type Lenguage = 'javascript' | 'python';
