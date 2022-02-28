import { SubmitHandler, useForm } from "react-hook-form";
import Button from "./Button";
import HelpPrompt from "./HelpPrompt";
import { InputHandler } from "../pages/index";
import SheetFormPrompt from "./SheetFormPrompt";

interface Inputs {
  rawInputString: string;
}

interface ClassInputFormProps {
  inputHandler: InputHandler;
}

const ClassInputForm = ({ inputHandler }: ClassInputFormProps) => {
  const { register, handleSubmit } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    inputHandler(data.rawInputString);
  };

  return (
    <form
      className="grid w-full max-w-screen-lg grid-cols-[minmax(0,1fr)_minmax(0,1fr)_min-content] items-center gap-2"
      onSubmit={handleSubmit(onSubmit)}
    >
      <label className="font-semibold" htmlFor="rawInputString">
        Copy class table here:
      </label>
      <div className="flex space-x-5 justify-self-end">
        <SheetFormPrompt></SheetFormPrompt>
        <HelpPrompt></HelpPrompt>
      </div>
      <input
        className="col-span-2 rounded border border-slate-300
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
