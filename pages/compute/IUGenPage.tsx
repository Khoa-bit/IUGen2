import { Transition } from "@headlessui/react";
import { ChevronDoubleUpIcon } from "@heroicons/react/solid";
import type { NextPage } from "next";
import { Fragment, useEffect, useRef, useState } from "react";
import IUGen from "../../components/IUGen";

const IUGenPage: NextPage = () => {
  const scrollAnchor = useRef<HTMLDivElement>(null);
  const [showingScrollTop, setShowingScrollTop] = useState(false);

  useEffect(() => {
    // Note that ref.current may be null. This is expected, because you may
    // conditionally render the ref-ed element, or you may forgot to assign it
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
    <main className="mx-auto flex max-w-screen-lg flex-col gap-10 p-5 selection:bg-sky-300 selection:text-sky-900">
      <Transition
        show={showingScrollTop}
        as={Fragment}
        enter="transition duration-150"
        enterFrom="opacity-0 translate-y-2"
        enterTo="opacity-100 translate-y-0"
        leave="transition duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 -translate-y-2"
      >
        <a
          className="fixed right-5 bottom-5 md:right-10 md:bottom-10 lg:right-16 lg:bottom-10"
          href="#ClassInputForm"
          aria-label="Scroll to Top"
        >
          <div className="rounded-full bg-slate-900 p-2  text-slate-200 shadow-lg shadow-slate-500">
            <ChevronDoubleUpIcon className="h-7 w-7"></ChevronDoubleUpIcon>
          </div>
        </a>
      </Transition>
      <IUGen></IUGen>
      <div
        ref={scrollAnchor}
        id="scrollAnchor"
        className="absolute top-[40rem] h-0 w-0"
      ></div>
    </main>
  );
};

export default IUGenPage;
