import { Transition } from "@headlessui/react";
import { ChevronDoubleUpIcon } from "@heroicons/react/solid";
import type { NextPage } from "next";
import Link from "next/link";
import { Fragment, useEffect, useRef, useState } from "react";
import GithubIcon from "../../components/GithubIcon";
import IUGen from "../../components/IUGen";
import IUGenIcon from "../../components/IUGenIcon";
import IUGenTextIcon from "../../components/IUGenTextIcon";

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
    <section
      className="grid min-h-screen grid-cols-1 
    grid-rows-[max-content_1fr_max-content] text-slate-900"
    >
      <header className="border-b border-slate-300 bg-white">
        <nav className="mx-auto flex max-w-screen-lg items-center p-5">
          <Link href="/compute/IUGenPage">
            <a className="mr-auto">
              <IUGenTextIcon className="h-14"></IUGenTextIcon>
            </a>
          </Link>
          <a
            href="https://github.com/Khoa-bit/IUGen2"
            target="_blank"
            rel="noopener noreferrer"
          >
            <GithubIcon className="h-8 text-indigo-500"></GithubIcon>
          </a>
        </nav>
      </header>
      <main
        className="mx-auto flex w-full max-w-screen-lg flex-col 
      gap-10 p-5 selection:bg-sky-300 selection:text-sky-900"
      >
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
          <button
            className="fixed right-8 bottom-16 z-10 rounded-full bg-slate-900 p-2 text-slate-200 
            shadow-lg shadow-slate-500 transition-colors hover:bg-slate-800 md:right-14"
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
      </main>
      <footer className="border-t border-slate-300 bg-slate-100">
        <div
          className="mx-auto grid max-w-screen-lg grid-cols-1 gap-5 px-5 py-10 
        md:grid-cols-3 md:grid-rows-[minmax(0,1fr)_min-content]"
        >
          <article>
            <h4 className="mb-3 font-black">Resources</h4>
            <p>Docs</p>
          </article>
          <article>
            <h4 className="mb-3 font-black">More</h4>
            <a
              className="block text-sky-600 transition-colors hover:text-sky-400"
              href="https://github.com/Khoa-bit/IUGen2/blob/main/CODE_OF_CONDUCT.md"
              target="_blank"
              rel="noopener noreferrer"
            >
              Code of conduct
            </a>
          </article>
          <article>
            <h4 className="mb-3 font-black">About me</h4>
            <p>Khoa-bit</p>
            <a
              className="block text-sky-600 transition-colors hover:text-sky-400"
              href="mailto:nguyenanhkhoablue@protonmail.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              nguyenanhkhoablue@protonmail.com
            </a>
            <a
              className="block text-sky-600 transition-colors hover:text-sky-400"
              href="https://github.com/Khoa-bit/IUGen2"
              target="_blank"
              rel="noopener noreferrer"
            >
              Github
            </a>
            <a
              className="block text-sky-600 transition-colors hover:text-sky-400"
              href="https://www.linkedin.com/in/khoabit/"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
          </article>
          <p className="flex items-center md:col-span-2">
            <a
              className="transition-colors hover:text-slate-500"
              href="https://github.com/Khoa-bit/IUGen2/blob/main/LICENSE"
              target="_blank"
              rel="noopener noreferrer"
            >
              License: <strong>MIT</strong>
            </a>
          </p>
          <Link href="/compute/IUGenPage">
            <a>
              <IUGenIcon className="h-12"></IUGenIcon>
            </a>
          </Link>
        </div>
      </footer>
    </section>
  );
};

export default IUGenPage;
