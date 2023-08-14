interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({ children, onClick }) => {
  return (
    <button
      className="px-4 py-1 mx-2 text-sm text-white rounded-full border border-white hover:text-white hover:bg-green-600 hover:border-black"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
