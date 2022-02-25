interface ButtonProps {
  children: string;
  type?: "button" | "submit";
  className?: string;
}

const Button = ({ children, type, className }: ButtonProps) => {
  return (
    <button
      className={`focus: whitespace-nowrap rounded bg-sky-500 px-4 py-1.5 
      font-semibold text-white transition-colors hover:bg-sky-400
       focus:border-sky-300 focus:outline-none focus:ring focus:ring-sky-200
       focus:ring-offset-2 ${className}`}
      type={type}
    >
      {children}
    </button>
  );
};

export default Button;
