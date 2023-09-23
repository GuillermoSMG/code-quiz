interface ArrowButtonProps {
  disabled: boolean;
  handleClick: () => void;
  symbol: string;
}

const ArrowButton: React.FC<ArrowButtonProps> = ({
  disabled,
  handleClick,
  symbol,
}) => {
  return (
    <button
      className='border rounded-full px-[6px] font-extrabold disabled:opacity-20'
      onClick={handleClick}
      disabled={disabled}
    >
      {symbol}
    </button>
  );
};

export default ArrowButton;
