import { AnchorHTMLAttributes } from "react";
import { getVariant, variantType } from "./Button";

interface AnchorButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: variantType;
}

const AnchorButton = ({ variant, className, ...props }: AnchorButtonProps) => {
  const colorCSS = getVariant(variant);

  return (
    <a
      {...props}
      className={`whitespace-nowrap rounded px-4 py-1.5
                  no-underline transition-colors focus:outline-none
                  focus:ring focus:ring-offset-2 ${colorCSS} ${className}`}
    ></a>
  );
};

export default AnchorButton;
