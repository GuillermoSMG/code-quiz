import { useQuestionsStore } from '../store/questions';
import { type Question as QuestionType } from '../types';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { srcery } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { getBackgroundColor } from '../utils/getBackground';

interface QuestionProps {
  info: QuestionType;
}

const Question: React.FC<QuestionProps> = ({ info }) => {
  const { question, code, answers, id } = info;
  const selectedAnswer = useQuestionsStore(state => state.selectAnswer);
  const goNextQuestion = useQuestionsStore(state => state.goNextQuestion);
  const createHandleClick = (answerIndex: number) => () => {
    selectedAnswer(id, answerIndex);
    setTimeout(() => {
      goNextQuestion();
    }, 1500);
  };
  return (
    <main>
      <div>
        <h3 className='text-lg text-white'>{question}</h3>
        <SyntaxHighlighter language='javascript' style={srcery}>
          {code}
        </SyntaxHighlighter>
      </div>
      <ul className='py-5'>
        {answers.map((answer, i) => (
          <li key={i} className={`${i % 2 === 0 && 'bg-gray-700'}`}>
            <button
              disabled={info.userSelectedAnswer != null}
              style={{ backgroundColor: getBackgroundColor(i, info) }}
              className='h-full w-full py-2 px-2'
              onClick={createHandleClick(i)}
            >
              {answer}
            </button>
          </li>
        ))}
      </ul>
    </main>
  );
};

export default Question;
