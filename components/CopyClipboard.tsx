import { Transition } from "@headlessui/react";
import { ClipboardIcon } from "@heroicons/react/24/solid";
import { useState } from "react";

interface CopyClipboardProps {
  text: string;
  className?: string;
}

const CopyClipboard = ({ text, className }: CopyClipboardProps) => {
  const [isShowing, setIsShowing] = useState(false);
  const count = 60;

  return (
    <div className={`relative ${className}`}>
      <button
        aria-label="Copy URL to share"
        className={`transition-colorsfocus:border-sky-300 rounded p-2 text-white
          focus:outline-none focus:ring focus:ring-sky-200 focus:ring-offset-2 
          ${
            isShowing
              ? "bg-emerald-400 hover:bg-emerald-400"
              : "bg-sky-500 hover:bg-sky-400"
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
        <ClipboardIcon className="h-5 shrink-0 text-white"></ClipboardIcon>
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
