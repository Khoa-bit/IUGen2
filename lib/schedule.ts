import { ClassesMap, ClassObject, CoursesMap } from "./classInput";

export interface ClassID {
  courseKey: string;
  classKey: string;
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

export const PERIODS_PER_DAY = 16;

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
      ?.get(classID.classKey);

    if (!classObject)
      throw ReferenceError(
        `Invalid ClassObject reference: ${classID.courseKey} - ${classID.classKey}`
      );

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

export function _isClassesMapActive(classesMap: ClassesMap) {
  for (const classObject of classesMap.values()) {
    if (classObject.isActive) return true;
  }
  return false;
}

export function generateSchedule(coursesMap: CoursesMap) {
  let interSchedules: ClassID[][] = [[]];
  coursesMap.forEach((classesMap, courseKey) => {
    if (!_isClassesMapActive(classesMap)) return;
    const nextIterSchedules: ClassID[][] = [];

    classesMap.forEach((classObject, classKey) => {
      if (!classObject.isActive) return;
      for (const interSchedule of interSchedules) {
        const schedule: ClassID[] = [...interSchedule, { courseKey, classKey }];
        if (_checkClassCollision({ coursesMap, schedule })) {
          nextIterSchedules.push(schedule);
        }
      }
    });

    interSchedules = [...nextIterSchedules];
  });

  if (interSchedules.length == 0 || interSchedules[0].length == 0) {
    return [];
  } else {
    return interSchedules;
  }
}
