import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: variantType;
}

const Button = ({ variant, className, ...props }: ButtonProps) => {
  const colorCSS = getVariant(variant);

  return (
    <button
      {...props}
      className={`whitespace-nowrap rounded px-4 py-1.5
                  transition-colors focus:outline-none focus:ring
                  focus:ring-offset-2 ${colorCSS} ${className}`}
    ></button>
  );
};

export type variantType =
  | "roseInvert"
  | "slateInvert"
  | "emerald"
  | "blue"
  | undefined;

export function getVariant(variant: variantType) {
  let colorCSS: string = "";
  switch (variant) {
    case "roseInvert":
      colorCSS = `border border-rose-300 bg-rose-100 text-rose-900 hover:bg-rose-200
                  focus:border-rose-300 focus:ring-rose-200`;
      break;

    case "slateInvert":
      colorCSS = `border border-slate-300 bg-slate-100 text-slate-900 hover:bg-slate-200
                  focus:border-slate-300 focus:ring-slate-200`;
      break;

    case "emerald":
      colorCSS = `bg-emerald-500 text-white hover:bg-emerald-400
                  focus:border-emerald-300 focus:ring-emerald-200`;
      break;

    case "blue":
    default:
      colorCSS = `bg-sky-500 text-white hover:bg-sky-400
                  focus:border-sky-300 focus:ring-sky-200`;
      break;
  }
  return colorCSS;
}

export default Button;
