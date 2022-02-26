import { CogIcon } from "@heroicons/react/solid";
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

  return (
    <section className="flex flex-col gap-8">
      <header
        className={`flex items-center gap-2 rounded 
        py-2 px-3 text-white shadow ${
          schedules.length
            ? "bg-emerald-400 shadow-emerald-300"
            : "bg-stone-400 shadow-stone-300"
        }`}
      >
        <CogIcon className="h-5 shrink-0"></CogIcon>
        {schedules.length ? (
          <p>
            Schedule(s) generated: <b>{schedules.length}</b>
          </p>
        ) : (
          <p>
            <b>No schedule</b> can be generated from the above combination
          </p>
        )}
      </header>
      {schedulesJSX}
    </section>
  );
};

export default ScheduleTables;
