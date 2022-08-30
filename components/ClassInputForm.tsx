import { SubmitHandler, useForm } from "react-hook-form";
import Button from "./Button";
import HelpPrompt from "./HelpPrompt";
import { InputHandler } from "../pages/index";
import BrowserRadioGroup from "./BrowserRadioGroup";
import { Browser } from "lib/utils";
import { Dispatch, SetStateAction, useState } from "react";

interface Inputs {
  rawInputString: string;
}

interface ClassInputFormProps {
  inputHandler: InputHandler;
  browser: Browser;
  setBrowser: Dispatch<SetStateAction<Browser>>;
}

const ClassInputForm = ({
  inputHandler,
  browser,
  setBrowser,
}: ClassInputFormProps) => {
  const { register, handleSubmit } = useForm<Inputs>();
  const [isInputFocus, setIsInputFocus] = useState<boolean>(false);

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    inputHandler(data.rawInputString);
  };

  return (
    <form
      className="grid w-full max-w-screen-lg 
      grid-cols-[minmax(0,1fr)_min-content] 
      items-center gap-2"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="col-span-2 flex space-x-5 sm:col-span-1">
        <label className="mr-auto font-semibold" htmlFor="rawInputString">
          Paste courses table here:
        </label>
        <BrowserRadioGroup
          browser={browser}
          setBrowser={setBrowser}
        ></BrowserRadioGroup>
        <HelpPrompt></HelpPrompt>
      </div>
      <input
        className="row-start-2 rounded border border-slate-300
        focus:border-sky-300 focus:ring focus:ring-sky-200 focus:ring-offset-2"
        type="text"
        id="rawInputString"
        onFocus={(event) => {
          const focusedElement = event.currentTarget;

          if (isInputFocus) return; //already focused, return so user can now place cursor at specific point in input.
          setIsInputFocus(true);
          setTimeout(function () {
            focusedElement.select();
          }, 100); //select all text in any field on focus for easy re-entry. Delay sightly to allow focus to "stick" before selecting.
        }}
        {...register("rawInputString", {
          required: true,
          onBlur: () => setIsInputFocus(false),
        })}
      />
      <Button
        className="row-start-2 ml-2 h-full w-fit shadow shadow-slate-300 md:ml-5"
        type="submit"
      >
        Add
      </Button>
    </form>
  );
};

export default ClassInputForm;
