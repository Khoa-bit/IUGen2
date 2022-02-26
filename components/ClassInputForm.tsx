import { QuestionMarkCircleIcon } from "@heroicons/react/solid";
import { SubmitHandler, useForm } from "react-hook-form";
import Button from "./Button";
import { InputHandler } from "./IUGen";
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
      className="grid scroll-mt-2 grid-cols-[minmax(0,1fr)_minmax(0,1fr)_min-content] items-center gap-2"
      onSubmit={handleSubmit(onSubmit)}
    >
      <label className="font-semibold" htmlFor="rawInputString">
        Copy classes here:
      </label>
      <div className="flex space-x-5 justify-self-end">
        <SheetFormPrompt></SheetFormPrompt>
        <a
          className="text-indigo-700 transition-colors hover:text-indigo-600"
          href="#"
          title="Help"
        >
          <QuestionMarkCircleIcon className="h-6 w-6"></QuestionMarkCircleIcon>
        </a>
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
