import { useQuestionsStore } from '../store/questions';

interface LanguageButtonProps {
  handleOnClick: () => void;
  children: React.ReactNode;
}

const LanguageButton: React.FC<LanguageButtonProps> = ({
  handleOnClick,
  children,
}) => {
  const loading = useQuestionsStore(state => state.loading);

  return (
    <button
      className='hover:opacity-75 disabled:opacity-60'
      disabled={loading}
      onClick={() => handleOnClick()}
    >
      {children}
    </button>
  );
};

export default LanguageButton;
