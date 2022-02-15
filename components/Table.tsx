import { useEffect, useRef } from "react";
import { CoursesMap } from "../lib/classInput";
import { ClassID, _extractDates } from "../lib/schedule";
import Row from "./scheduleTable/Row";

interface TableProps {
  coursesMap: CoursesMap;
  schedule: ClassID[];
}

const Table = ({ coursesMap, schedule }: TableProps) => {
  const tableRef = useRef<HTMLTableElement>(null);
  const rows: JSX.Element[] = [];
  for (let i = 0; i < 16; i++) {
    rows.push(<Row cellCount={8} rowHeader={(i + 1).toString()} key={i} />);
  }

  useEffect(() => {
    if (!tableRef.current) throw Error("tableRef is not assigned");
    const tableElement = tableRef.current;

    const deleteCells = [];

    for (const classID of schedule) {
      const classObject = coursesMap
        .get(classID.courseKey)
        ?.at(classID.classIndex);

      if (!classObject)
        throw ReferenceError(`Invalid ClassObject reference: ${classID}`);

      const { courseName, startPeriod, periodsCount } = classObject;
      const dates = _extractDates(classObject);

      let index = 0;
      for (const date of dates) {
        const tableCell = tableElement.rows[startPeriod[index]].cells[date + 1];
        tableCell.textContent = courseName;
        tableCell.rowSpan = periodsCount[index];

        for (let row = 1; row < periodsCount[index]; row++) {
          deleteCells.push(
            tableElement.rows[startPeriod[index] + row].cells[date + 1]
          );
        }
        index += 1;
      }
    }

    deleteCells.forEach((cell) => {
      cell.remove();
    });
  });

  return (
    <table
      ref={tableRef}
      className="table-auto border-collapse border border-slate-500"
    >
      <tbody>
        <tr>
          <th className="border border-slate-600 bg-slate-400 px-10 py-1">
            No.
          </th>
          <th className="border border-slate-600 bg-slate-400 px-10 py-1">
            Mon
          </th>
          <th className="border border-slate-600 bg-slate-400 px-10 py-1">
            Tue
          </th>
          <th className="border border-slate-600 bg-slate-400 px-10 py-1">
            Wed
          </th>
          <th className="border border-slate-600 bg-slate-400 px-10 py-1">
            Thu
          </th>
          <th className="border border-slate-600 bg-slate-400 px-10 py-1">
            Fri
          </th>
          <th className="border border-slate-600 bg-slate-400 px-10 py-1">
            Sat
          </th>
          <th className="border border-slate-600 bg-slate-400 px-10 py-1">
            Sun
          </th>
        </tr>
        {rows}
      </tbody>
    </table>
  );
};

export default Table;
