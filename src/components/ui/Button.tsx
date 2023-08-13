interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({ children, onClick }) => {
  return (
    <button
      className='px-4 py-1 mx-2 text-sm text-white font-semibold rounded-full border border-purple-200 hover:text-white purple-600 hover:border-black focus:outline-none focus:ring-2  '
      onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;