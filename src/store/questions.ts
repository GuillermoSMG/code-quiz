import { create } from 'zustand';
import { type Lenguage, type Question } from '../types';
import { persist } from 'zustand/middleware';
import { getFirebase } from '../services/getFBCollection';

interface State {
  questions: Question[];
  currentQuestion: number;
  language: Lenguage;
  loading: boolean;
  fetchQuestion: (limit: number) => Promise<void>;
  selectAnswer: (questionId: string, answerIndex: number) => void;
  goNextQuestion: () => void;
  goPrevQuestion: () => void;
  reset: () => void;
  setLanguage: (language: Lenguage) => void;
}

export const useQuestionsStore = create<State>()(
  persist(
    (set, get) => {
      return {
        questions: [],
        currentQuestion: 0,
        language: undefined,
        loading: false,

        fetchQuestion: async (limit: number) => {
          const { language } = get();
          set({ loading: true });
          const res = await getFirebase(language);

          const questions = res.sort(() => Math.random() - 0.5).slice(0, limit);
          set({ questions, loading: false });
        },
        selectAnswer: (questionId: string, answerIndex: number) => {
          const { questions } = get();
          const newQuestions = structuredClone(questions);
          const questionIndex = newQuestions.findIndex(
            q => q.id === questionId
          );
          const questionInfo = newQuestions[questionIndex];
          const isCorrectUserAnswer =
            questionInfo.correctAnswer === answerIndex;

          newQuestions[questionIndex] = {
            ...questionInfo,
            isCorrectUserAnswer,
            userSelectedAnswer: answerIndex,
          };

          set({ questions: newQuestions });
        },

        goNextQuestion: () => {
          const { currentQuestion, questions } = get();
          const nextQuestion = currentQuestion + 1;

          if (nextQuestion < questions.length) {
            set({ currentQuestion: nextQuestion });
          }
        },

        goPrevQuestion: () => {
          const { currentQuestion } = get();
          const prevQuestion = currentQuestion - 1;

          if (prevQuestion >= 0) {
            set({ currentQuestion: prevQuestion });
          }
        },

        reset: () => {
          set({
            currentQuestion: 0,
            questions: [],
            language: undefined,
            loading: false,
          });
        },

        setLanguage: (language: Lenguage) => {
          set({ language });
        },
      };
    },
    { name: 'questions' }
  )
);
