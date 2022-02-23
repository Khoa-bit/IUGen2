import { nanoid } from "nanoid";
import { CoursesMap } from "../lib/classInput";
import { generateSchedule } from "../lib/schedule";
import ScheduleTable from "./ScheduleTable";

interface ScheduleTablesProps {
  coursesMap: CoursesMap;
}

const ScheduleTables = ({ coursesMap }: ScheduleTablesProps) => {
  const schedules = generateSchedule(coursesMap);
  const schedulesJSX = schedules.map((schedule) => (
    <ScheduleTable
      key={nanoid()}
      coursesMap={coursesMap}
      schedule={schedule}
    ></ScheduleTable>
  ));
  return <section className="flex flex-col gap-8">{schedulesJSX}</section>;
};

export default ScheduleTables;
