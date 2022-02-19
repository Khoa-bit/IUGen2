import { CoursesMap } from "../../lib/classInput";
import { ClassID, PERIODS_PER_DAY, _extractDates } from "../../lib/schedule";
import { CellProps } from "./Cell";
import Row from "./Row";

interface TableProps {
  coursesMap: CoursesMap;
  schedule: ClassID[];
}

const Table = ({ coursesMap, schedule }: TableProps) => {
  const rowsProps: CellProps[][] = [];

  const DAY_PER_WEEK = 7;
  for (let period = 0; period < PERIODS_PER_DAY; period++) {
    const cellsProps: CellProps[] = [];
    cellsProps.push({ content: `${period + 1}` });
    for (let day = 0; day < DAY_PER_WEEK; day++) {
      cellsProps.push({ content: "" });
    }
    rowsProps.push(cellsProps);
  }

  for (const classID of schedule) {
    const classObject = coursesMap
      .get(classID.courseKey)
      ?.get(classID.classKey);

    if (!classObject)
      throw ReferenceError(`Invalid ClassObject reference: ${classID}`);

    const { courseName, startPeriod, periodsCount } = classObject;
    const dates = _extractDates(classObject);

    dates.forEach((date, index) => {
      for (let row = 0; row < periodsCount[index]; row++) {
        const oldCellProps = rowsProps[startPeriod[index] - 1 + row][date + 1];
        let newCellProps: CellProps;
        if (row == 0) {
          newCellProps = {
            content: courseName,
            rowSpan: periodsCount[index],
          };
        } else {
          newCellProps = {
            ...oldCellProps,
            isHidden: true,
          };
        }
        rowsProps[startPeriod[index] - 1 + row][date + 1] = newCellProps;
      }
    });
  }

  const rows = rowsProps.map((cellsProps, index) => (
    <Row cellsProps={cellsProps} key={index}></Row>
  ));

  return (
    <table className="table-auto border-collapse border border-slate-500">
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
