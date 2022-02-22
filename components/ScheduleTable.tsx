import { CoursesMap } from "../lib/classInput";
import { PERIODS_PER_DAY, Schedule, _extractDates } from "../lib/schedule";
import Cell, { CellProps } from "./Cell";
import Row from "./Row";

interface ScheduleTableProps {
  coursesMap: CoursesMap;
  schedule: Schedule;
}

const ScheduleTable = ({ coursesMap, schedule }: ScheduleTableProps) => {
  const rowsProps: CellProps[][] = [];

  const DAY_PER_WEEK = 7;
  for (let period = 0; period < PERIODS_PER_DAY; period++) {
    const cellsProps: CellProps[] = [];
    cellsProps.push({ children: `${period + 1}` });
    for (let day = 0; day < DAY_PER_WEEK; day++) {
      cellsProps.push({ children: "" });
    }
    rowsProps.push(cellsProps);
  }

  // console.log(schedule);
  for (const classID of schedule) {
    // console.log(classID);

    const classObject = coursesMap
      .get(classID.courseKey)
      ?.classesMap.get(classID.classKey);

    if (!classObject)
      throw ReferenceError(
        `Invalid ClassObject reference: ${JSON.stringify(classID)}`
      );

    const { courseName, startPeriod, periodsCount } = classObject;
    const dates = _extractDates(classObject);

    dates.forEach((date, index) => {
      for (let row = 0; row < periodsCount[index]; row++) {
        const oldCellProps = rowsProps[startPeriod[index] - 1 + row][date + 1];
        let newCellProps: CellProps;
        if (row == 0) {
          newCellProps = {
            children: courseName,
            rowSpan: periodsCount[index],
          };
        } else {
          newCellProps = {
            ...oldCellProps,
            hidden: true,
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
          <Cell className="bg-indigo-400 px-10 py-1" useTH={true}></Cell>
          <Cell className="bg-indigo-400 px-10 py-1" useTH={true}>
            Mon
          </Cell>
          <Cell className="bg-indigo-400 px-10 py-1" useTH={true}>
            Tue
          </Cell>
          <Cell className="bg-indigo-400 px-10 py-1" useTH={true}>
            Wed
          </Cell>
          <Cell className="bg-indigo-400 px-10 py-1" useTH={true}>
            Thu
          </Cell>
          <Cell className="bg-indigo-400 px-10 py-1" useTH={true}>
            Fri
          </Cell>
          <Cell className="bg-indigo-400 px-10 py-1" useTH={true}>
            Sat
          </Cell>
          <Cell className="bg-indigo-400 px-10 py-1" useTH={true}>
            Sun
          </Cell>
        </tr>
        {rows}
      </tbody>
    </table>
  );
};

export default ScheduleTable;
