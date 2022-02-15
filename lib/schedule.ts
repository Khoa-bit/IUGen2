import { ClassObject, CoursesMap } from "./classInput";

export interface ClassID {
  courseKey: string;
  classIndex: number;
}

interface generateScheduleParams {
  coursesMap: CoursesMap;
  courseKeys: string[];
}

interface CheckClassCollisionParams {
  coursesMap: CoursesMap;
  schedule: ClassID[];
}

export type WeekDate = "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat" | "Sun";

export const SERIAL_DATE = new Map(
  Object.entries({
    Mon: 0,
    Tue: 1,
    Wed: 2,
    Thu: 3,
    Fri: 4,
    Sun: 5,
    Sat: 6,
  })
);

const PERIODS_PER_DAY = 16;

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
    date * PERIODS_PER_DAY + classObject.startPeriod[index],
    date * PERIODS_PER_DAY +
      classObject.startPeriod[index] +
      classObject.periodsCount[index],
  ]);

  return result;
}

export function _checkClassCollision({
  coursesMap,
  schedule,
}: CheckClassCollisionParams) {
  const serialTimeline: number[][] = [];

  // Can be memoize in generateSchedule(), reduce schedule serialization
  for (let classID of schedule) {
    const classObject = coursesMap
      .get(classID.courseKey)
      ?.at(classID.classIndex);

    if (!classObject)
      throw ReferenceError(`Invalid ClassObject reference: ${classID}`);

    serialTimeline.push(..._serializeClassTime(classObject));
  }

  serialTimeline.sort((a, b) => {
    return a[0] > b[0] ? 1 : -1;
  });

  for (let i = 0; i < serialTimeline.length - 1; i++) {
    if (serialTimeline[i][1] > serialTimeline[i + 1][0]) return false;
  }

  return true;
}

export function generateSchedule({
  coursesMap,
  courseKeys,
}: generateScheduleParams) {
  let interSchedules: ClassID[][] = [[]];
  for (const courseKey of courseKeys) {
    const nextIterSchedules: ClassID[][] = [];
    const course = coursesMap.get(courseKey);
    if (!course) continue;

    for (let classIndex = 0; classIndex < course.length; classIndex++) {
      for (const interSchedule of interSchedules) {
        const schedule = [...interSchedule, { courseKey, classIndex }];
        if (_checkClassCollision({ coursesMap, schedule })) {
          nextIterSchedules.push(schedule);
        }
      }
    }

    interSchedules = [...nextIterSchedules];
  }
  return interSchedules;
}
