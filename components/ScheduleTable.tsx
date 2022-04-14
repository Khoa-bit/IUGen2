import { CoursesMap } from "../lib/classInput";
import { PERIODS_PER_DAY, Schedule, _extractDates } from "../lib/schedule";
import Cell, { CellProps } from "./Cell";
import Row from "./Row";

interface ScheduleTableProps {
  coursesMap: CoursesMap;
  schedule: Schedule;
}

const ScheduleTable = ({ coursesMap, schedule }: ScheduleTableProps) => {
  const rowsProps: CellProps[][] = initTable();

  populateSchedule(schedule, coursesMap, rowsProps);

  const rows = rowsProps.map((cellsProps, index) => (
    <Row cellsProps={cellsProps} key={index}></Row>
  ));

  return (
    <div className="overflow-x-auto rounded shadow shadow-slate-300 last:even:xl:col-span-2 last:even:xl:mx-auto last:even:xl:max-w-screen-lg">
      <table className="w-full min-w-[50rem] table-fixed bg-white">
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
    </div>
  );
};

function populateSchedule(
  schedule: Schedule,
  coursesMap: CoursesMap,
  rowsProps: CellProps[][]
) {
  for (const classID of schedule) {
    const courseObject = coursesMap.get(classID.courseKey);

    const classObject = courseObject?.classesMap.get(classID.classKey);

    if (!courseObject || !classObject)
      throw ReferenceError(
        `Invalid ClassObject reference: ${classID.courseKey} - ${classID.classKey}`
      );

    const { courseName, startPeriod, periodsCount, location, lecturer } =
      classObject;
    const dates = _extractDates(classObject);

    dates.forEach((date, index) => {
      for (let row = 0; row < periodsCount[index]; row++) {
        const oldCellProps = rowsProps[startPeriod[index] - 1 + row][date + 1];
        let newCellProps: CellProps;
        if (row == 0) {
          const cellContent = (
            <div className="flex flex-col gap-2">
              <p className="text-sm font-bold">{courseName}</p>
              <p className="text-xs">
                {lecturer[index]}
                <br />
                {location[index]}
              </p>
            </div>
          );
          newCellProps = {
            children: cellContent,
            className: `px-1.5 ${courseObject.color}`,
            rowSpan: periodsCount[index],
          };
        } else {
          newCellProps = {
            ...oldCellProps,
            className: "hidden",
          };
        }
        rowsProps[startPeriod[index] - 1 + row][date + 1] = newCellProps;
      }
    });
  }
}

function initTable() {
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
      borderStyle = (period == 5 ? "border-b-4 " : "border-b ") + borderStyle;
    }

    // Periods Column
    const periodStart =
      480 +
      50 * period +
      (period >= 3 ? 5 : 0) +
      (period >= 6 ? 10 : 0) +
      (period >= 9 ? 5 : 0);
    const periodEnd = periodStart + 50;
    const periodChild = (
      <p>
        {period + 1}
        <span
          className="absolute top-1 left-10 hidden whitespace-nowrap rounded 
        bg-indigo-900/80 p-1 text-white shadow shadow-indigo-500 group-hover:block"
        >
          {Math.floor(periodStart / 60)}h
          {(periodStart % 60).toLocaleString("en", { minimumIntegerDigits: 2 })}{" "}
          - {Math.floor(periodEnd / 60)}h
          {(periodEnd % 60).toLocaleString("en", { minimumIntegerDigits: 2 })}
        </span>
      </p>
    );
    cellsProps.push({
      children: periodChild,
      className: `border-r ${borderStyle} text-center group relative`,
    });

    // Empty 7 empty columns
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
  return rowsProps;
}

export default ScheduleTable;
