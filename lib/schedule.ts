import { BG_COLOR_PALETTE } from "../pages/index";
import { ClassObject, CoursesMap } from "./classInput";
import { getActiveClasses } from "./courseAndClassUtils";

export interface ClassID {
  courseKey: string;
  classKey: string;
}

interface CheckClassCollisionParams {
  coursesMap: CoursesMap;
  schedule: Schedule;
  noAdjacent: boolean;
  minFreeDays: number;
}

export type Schedule = ClassID[];

export type Schedules = Schedule[];

interface CompleteClass {
  classObject: ClassObject;
  color: string;
}

export type CompleteSchedule = CompleteClass[];

export type WeekDate = "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat" | "Sun";

export const SERIAL_DATE = new Map(
  Object.entries({
    Mon: 0,
    Tue: 1,
    Wed: 2,
    Thu: 3,
    Fri: 4,
    Sat: 5,
    Sun: 6,
  })
);

export const PERIODS_PER_DAY = 17; // Edusoftweb shows 16, we +1 to indicate new day.
export const DISPLAY_PERIODS = 12;

export function _extractDates(classObject: ClassObject) {
  const dates = classObject.date.map((dateStr) => {
    const serialDate = SERIAL_DATE.get(dateStr);
    if (serialDate === undefined) throw Error(`Invalid week date: ${dateStr}`);
    return serialDate;
  });

  return dates;
}

export function _serializeClassTime(classObject: ClassObject) {
  if (
    classObject.date.length !== classObject.startPeriod.length ||
    classObject.startPeriod.length !== classObject.periodsCount.length
  ) {
    throw Error(
      `Missing elements in array of date or startPeriod or periodsCount: ${classObject}`
    );
  }
  const dates = _extractDates(classObject);
  const result: number[][] = dates.map((date, index) => [
    date * PERIODS_PER_DAY + (classObject.startPeriod[index] - 1),
    date * PERIODS_PER_DAY +
      (classObject.startPeriod[index] - 1) +
      classObject.periodsCount[index],
  ]);

  return result;
}

export function _checkClassCollision({
  coursesMap,
  schedule,
  noAdjacent,
  minFreeDays,
}: CheckClassCollisionParams) {
  const serialTimeline: number[][] = [];

  for (let classID of schedule) {
    const classObject = coursesMap
      .get(classID.courseKey)
      ?.classesMap.get(classID.classKey);

    if (!classObject)
      throw ReferenceError(
        `Invalid ClassObject reference: ${classID.courseKey} - ${classID.classKey}`
      );

    serialTimeline.push(..._serializeClassTime(classObject));
  }

  serialTimeline.sort((a, b) => {
    return a[0] > b[0] ? 1 : -1;
  });

  // 2 adjacent subjects: give low minus points. (e.g. -1)
  // 3 adjacent subjects: give high minus points. (e.g. -6)

  for (let i = 0; i < serialTimeline.length - 1; i++) {
    // check collision
    if (serialTimeline[i][1] > serialTimeline[i + 1][0]) return false;

    // 2 adjacent subjects and 3 adjacent subjects
    if (noAdjacent && serialTimeline[i][1] == serialTimeline[i + 1][0])
      return false;
  }

  // Free days: give bonus points. (e.g. +1)
  if (minFreeDays) {
    let checkFreeDay = -1;
    let freeDayCounter = 0;
    for (let i = 0; i < serialTimeline.length; i++) {
      const hasClassDay = ~~(serialTimeline[i][0] / PERIODS_PER_DAY);

      if (hasClassDay - checkFreeDay > 1)
        freeDayCounter += hasClassDay - checkFreeDay - 1;
      checkFreeDay = hasClassDay;
    }

    freeDayCounter += 5 - checkFreeDay; // add the remaining free days of the week
    if (freeDayCounter < minFreeDays) return false;
  }

  return true;
}

export function generateSchedule(
  coursesMap: CoursesMap,
  noAdjacent: boolean = true,
  minFreeDays: number = 1
) {
  let iterSchedules: Schedules = [[]];
  let hasAnyActive = false;
  coursesMap.forEach((courseObject, courseKey) => {
    const activeClassesMap = getActiveClasses(courseObject);
    if (!activeClassesMap.size) return;
    hasAnyActive = true;
    const nextIterSchedules: Schedules = [];

    activeClassesMap.forEach((_, classKey) => {
      for (const interSchedule of iterSchedules) {
        const schedule: Schedule = [...interSchedule, { courseKey, classKey }];
        if (
          _checkClassCollision({
            coursesMap,
            schedule,
            noAdjacent,
            minFreeDays,
          })
        ) {
          nextIterSchedules.push(schedule);
        }
      }
    });

    iterSchedules = [...nextIterSchedules];
  });

  if (iterSchedules.length == 0 || iterSchedules[0].length == 0) {
    return { schedules: [], hasAnyActive };
  } else {
    return { schedules: iterSchedules, hasAnyActive };
  }
}

export function mapToCompleteSchedule(
  coursesMap: CoursesMap,
  schedule: Schedule
): CompleteSchedule {
  return schedule.map(({ classKey, courseKey }) => {
    const courseObject = coursesMap.get(courseKey);

    const classObject = courseObject?.classesMap.get(classKey);

    if (!courseObject || !classObject)
      throw ReferenceError(
        `Invalid ClassObject reference: ${courseKey} - ${classKey}`
      );

    return {
      classObject,
      color: courseObject.color ?? BG_COLOR_PALETTE[0],
    } as CompleteClass;
  });
}

export function mapColor(coursesMap: CoursesMap) {
  let colorCounter = 0;
  const newMap: CoursesMap = new Map();
  for (const [courseKey, courseObject] of coursesMap) {
    newMap.set(courseKey, {
      ...courseObject,
      color: BG_COLOR_PALETTE[colorCounter],
    });
    colorCounter = (colorCounter + 1) % BG_COLOR_PALETTE.length;
  }
  return newMap;
}
