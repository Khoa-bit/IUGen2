interface ButtonProps {
  text: string;
  type?: "button" | "submit";
}

const Button = ({ text, type }: ButtonProps) => {
  return (
    <button className="rounded bg-sky-500 px-6 py-3" type={type}>
      {text}
    </button>
  );
};

export default Button;
