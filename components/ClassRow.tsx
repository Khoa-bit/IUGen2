import { TrashIcon } from "@heroicons/react/solid";
import { Fragment } from "react";
import { ClassObject } from "../lib/classInput";
import Cell from "./Cell";
import CheckBoxCell from "./CheckBoxCell";
import DeleteCell from "./DeleteCell";

interface ClassRowProps {
  order: number;
  classObject: ClassObject;
  toggleClassStateHandler: (classObject: ClassObject) => void;
  deleteClassHandler: (classObject: ClassObject) => void;
}

const ClassRow = ({
  order,
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
        <Cell className="text-center">{classObject.lecturer[i]}</Cell>
        <Cell className="text-center">{classObject.location[i]}</Cell>
      </Fragment>,
    ]);
  }

  return (
    <>
      <tr className="animate-in-out">
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
        <tr className="animate-in-out">
          <Cell className="hidden"></Cell>
          {classRows[1]}
          <Cell className="hidden"></Cell>
        </tr>
      )}
      <style jsx>{`
        tr {
          --order: ${order};
        }
      `}</style>
    </>
  );
};

export default ClassRow;
