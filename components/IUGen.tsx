import { useState } from "react";
import { CoursesMap, parseClassInput } from "../lib/classInput";
import { mergeMaps } from "../lib/utils";
import ClassInputForm from "./ClassInputForm";
import ErrorAlert from "./ErrorAlert";
import FilterTable from "./FilterTable";
import ScheduleTables from "./ScheduleTables";

export type InputHandler = (rawInputString: string) => void;

export const BG_COLOR_PALETTE = [
  "bg-rose-200",
  // "bg-pink-200",
  "bg-fuchsia-200",
  // "bg-purple-200",
  // "bg-violet-200",
  "bg-indigo-200",
  // "bg-blue-200",
  // "bg-sky-200",
  "bg-cyan-200",
  // "bg-teal-200",
  "bg-emerald-200",
  // "bg-green-200",
  "bg-lime-200",
  // "bg-yellow-200",
  "bg-amber-200",
  "bg-orange-200",
  // "bg-red-200",
];

const IUGen = () => {
  const [coursesMap, setCoursesMap] = useState<CoursesMap>(new Map());
  const [errorMessage, setErrorMessage] = useState<string>();

  const inputHandler: InputHandler = (rawInputString: string) => {
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

  return (
    <>
      <ClassInputForm inputHandler={inputHandler}></ClassInputForm>
      {errorMessage && <ErrorAlert message={errorMessage}></ErrorAlert>}
      <FilterTable
        coursesMap={coursesMap}
        setCoursesMap={setCoursesMap}
      ></FilterTable>
      <ScheduleTables coursesMap={coursesMap}></ScheduleTables>
    </>
  );
};

export default IUGen;
