import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Table from "../../components/scheduleTable/Table";
import { ClassObject, CoursesMap, parseClassInput } from "../../lib/classInput";
import { generateSchedule } from "../../lib/schedule";

interface Inputs {
  copiedStr: string;
}

const HookForm: NextPage = () => {
  const { register, handleSubmit } = useForm<Inputs>();
  const [coursesMap, setCoursesMap] = useState<CoursesMap>(new Map());

  const [errorMessage, setErrorMessage] = useState<JSX.Element>();
  const [coursesList, setCoursesList] = useState<JSX.Element[]>();
  const [scheduleTables, setScheduleTables] = useState<JSX.Element[]>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const rawInputString = data.copiedStr;
    if (!rawInputString) return;
    setErrorMessage(undefined);

    try {
      const newCoursesMap = parseClassInput(rawInputString);
      setCoursesMap((coursesMap) => mergeMaps(coursesMap, newCoursesMap));
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(<h2>{error.message}</h2>);
      }
    }
  };

  const clearAllHandler = () => {
    setCoursesMap(new Map());
  };

  useEffect(() => {
    console.log(coursesMap);

    let schedules;
    try {
      schedules = generateSchedule(coursesMap);
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(<h2>{error.message}</h2>);
      }
      return;
    }

    setScheduleTables(
      schedules.map((schedule) => (
        <Table
          coursesMap={coursesMap}
          schedule={schedule}
          key={JSON.stringify(schedule)}
        ></Table>
      ))
    );

    const removeClassHandler = (courseKey: string, classKey: string) => {
      coursesMap.get(courseKey)?.delete(classKey);
      if (coursesMap.get(courseKey)?.size == 0) coursesMap.delete(courseKey);
      setCoursesMap(new Map(coursesMap));
    };

    const tempCourseList: JSX.Element[] = [];
    coursesMap.forEach((classesMap, courseKey) => {
      const courseDetails = (
        <li key={courseKey}>
          {courseKey}:
          <ol className="list-decimal ml-6">
            {getClassList(courseKey, classesMap, removeClassHandler)}
          </ol>
        </li>
      );
      tempCourseList.push(courseDetails);
    });

    setCoursesList(tempCourseList);
  }, [coursesMap]);

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
        <input
          className="bg-fuchsia-400 hover:bg-fuchsia-300 rounded p-1 mb-2"
          type="submit"
        />
        <button
          className="bg-rose-400 hover:bg-rose-300 rounded p-1 mb-2"
          onClick={clearAllHandler}
          type="button"
        >
          Clear All
        </button>
      </form>
      <hr />
      <ol className="list-disc ml-6">{coursesList}</ol>
      <hr />
      {errorMessage}
      {scheduleTables}
    </main>
  );
};

function getClassList(
  courseKey: string,
  classesMap: Map<string, ClassObject>,
  removeClassHandler: (courseKey: string, classKey: string) => void
) {
  const tempClassList: JSX.Element[] = [];

  for (const classObject of classesMap.values()) {
    tempClassList.push(
      <li key={classObject.id}>
        {classObject.date
          .map(
            (date, index) =>
              `${date} - ${classObject.startPeriod[index]} - ${classObject.periodsCount[index]}`
          )
          .join(" | ")}
        <button
          className="bg-rose-300 hover:bg-rose-200 rounded mx-4 mb-2 p-1"
          onClick={() => removeClassHandler(courseKey, classObject.id)}
        >
          Remove
        </button>
      </li>
    );
  }

  return tempClassList;
}

export function mergeMaps(...iterables: Map<any, any>[]) {
  const map = new Map();
  for (const iterable of iterables) {
    for (const item of iterable) {
      map.set(...item);
    }
  }
  return map;
}

export default HookForm;
