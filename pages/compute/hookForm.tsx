import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Table from "../../components/scheduleTable/Table";
import { parseClassInput } from "../../lib/classInput";
import { generateSchedule, _extractDates } from "../../lib/schedule";

interface Inputs {
  copiedStr: string;
}

const HookForm: NextPage = () => {
  const { register, handleSubmit } = useForm<Inputs>();
  const [scheduleTables, setScheduleTables] = useState<JSX.Element[]>([]);
  const [rawInputString, setRawInputString] = useState<string>();
  const [errorMessage, setErrorMessage] = useState<JSX.Element>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    setRawInputString(data.copiedStr);
  };

  useEffect(() => {
    if (!rawInputString) return;
    setErrorMessage(undefined);

    try {
      const coursesMap = parseClassInput(rawInputString);

      const courseKeys: string[] = Array.from(coursesMap.keys());

      const schedules = generateSchedule({
        coursesMap,
        courseKeys,
      });

      setScheduleTables(
        schedules.map((schedule) => (
          <Table
            coursesMap={coursesMap}
            schedule={schedule}
            key={JSON.stringify(schedule)}
          ></Table>
        ))
      );
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(<h2>{error.message}</h2>);
      }
    }
  }, [rawInputString]);

  return (
    <main>
      <h1 className="text-3xl font-bold"> React Hook Form </h1>
      <form
        className="flex flex-col w-1/3 mx-10"
        onSubmit={handleSubmit(onSubmit)}
      >
        <label htmlFor="copiedStr">Copy String</label>
        <input
          {...register("copiedStr", { required: true })}
          className="border-2 border-sky-800 mb-4"
          id="copiedStr"
          type="text"
        />
        <input className="border-2 bg-fuchsia-400" type="submit" />
      </form>
      <hr />
      {errorMessage}
      {scheduleTables}
    </main>
  );
};

export default HookForm;
