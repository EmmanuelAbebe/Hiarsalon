interface ButtonProps {
  label: string;
  className?: string;
  onClick?: () => void;
}

const Button = ({ label, onClick, className = "" }: ButtonProps) => {
  return (
    <button
      className={`text-white bg-blue-500 font-bold text-sm p-2 rounded-md w-full mt-4 hover:bg-blue-700 cursor-pointer ${className}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Button;
