import { Fragment } from "react";
import { ClassObject } from "../lib/classInput";
import Cell from "./Cell";
import CheckBoxCell from "./CheckBoxCell";
import DeleteCell from "./DeleteCell";

interface ClassRowProps {
  classObject: ClassObject;
  toggleClassStateHandler: (classObject: ClassObject) => void;
  deleteClassHandler: (classObject: ClassObject) => void;
}

const ClassRow = ({
  classObject,
  deleteClassHandler,
  toggleClassStateHandler,
}: ClassRowProps) => {
  const classCount = classObject.date.length;
  const classRows: JSX.Element[][] = [];
  for (let i = 0; i < classCount; i++) {
    classRows.push([
      <Fragment key={i}>
        <Cell>{classObject.date[i]}</Cell>
        <Cell>{classObject.startPeriod[i]}</Cell>
        <Cell>{classObject.periodsCount[i]}</Cell>
        <Cell>Dr.Cat :3</Cell>
      </Fragment>,
    ]);
  }

  return (
    <>
      <tr>
        <CheckBoxCell
          id={classObject.id}
          onClick={() => toggleClassStateHandler(classObject)}
          checked={classObject.isActive}
          rowSpan={classCount}
        ></CheckBoxCell>
        {classRows[0]}
        <DeleteCell
          onClick={() => deleteClassHandler(classObject)}
          rowSpan={classCount}
        >
          Remove
        </DeleteCell>
      </tr>
      {classCount == 2 && (
        <tr>
          <Cell hidden={true}></Cell>
          {classRows[1]}
          <Cell hidden={true}></Cell>
        </tr>
      )}
    </>
  );
};

export default ClassRow;
