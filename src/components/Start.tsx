import { useQuestionsStore } from '../store/questions';
import { Lenguage } from '../types';
import { JavaScript } from './Icons';
import LanguageButton from './LanguageButton';

const Start = () => {
  const fetchQuestions = useQuestionsStore(state => state.fetchQuestion);
  const setLanguage = useQuestionsStore(state => state.setLanguage);
  const handleClick = (lang: Lenguage) => {
    setLanguage(lang);
    fetchQuestions(10);
  };
  return (
    <div>
      {/* <span>Elije un lenguaje</span> */}
      <div className='pt-4 flex gap-3'>
        <LanguageButton handleOnClick={() => handleClick('javascript')}>
          <JavaScript />
        </LanguageButton>
        {/* <LanguageButton handleOnClick={() => handleClick('python')}>
          <Python />
        </LanguageButton> */}
      </div>
    </div>
  );
};

export default Start;
