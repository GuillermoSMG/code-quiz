import { useQuestionData } from '../hooks/useQuestionData';
import { useQuestionsStore } from '../store/questions';

interface FooterProps {
  end: boolean;
}

const Footer: React.FC<FooterProps> = ({ end }) => {
  const { correct, incorrect, unanswered } = useQuestionData();
  const reset = useQuestionsStore(state => state.reset);

  return (
    <footer className='flex gap-2 items-center'>
      <strong>Correct: {correct} </strong>
      <strong>Incorrect: {incorrect} </strong>
      {end && <strong>Unanswered: {unanswered} </strong>}
      <button onClick={reset} className='bg-red-800 rounded-md px-4 py-2'>
        Reset
      </button>
    </footer>
  );
};

export default Footer;
