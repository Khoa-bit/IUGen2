import { CogIcon } from "@heroicons/react/solid";
import { nanoid } from "nanoid";
import { CoursesMap } from "../lib/classInput";
import { generateSchedule } from "../lib/schedule";
import GearIcon from "./GearIcon";
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
    <section className="flex w-full max-w-screen-lg flex-col gap-8 xl:grid xl:max-w-none xl:grid-cols-2">
      <header
        className={`flex w-full items-center gap-2 rounded 
        py-2 px-3 text-white shadow xl:col-span-2 xl:mx-auto xl:max-w-screen-lg ${
          schedules.length
            ? "bg-emerald-400 shadow-emerald-300"
            : "bg-stone-400 shadow-stone-300"
        }`}
      >
        <GearIcon className="h-4 shrink-0"></GearIcon>
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
