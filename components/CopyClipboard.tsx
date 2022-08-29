import { Transition } from "@headlessui/react";
import { useState } from "react";

interface CopyClipboardProps extends React.PropsWithChildren {
  text: string;
  className?: string;
}

const CopyClipboard = ({ text, className, ...props }: CopyClipboardProps) => {
  const [isShowing, setIsShowing] = useState(false);
  const count = 60;

  return (
    <div className={`relative ${className}`}>
      <button
        aria-label="Copy URL to share"
        className={`rounded p-2 text-white shadow shadow-slate-300 transition-colors 
        focus:outline-none focus:ring focus:ring-offset-2
          ${
            isShowing
              ? "bg-emerald-400 hover:bg-emerald-400 focus:border-emerald-300 focus:ring-emerald-200"
              : "bg-sky-400 hover:bg-sky-300 focus:border-sky-300 focus:ring-sky-200"
          }`}
        title={text.slice(0, count) + (text.length > count ? "..." : "")}
        onClick={(event) => {
          event.preventDefault();
          navigator.clipboard.writeText(text).then(() => {
            setIsShowing(true);
            setTimeout(() => {
              setIsShowing(false);
            }, 1500);
          });
        }}
      >
        {props.children}
      </button>
      <Transition
        show={isShowing}
        enter="transform transition duration-100"
        enterFrom="opacity-0 -translate-y-10"
        enterTo="opacity-100 -translate-y-11"
        leave="transform transition duration-150"
        leaveFrom="opacity-100 -translate-y-11"
        leaveTo="opacity-0 -translate-y-10"
      >
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 rounded bg-emerald-400 py-1 px-2 text-white">
          Copied
        </div>
      </Transition>
    </div>
  );
};

export default CopyClipboard;
