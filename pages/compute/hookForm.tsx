import type { NextPage } from "next";
import { SubmitHandler, useForm } from "react-hook-form";
import { string } from "prop-types";

interface Inputs {
  course_id: string;
  class_id: number;
  date: string;
  start: string;
  count: string;
}

export interface ClassObject {
  courseID: string;
  courseName: string;
  hasLab: boolean;
  date: string[];
  startPeriod: number[];
  periodsCount: number[];
}

export function toClassObject(classStrArray: string[]) {
  const courseID = classStrArray[0].trim();
  const courseName = classStrArray[2].trim();
  const hasLab = !!classStrArray[4];
  const date = classStrArray[11].trim().split(/\s+/);
  const startPeriod = classStrArray[12]
    .trim()
    .split(/\s+/)
    .map((strValue) => parseInt(strValue));
  const periodsCount = classStrArray[13]
    .trim()
    .split(/\s+/)
    .map((strValue) => parseInt(strValue));

  return {
    courseID,
    courseName,
    hasLab,
    date,
    startPeriod,
    periodsCount,
  } as ClassObject;
}

export function mapCourses(rawData: string[]) {
  let coursesMap: Map<string, string[][]> = new Map();

  for (let i = 0; i < rawData.length; i += 17) {
    let tempClass = rawData.slice(i, i + 17);

    let classKey = tempClass[0].trim();
    let classValue = coursesMap.get(classKey);
    if (classValue) {
      coursesMap.set(classKey, [...classValue, tempClass]);
    } else {
      coursesMap.set(classKey, [tempClass]);
    }
  }

  return coursesMap;
}

const HookForm: NextPage = () => {
  const { register, handleSubmit } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    let rawData = data.date.split("\t");

    let coursesMap = mapCourses(rawData);

    console.log(coursesMap);
  };

  return (
    <>
      <h1 className="text-3xl font-bold"> React Hook Form </h1>
      <form
        className="flex flex-col w-1/3 mx-10"
        onSubmit={handleSubmit(onSubmit)}
      >
        <label htmlFor="course_id">Course ID</label>
        <input
          {...register("course_id", { required: true })}
          className="border-2 border-sky-800 mb-4"
          id="course_id"
          type="text"
        />{" "}
        <label htmlFor="class_id">Class ID</label>
        <input
          {...register("class_id", { required: true })}
          className="border-2 border-sky-800 mb-4"
          id="class_id"
          type="text"
        />
        <label htmlFor="date">Date</label>
        <input
          {...register("date", { required: true })}
          className="border-2 border-sky-800 mb-4"
          id="date"
          type="text"
        />
        <label htmlFor="start">Start</label>
        <input
          {...register("start", { required: true })}
          className="border-2 border-sky-800 mb-4"
          id="start"
          type="text"
        />
        <label htmlFor="count ">Count</label>
        <input
          {...register("count", { required: true })}
          className="border-2 border-sky-800 mb-4"
          id="count  "
          type="text"
        />
        <input className="border-2 bg-fuchsia-400" type="submit" />
      </form>
    </>
  );
};

export default HookForm;
