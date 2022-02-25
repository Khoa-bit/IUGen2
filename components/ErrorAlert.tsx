import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";

interface ErrorAlertProps {
  message: string;
}

const ErrorAlert = ({ message }: ErrorAlertProps) => {
  let [isOpen, setIsOpen] = useState(true);

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
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
            <div
              className="my-8 inline-block w-full max-w-md transform 
            overflow-hidden rounded-2xl bg-white p-6 text-left align-middle 
            shadow-xl transition-all"
            >
              <Dialog.Title
                as="h3"
                className="text-lg font-medium leading-6 text-stone-900"
              >
                Input Error
              </Dialog.Title>
              <div className="mt-2">
                <p className="text-sm text-stone-500">{message}</p>
              </div>

              <div className="mt-4">
                <button
                  type="button"
                  className="inline-flex justify-center rounded-md border 
                  border-transparent bg-rose-100 px-4 py-2 text-sm font-medium 
                  text-rose-900 hover:bg-rose-200 focus:outline-none 
                  focus-visible:ring-2 focus-visible:ring-rose-500 
                  focus-visible:ring-offset-2"
                  onClick={() => setIsOpen(false)}
                >
                  Got it, thanks!
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ErrorAlert;
