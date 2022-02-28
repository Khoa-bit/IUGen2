import { Transition } from "@headlessui/react";
import { ChevronDoubleUpIcon } from "@heroicons/react/solid";
import type { NextPage } from "next";
import { useEffect, useRef, useState } from "react";
import IUGen from "../../components/IUGen";

const IUGenPage: NextPage = () => {
  const scrollAnchor = useRef<HTMLDivElement>(null);
  const [showingScrollTop, setShowingScrollTop] = useState(false);

  useEffect(() => {
    const scrollAnchorEle = scrollAnchor.current;
    if (!scrollAnchorEle)
      throw Error("divRef or scrollAnchorEle is not assigned");

    let observer = new IntersectionObserver((entries) => {
      if (entries[0].boundingClientRect.top < 0) {
        setShowingScrollTop(true);
      } else {
        setShowingScrollTop(false);
      }
    });

    observer.observe(scrollAnchorEle);
  }, []);

  return (
    <>
      <Transition
        show={showingScrollTop}
        className="fixed right-8 bottom-16 z-10 md:right-14"
        as="div"
        enter="transition duration-150"
        enterFrom="opacity-0 translate-y-2"
        enterTo="opacity-100 translate-y-0"
        leave="transition duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 -translate-y-2"
      >
        <button
          className="rounded-full bg-slate-900 p-2 text-slate-200 shadow-lg 
            shadow-slate-500 transition-colors hover:bg-slate-800"
          aria-label="Scroll to Top"
          onClick={() => document.body.scrollIntoView({ behavior: "smooth" })}
        >
          <ChevronDoubleUpIcon className="h-7 w-7"></ChevronDoubleUpIcon>
        </button>
      </Transition>
      <IUGen></IUGen>
      <div
        ref={scrollAnchor}
        id="scrollAnchor"
        className="absolute top-[40rem] h-0 w-0"
      ></div>
    </>
  );
};

export default IUGenPage;
