import { Dialog, Transition } from "@headlessui/react";
import Link from "next/link";
import { Fragment, useEffect, useState } from "react";
import Button from "./Button";

const NewUserPrompt = () => {
  let [isOpen, setIsOpen] = useState<boolean>(false);
  useEffect(() => {
    isUserNew();
  }, []);

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto selection:bg-sky-300 selection:text-sky-900"
        onClose={() => {
          setIsOpen(false);
          setUserOld();
        }}
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
            <div
              className="prose my-8 inline-block w-full max-w-md 
            transform overflow-hidden rounded-2xl bg-white p-6 text-left 
            align-middle shadow-xl transition-all"
            >
              <Dialog.Title
                as="h3"
                className="text-lg font-medium leading-6 text-slate-900"
              >
                Welcome new IUer!
              </Dialog.Title>
              <Dialog.Description className="mt-2">
                <ul>
                  <li>
                    As you are new to IUGen App, You should take a look at our
                    official documentation to get you up and running with IUGen
                    quickly.
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
                </ul>
              </Dialog.Description>
              <div className="mt-4">
                <Button
                  variant="slateInvert"
                  type="button"
                  onClick={() => {
                    setIsOpen(false);
                    setUserOld();
                  }}
                >
                  Close
                </Button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

const key = "isNew";

function isUserNew() {
  if (typeof window !== "undefined") {
    return !window.localStorage.getItem(key);
  }
  return true;
}

function setUserOld() {
  if (typeof window !== "undefined") {
    window.localStorage.setItem(key, "false");
  }
  return true;
}

export default NewUserPrompt;
