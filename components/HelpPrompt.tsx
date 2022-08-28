import { Dialog, Transition } from "@headlessui/react";
import { QuestionMarkCircleIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { Fragment, useState } from "react";
import Button from "./Button";

const HelpPrompt = () => {
  let [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        className="text-indigo-700 transition-colors hover:text-indigo-600"
        title="Help"
        onClick={() => setIsOpen(true)}
      >
        <QuestionMarkCircleIcon className="h-6 w-6"></QuestionMarkCircleIcon>
      </button>
      <Transition show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto selection:bg-sky-300 selection:text-sky-900"
          onClose={() => setIsOpen(false)}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-indigo-100/50" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <article
                className="prose my-8 inline-block w-full max-w-md 
            transform overflow-hidden rounded-2xl bg-white p-6 text-left 
            align-middle shadow-xl transition-all"
              >
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-slate-900"
                >
                  Help
                </Dialog.Title>
                <Dialog.Description className="mt-2" as="ul">
                  <li>
                    <b className="text-orange-500">Firefox</b> users can copy
                    and paste Edusoftweb&apos;s table directly into the input.
                  </li>
                  <li>
                    <b className="text-yellow-500">Chrome</b>/
                    <b className="text-blue-500">Edge</b> users can now 🎉 copy
                    and paste Edusoftweb&apos;s table directly into the input.
                  </li>

                  <li>
                    Step-by-step guide in{" "}
                    <Link href="/docs">
                      <a className="text-sky-600 transition-colors hover:text-sky-400">
                        docs here
                      </a>
                    </Link>
                    .
                  </li>
                </Dialog.Description>
                <div className="mt-4">
                  <Button
                    variant="slateInvert"
                    type="button"
                    onClick={() => setIsOpen(false)}
                  >
                    Close
                  </Button>
                </div>
              </article>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default HelpPrompt;
