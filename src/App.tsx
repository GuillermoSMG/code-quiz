import { Suspense, lazy } from 'react';
import { useQuestionsStore } from './store/questions';

const Games = lazy(() => import('./components/Games'));
const Start = lazy(() => import('./components/Start'));

function App() {
  const questions = useQuestionsStore(state => state.questions);
  return (
    <Suspense
      fallback={
        <main className='flex flex-col h-[100vh] items-center justify-center'>
          Loading...
        </main>
      }
    >
      <main className='flex flex-col items-center justify-center'>
        <h1 className='text-5xl text-slate-200 mt-4'>Quizzz</h1>
        {questions.length === 0 ? <Start /> : <Games />}
      </main>
    </Suspense>
  );
}

export default App;
