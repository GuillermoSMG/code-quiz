import { lazy } from 'react';
import { useQuestionData } from '../hooks/useQuestionData';
import { useQuestionsStore } from '../store/questions';

const Footer = lazy(() => import('./Footer'));
const ArrowButton = lazy(() => import('./ArrowButton'));
const Question = lazy(() => import('./Question'));

const Games = () => {
  const questions = useQuestionsStore(state => state.questions);
  const currentQuestion = useQuestionsStore(state => state.currentQuestion);
  const goNextQuestion = useQuestionsStore(state => state.goNextQuestion);
  const goPrevQuestion = useQuestionsStore(state => state.goPrevQuestion);
  const { unanswered } = useQuestionData();
  const questionInfo = questions[currentQuestion];
  return (
    <section className='flex flex-col'>
      {unanswered > 0 && (
        <div className='m-auto mt-4 flex gap-4'>
          <ArrowButton
            disabled={currentQuestion === 0}
            symbol='&lt;'
            handleClick={goPrevQuestion}
          />
          <span className='text-white'>
            {questions.indexOf(questionInfo) + 1}
          </span>
          <ArrowButton
            disabled={currentQuestion >= questions.length - 1}
            symbol='&gt;'
            handleClick={goNextQuestion}
          />
        </div>
      )}
      <main className='mt-10 sm:bg-gray-900 sm:p-10 flex flex-col justify-between max-w-full'>
        {unanswered > 0 ? <Question info={questionInfo} /> : null}
        <Footer end={!!unanswered} />
      </main>
    </section>
  );
};

export default Games;
