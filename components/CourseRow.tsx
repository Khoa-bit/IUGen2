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
    <tr>
      <CheckBoxCell
        id={courseObject.id}
        onClick={() => toggleCourseStateHandler(courseObject)}
        checked={getCourseStateHandler(courseObject)}
      ></CheckBoxCell>
      <Cell className="border-collapse border border-slate-200" colSpan={4}>
        <div className="flex">
          <div className={"h-5 w-5 " + (courseObject.color || "")}></div>
          <p>{courseObject.name}</p>
        </div>
      </Cell>
      <DeleteCell onClick={() => deleteCourseHandler(courseObject)}>
        Remove
      </DeleteCell>
    </tr>
  );
};

export default CourseRow;
