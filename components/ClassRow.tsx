import { TrashIcon } from "@heroicons/react/solid";
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
        <Cell className="text-center">{classObject.date[i]}</Cell>
        <Cell className="text-center">{classObject.startPeriod[i]}</Cell>
        <Cell className="text-center">{classObject.periodsCount[i]}</Cell>
        <Cell className="text-center">Dr.Cat :3</Cell>
      </Fragment>,
    ]);
  }

  return (
    <>
      <tr>
        <CheckBoxCell
          className="border-r border-slate-200"
          id={classObject.id}
          onClick={() => toggleClassStateHandler(classObject)}
          checked={classObject.isActive}
          rowSpan={classCount}
        ></CheckBoxCell>
        {classRows[0]}
        <DeleteCell
          className="border-l border-slate-200"
          onClick={() => deleteClassHandler(classObject)}
          rowSpan={classCount}
        >
          <TrashIcon className="h-6 w-6 transition-colors hover:text-slate-700"></TrashIcon>
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
