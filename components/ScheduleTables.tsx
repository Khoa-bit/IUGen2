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
      //! TODO: nanoid or JSON?
      key={JSON.stringify(schedule)}
      coursesMap={coursesMap}
      schedule={schedule}
    ></ScheduleTable>
  ));
  return <section>{schedulesJSX}</section>;
};

export default ScheduleTables;
