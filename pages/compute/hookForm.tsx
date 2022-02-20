import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Table from "../../components/scheduleTable/Table";
import { ClassesMap, CoursesMap, parseClassInput } from "../../lib/classInput";
import { generateSchedule } from "../../lib/schedule";

interface Inputs {
  copiedStr: string;
}

interface toggleActiveHandlerParams {
  courseKey: string;
  classKey: string;
  isChecked: boolean;
}

interface getClassListParams {
  courseKey: string;
  classesMap: ClassesMap;
  removeClassHandler: (courseKey: string, classKey: string) => void;
  toggleActiveHandler: ({
    courseKey,
    classKey,
    isChecked,
  }: toggleActiveHandlerParams) => void;
}

const HookForm: NextPage = () => {
  const { register, handleSubmit } = useForm<Inputs>();
  const [coursesMap, setCoursesMap] = useState<CoursesMap>(new Map());
  const [errorMessage, setErrorMessage] = useState<string>();

  // Todo Extract these states into components
  const [errorJSX, setErrorJSX] = useState<JSX.Element>();
  const [coursesList, setCoursesList] = useState<JSX.Element[]>();
  const [scheduleTables, setScheduleTables] = useState<JSX.Element[]>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const rawInputString = data.copiedStr;
    if (!rawInputString) return;
    setErrorMessage(undefined);

    try {
      const newCoursesMap = parseClassInput(rawInputString);
      setCoursesMap((prevCoursesMap) =>
        mergeMaps(prevCoursesMap, newCoursesMap)
      );
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      }
    }
  };

  const clearAllHandler = () => {
    setCoursesMap(new Map());
    setErrorMessage(undefined);
  };

  useEffect(() => {
    const schedules = generateSchedule(coursesMap);

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

    const toggleActiveHandler = ({
      courseKey,
      classKey,
      isChecked,
    }: toggleActiveHandlerParams) => {
      console.log("toggleActiveHandler");

      const classObject = coursesMap.get(courseKey)?.get(classKey);

      if (!classObject) {
        setErrorMessage(
          `Missing class in courseMap: courseKey = ${courseKey}; classKey = ${classKey}`
        );
        return;
      }

      classObject.isActive = isChecked;
      setCoursesMap((prevCoursesMap) => new Map(prevCoursesMap));
    };

    const tempCourseList: JSX.Element[] = [];
    coursesMap.forEach((classesMap, courseKey) => {
      const courseDetails = (
        <li key={courseKey}>
          <b>
            {courseKey}: {Array.from(classesMap.values())[0].courseName}
          </b>
          <ol className="list-decimal ml-6">
            {getClassList({
              courseKey,
              classesMap,
              removeClassHandler,
              toggleActiveHandler,
            })}
          </ol>
        </li>
      );
      tempCourseList.push(courseDetails);
    });

    setCoursesList(tempCourseList);
  }, [coursesMap]);

  useEffect(() => {
    setErrorJSX(<h2 className="bg-rose-200">{errorMessage}</h2>);
  }, [errorMessage]);

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
      {errorJSX}
      {scheduleTables}
    </main>
  );
};

function getClassList({
  classesMap,
  courseKey,
  removeClassHandler,
  toggleActiveHandler,
}: getClassListParams) {
  const tempClassList: JSX.Element[] = [];

  for (const [classKey, classObject] of classesMap.entries()) {
    tempClassList.push(
      <li key={classKey}>
        <input
          type="checkbox"
          name={classKey}
          id={classKey}
          checked={classObject.isActive}
          onClick={(event) => {
            toggleActiveHandler({
              courseKey,
              classKey,
              isChecked: event.currentTarget.checked,
            });
          }}
        />
        <label htmlFor={classKey}>
          {classObject.date
            .map(
              (date, index) =>
                `${date} - ${classObject.startPeriod[index]} - ${classObject.periodsCount[index]}`
            )
            .join(" | ")}
        </label>

        <button
          className="bg-rose-300 hover:bg-rose-200 rounded mx-4 mb-2 p-1"
          onClick={() => removeClassHandler(courseKey, classKey)}
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
