import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Button from "./Button";
import Link from "next/link";

interface ErrorAlertProps {
  message?: string;
}

const ErrorAlert = ({ message }: ErrorAlertProps) => {
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    setIsOpen(message != undefined);
  }, [message]);

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto
        selection:bg-sky-300 selection:text-sky-900"
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
            <Dialog.Overlay className="fixed inset-0 bg-stone-400/50" />
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
              className="prose my-8 inline-block w-full max-w-md transform 
            overflow-hidden rounded-2xl bg-white p-6 text-left align-middle 
            shadow-xl transition-all"
            >
              <Dialog.Title
                as="h3"
                className="text-lg font-medium leading-6 text-stone-900"
              >
                Input Error
              </Dialog.Title>
              <Dialog.Description className="mt-2" as="ul">
                <li className="text-sm text-stone-500">{message}</li>
                <li>
                  Still having trouble? Take a look at IUGen step-by-step guide
                  in{" "}
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
                  variant="roseInvert"
                  type="button"
                  onClick={() => setIsOpen(false)}
                >
                  Got it, thanks!
                </Button>
              </div>
            </article>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ErrorAlert;
