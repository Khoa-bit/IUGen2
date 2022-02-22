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
      <Cell colSpan={4}>
        {courseObject.name} - {courseObject.color || ":3"}
      </Cell>
      <DeleteCell onClick={() => deleteCourseHandler(courseObject)}>
        Remove
      </DeleteCell>
    </tr>
  );
};

export default CourseRow;
