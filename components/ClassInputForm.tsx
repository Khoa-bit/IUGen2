import { SubmitHandler, useForm } from "react-hook-form";
import Button from "./Button";
import HelpPrompt from "./HelpPrompt";
import { InputHandler } from "../pages/index";
import BrowserRadioGroup from "./BrowserRadioGroup";
import { Browser } from "lib/utils";
import { Dispatch, SetStateAction } from "react";

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
      <div className="flex space-x-5">
        <label className="mr-auto font-semibold" htmlFor="rawInputString">
          Paste courses table here:
        </label>
        <div className="flex space-x-1.5">
          <BrowserRadioGroup
            browser={browser}
            setBrowser={setBrowser}
          ></BrowserRadioGroup>
        </div>
        <HelpPrompt></HelpPrompt>
      </div>
      <div></div>
      <input
        className="rounded border border-slate-300
        focus:border-sky-300 focus:ring focus:ring-sky-200 focus:ring-offset-2"
        type="text"
        id="rawInputString"
        {...register("rawInputString", { required: true })}
      />
      <Button
        className="ml-2 h-full w-fit shadow shadow-slate-300 md:ml-5"
        type="submit"
      >
        Add
      </Button>
    </form>
  );
};

export default ClassInputForm;
