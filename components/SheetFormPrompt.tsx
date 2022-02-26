import { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { TableIcon } from "@heroicons/react/solid";
import { SubmitHandler, useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

interface Inputs {
  sheetURL: string;
}

const SheetFormPrompt = () => {
  const [isOpen, setIsOpen] = useState(false);
  const {
    register,
    formState: { errors },
    watch,
    trigger,
  } = useForm<Inputs>();

  let savedURL = "";
  if (typeof window !== "undefined") {
    savedURL = localStorage.getItem("sheetURL") || "";
  }

  return (
    <>
      <button
        type="button"
        className="text-emerald-700 transition-colors hover:text-emerald-600"
        title="New Google Sheet"
        onClick={() => setIsOpen(true)}
      >
        <TableIcon className="h-6 w-6"></TableIcon>
      </button>
      <Transition show={isOpen} as={Fragment}>
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
              <Dialog.Overlay className="fixed inset-0 bg-emerald-300/50" />
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
              <form
                className="my-8 inline-block w-full max-w-md transform 
            overflow-hidden rounded-2xl bg-white p-6 text-left align-middle 
            shadow-xl transition-all"
              >
                <Dialog.Title
                  as="label"
                  htmlFor="sheetURL"
                  className="text-lg font-medium leading-6 text-slate-900"
                >
                  Your saved sheet
                </Dialog.Title>
                <Dialog.Description className="mt-2">
                  <input
                    type="text"
                    id="sheetURL"
                    defaultValue={savedURL}
                    {...register("sheetURL", {
                      pattern: {
                        value:
                          /^$|(https:\/\/docs\.google\.com\/spreadsheets\/d)/,
                        message: "Invalid Google Sheet URL",
                      },
                      onBlur: (e) => {
                        trigger().then(
                          (isValid) =>
                            isValid &&
                            localStorage.setItem(
                              "sheetURL",
                              e.target.value.trim()
                            )
                        );
                      },
                    })}
                  />
                  <ErrorMessage
                    errors={errors}
                    name="sheetURL"
                    render={({ message }) => (
                      <p className="text-rose-500">{message}</p>
                    )}
                  />
                  <a
                    href={watch("sheetURL")}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Open Link
                  </a>
                </Dialog.Description>
                <div className="mt-4">
                  <a
                    className="inline-flex justify-center rounded-md border 
                  border-transparent bg-emerald-100 px-4 py-2 text-sm font-medium 
                  text-emerald-900 hover:bg-emerald-200 focus:outline-none 
                  focus-visible:ring-2 focus-visible:ring-emerald-500 
                  focus-visible:ring-offset-2"
                    href="https://docs.google.com/spreadsheets/create?usp=sheets_home&ths=true"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    New Sheet
                  </a>
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border 
                  border-transparent bg-rose-100 px-4 py-2 text-sm font-medium 
                  text-rose-900 hover:bg-rose-200 focus:outline-none 
                  focus-visible:ring-2 focus-visible:ring-rose-500 
                  focus-visible:ring-offset-2"
                    onClick={() => setIsOpen(false)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default SheetFormPrompt;
