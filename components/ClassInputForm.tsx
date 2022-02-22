import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import Button from "./Button";
import { InputHandler } from "./IUGen";

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
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="rawInputString">Copy classes here:</label>
      <a className="text-indigo-700" href="#">
        Help
      </a>
      <a
        className="text-indigo-700"
        href="https://docs.google.com/spreadsheets/create?usp=sheets_home&ths=true"
        target="_blank"
        rel="noreferrer"
      >
        New Sheet
      </a>
      <input
        type="text"
        id="rawInputString"
        {...register("rawInputString", { required: true })}
      />
      <Button text="Add" type="submit"></Button>
    </form>
  );
};

export default ClassInputForm;
