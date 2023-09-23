import { collection, getDocs, getFirestore } from 'firebase/firestore';
import { app } from './firebase';
import { type Question, type Lenguage } from '../types';

export const getFirebase = (collectionName: Lenguage) => {
  const db = getFirestore(app);

  if (collectionName === undefined)
    throw new Error("Collection name can't be undefined.");

  const coll = collection(db, collectionName);

  const data = getDocs(coll).then(res => {
    const arrayNorm: Question[] = res.docs.map(element => {
      return {
        id: element.id,
        question: element.data().question,
        code: element.data().code,
        answers: element.data().answers,
        correctAnswer: element.data().correctAnswer,
      };
    });
    return arrayNorm;
  });
  return data;
};
