import { TrashIcon } from "@heroicons/react/24/solid";
import { nanoid } from "nanoid";
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

  let renderRows: JSX.Element[] = [];
  for (let i = 0; i < classCount; i++) {
    renderRows.push(
      <Fragment key={i}>
        <tr className="animate-in-out">
          {i == 0 ? (
            <CheckBoxCell
              className="border-r border-slate-200"
              id={classObject.id}
              onClick={() => toggleClassStateHandler(classObject)}
              checked={classObject.isActive}
              rowSpan={classCount}
            ></CheckBoxCell>
          ) : (
            <Cell className="hidden"></Cell>
          )}
          <Cell className="text-center">{classObject.date[i]}</Cell>
          <Cell className="text-center">{classObject.startPeriod[i]}</Cell>
          <Cell className="text-center">{classObject.periodsCount[i]}</Cell>
          <Cell className="text-center">{classObject.lecturer[i]}</Cell>
          <Cell className="text-center">{classObject.location[i]}</Cell>
          {i == 0 ? (
            <DeleteCell
              className="border-l border-slate-200"
              onClick={() => deleteClassHandler(classObject)}
              rowSpan={classCount}
              label="Delete this class"
            >
              <TrashIcon className="h-6 w-6 transition-colors hover:text-slate-700"></TrashIcon>
            </DeleteCell>
          ) : (
            <Cell className="hidden"></Cell>
          )}
        </tr>
        <style jsx>{`
          tr {
            --order: ${order + i};
          }
        `}</style>
      </Fragment>
    );
  }

  return <>{renderRows}</>;
};

export default ClassRow;
