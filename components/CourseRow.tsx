import { TrashIcon } from "@heroicons/react/solid";
import { CourseObject } from "../lib/classInput";
import Cell from "./Cell";
import CheckBoxCell from "./CheckBoxCell";
import DeleteCell from "./DeleteCell";

interface CourseRowProps {
  courseObject: CourseObject;
  getCourseStateHandler: (courseObject: CourseObject) => boolean;
  toggleCourseStateHandler: (courseObject: CourseObject) => void;
  deleteCourseHandler: (courseObject: CourseObject) => void;
}

const CourseRow = ({
  courseObject,
  deleteCourseHandler,
  getCourseStateHandler,
  toggleCourseStateHandler,
}: CourseRowProps) => {
  return (
    <tr className="bg-sky-100">
      <CheckBoxCell
        id={courseObject.id}
        onClick={() => toggleCourseStateHandler(courseObject)}
        checked={getCourseStateHandler(courseObject)}
      ></CheckBoxCell>
      <Cell colSpan={4}>
        <div className="inline-flex items-center space-x-2 px-3">
          <div className={`h-5 w-5 rounded ${courseObject.color || ""}`}></div>
          <p className="font-semibold">{courseObject.name}</p>
        </div>
      </Cell>
      <DeleteCell onClick={() => deleteCourseHandler(courseObject)}>
        <TrashIcon className="h-6 w-6 transition-colors hover:text-slate-700"></TrashIcon>
      </DeleteCell>
    </tr>
  );
};

export default CourseRow;
