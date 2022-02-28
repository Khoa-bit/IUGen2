import { Transition } from "@headlessui/react";
import { ChevronDoubleUpIcon } from "@heroicons/react/solid";
import { ReactElement, useEffect, useRef, useState } from "react";
import Footer from "./Footer";
import Header from "./Header";

interface LayoutProps {
  children: ReactElement;
}

const Layout = ({ children }: LayoutProps) => {
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
    <section
      className="grid min-h-screen grid-cols-1 
    grid-rows-[max-content_1fr_max-content] text-slate-900
    selection:bg-sky-300 selection:text-sky-900"
    >
      <Header></Header>
      <main
        className="mx-auto flex w-full flex-col items-center 
      gap-10 p-5"
      >
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
        {children}
        <div
          ref={scrollAnchor}
          id="scrollAnchor"
          className="absolute top-28 h-0 w-0"
        ></div>
      </main>
      <Footer></Footer>
    </section>
  );
};

export default Layout;
