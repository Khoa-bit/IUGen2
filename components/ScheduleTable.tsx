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
  const last_period = PERIODS_PER_DAY - 1;
  for (let period = 0; period < PERIODS_PER_DAY; period++) {
    const cellsProps: CellProps[] = [];

    // borderStyle solves 2 problems:
    // prevent borders from overlapping with classes card
    // prevent borders from overflowing outside of table for rounded corners
    let borderStyle = "border-slate-300";

    if (period != last_period) {
      borderStyle = "border-b " + borderStyle;
    }
    cellsProps.push({
      children: `${period + 1}`,
      className: `border-r ${borderStyle} text-center`,
    });
    for (let day = 0; day < DAY_PER_WEEK; day++) {
      if (day != 6) {
        borderStyle = "border-r " + borderStyle;
      }
      cellsProps.push({
        children: "",
        className: borderStyle,
      });
    }
    rowsProps.push(cellsProps);
  }

  for (const classID of schedule) {
    const courseObject = coursesMap.get(classID.courseKey);

    const classObject = courseObject?.classesMap.get(classID.classKey);

    if (!courseObject || !classObject)
      throw ReferenceError(
        `Invalid ClassObject reference: ${classID.courseKey} - ${classID.classKey}`
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
            bgColor: courseObject.color,
            className: "px-1.5",
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
    <table className="table-fixed overflow-hidden rounded shadow shadow-slate-300">
      <thead>
        <tr className="text-white">
          <Cell className="bg-indigo-400 py-1" useTH={true}></Cell>
          <Cell className="w-[13.66%] bg-indigo-400 py-1" useTH={true}>
            Mon
          </Cell>
          <Cell className="w-[13.66%] bg-indigo-400 py-1" useTH={true}>
            Tue
          </Cell>
          <Cell className="w-[13.66%] bg-indigo-400 py-1" useTH={true}>
            Wed
          </Cell>
          <Cell className="w-[13.66%] bg-indigo-400 py-1" useTH={true}>
            Thu
          </Cell>
          <Cell className="w-[13.66%] bg-indigo-400 py-1" useTH={true}>
            Fri
          </Cell>
          <Cell className="w-[13.66%] bg-indigo-400 py-1" useTH={true}>
            Sat
          </Cell>
          <Cell className="w-[13.66%] bg-indigo-400 py-1" useTH={true}>
            Sun
          </Cell>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
};

export default ScheduleTable;
