import { createContext, useState } from "react";
import { CoursesMap, parseClassInput } from "../lib/classInput";
import { mergeMaps } from "../lib/utils";
import ClassInputForm from "./ClassInputForm";
import ErrorAlert from "./ErrorAlert";
import FilterTable from "./FilterTable";
import ScheduleTables from "./ScheduleTables";

export type InputHandler = (rawInputString: string) => void;

const colorPalette = {
  rose: "bg-rose-200",
  //   pink: "bg-pink-200",
  fuchsia: "bg-fuchsia-200",
  //   purple: "bg-purple-200",
  //   violet: "bg-violet-200",
  indigo: "bg-indigo-200",
  //   blue: "bg-blue-200",
  //   sky: "bg-sky-200",
  cyan: "bg-cyan-200",
  //   teal: "bg-teal-200",
  emerald: "bg-emerald-200",
  //   green: "bg-green-200",
  lime: "bg-lime-200",
  //   yellow: "bg-yellow-200",
  amber: "bg-amber-200",
  orange: "bg-orange-200",
  //   red: "bg-red-200",
};

const ColorPaletteContext = createContext(colorPalette);

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
    <ColorPaletteContext.Provider value={colorPalette}>
      <ClassInputForm inputHandler={inputHandler}></ClassInputForm>
      {errorMessage && <ErrorAlert message={errorMessage}></ErrorAlert>}
      <FilterTable
        coursesMap={coursesMap}
        setCoursesMap={setCoursesMap}
      ></FilterTable>
      <ScheduleTables coursesMap={coursesMap}></ScheduleTables>
    </ColorPaletteContext.Provider>
  );
};

export default IUGen;
