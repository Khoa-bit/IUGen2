import { Dispatch, SetStateAction } from "react";
import { ClassObject, CourseObject, CoursesMap } from "../lib/classInput";
import {
  deleteClass,
  deleteCourse,
  getAllState,
  getCourseState,
  toggleAllState,
  toggleClassState,
  toggleCourseState,
} from "../lib/schedule";
import ClassRow from "./ClassRow";
import CourseRow from "./CourseRow";
import FilterHeader from "./FilterHeader";

interface FilterTableProps {
  coursesMap: CoursesMap;
  setCoursesMap: Dispatch<SetStateAction<CoursesMap>>;
}

const FilterTable = ({ coursesMap, setCoursesMap }: FilterTableProps) => {
  // All Handlers - getState, toggle, delete
  const getAllStateHandler = () => {
    return getAllState(coursesMap);
  };

  const toggleAllStateHandler = () => {
    const newCoursesMap = new Map(coursesMap);
    toggleAllState(newCoursesMap);
    setCoursesMap(newCoursesMap);
  };

  const deleteAllHandler = () => {
    setCoursesMap(new Map());
  };

  // Course Handlers - getState, toggle, delete
  const getCourseStateHandler = (courseObject: CourseObject) => {
    return getCourseState(courseObject);
  };

  const toggleCourseStateHandler = (courseObject: CourseObject) => {
    const newCoursesMap = new Map(coursesMap);
    toggleCourseState(newCoursesMap, courseObject);
    setCoursesMap(newCoursesMap);
  };

  const deleteCourseHandler = (courseObject: CourseObject) => {
    const newCoursesMap = new Map(coursesMap);
    deleteCourse(newCoursesMap, courseObject);
    setCoursesMap(newCoursesMap);
  };

  // Class Handlers - toggle, delete
  const toggleClassStateHandler = (classObject: ClassObject) => {
    const newCoursesMap = new Map(coursesMap);
    toggleClassState(newCoursesMap, classObject);
    setCoursesMap(newCoursesMap);
  };

  const deleteClassHandler = (classObject: ClassObject) => {
    const newCoursesMap = new Map(coursesMap);
    deleteClass(newCoursesMap, classObject);
    setCoursesMap(newCoursesMap);
  };

  const rows: JSX.Element[] = [];

  for (const [courseKey, courseObject] of coursesMap) {
    let order = 0;
    const courseRow = (
      <CourseRow
        order={order++}
        key={courseKey}
        courseObject={courseObject}
        getCourseStateHandler={getCourseStateHandler}
        toggleCourseStateHandler={toggleCourseStateHandler}
        deleteCourseHandler={deleteCourseHandler}
      ></CourseRow>
    );
    rows.push(courseRow);
    for (const [classKey, classObject] of courseObject.classesMap) {
      const classRow = (
        <ClassRow
          order={order++}
          key={classKey}
          classObject={classObject}
          toggleClassStateHandler={toggleClassStateHandler}
          deleteClassHandler={deleteClassHandler}
        ></ClassRow>
      );
      rows.push(classRow);
    }
  }

  return (
    <div className="overflow-x-auto overflow-y-hidden rounded shadow shadow-slate-300">
      <table className="w-full min-w-[50rem] table-fixed bg-white">
        <thead>
          <FilterHeader
            getAllStateHandler={getAllStateHandler}
            toggleAllStateHandler={toggleAllStateHandler}
            deleteAllHandler={deleteAllHandler}
          ></FilterHeader>
        </thead>
        <tbody className="divide-y divide-slate-200">{rows}</tbody>
      </table>
    </div>
  );
};

export default FilterTable;
