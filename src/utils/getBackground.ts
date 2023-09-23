import { type Question } from '../types';

export const getBackgroundColor = (index: number, info: Question) => {
  const { userSelectedAnswer, correctAnswer } = info;
  if (userSelectedAnswer == null) return 'transparent';
  if (index !== correctAnswer && index !== userSelectedAnswer)
    return 'transparent';
  if (index === correctAnswer) return 'green';
  if (index === userSelectedAnswer) return 'red';
  return 'transparent';
};
