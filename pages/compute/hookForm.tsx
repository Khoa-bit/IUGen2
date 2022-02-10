import type { NextPage } from "next";
import { SubmitHandler, useForm } from "react-hook-form";
import { parseClassInput } from "../../lib/classInput";

interface Inputs {
  copiedStr: string;
}

const HookForm: NextPage = () => {
  const { register, handleSubmit } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(parseClassInput(data.copiedStr));
  };

  return (
    <>
      <h1 className="text-3xl font-bold"> React Hook Form </h1>
      <form
        className="flex flex-col w-1/3 mx-10"
        onSubmit={handleSubmit(onSubmit)}
      >
        <label htmlFor="copiedStr">Date</label>
        <textarea
          {...register("copiedStr", { required: true })}
          className="border-2 border-sky-800 mb-4"
          id="copiedStr"
        />
        <input className="border-2 bg-fuchsia-400" type="submit" />
      </form>
    </>
  );
};

export default HookForm;
