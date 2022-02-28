import { BG_COLOR_PALETTE } from "../pages/compute/IUGenPage";
import { ClassObject, CourseObject, CoursesMap } from "./classInput";

export interface ClassID {
  courseKey: string;
  classKey: string;
}

interface CheckClassCollisionParams {
  coursesMap: CoursesMap;
  schedule: ClassID[];
}

export type Schedule = ClassID[];

export type Schedules = Schedule[];

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

export const PERIODS_PER_DAY = 12;

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

  for (let i = 0; i < serialTimeline.length - 1; i++) {
    if (serialTimeline[i][1] > serialTimeline[i + 1][0]) return false;
  }

  return true;
}

export function generateSchedule(coursesMap: CoursesMap) {
  let interSchedules: Schedules = [[]];
  coursesMap.forEach((courseObject, courseKey) => {
    if (!courseObject.activeClasses) return;
    const nextIterSchedules: Schedules = [];

    courseObject.classesMap.forEach((classObject, classKey) => {
      if (!classObject.isActive) return;
      for (const interSchedule of interSchedules) {
        const schedule: Schedule = [...interSchedule, { courseKey, classKey }];
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

export function toggleClassState(
  coursesMap: CoursesMap,
  classObject: ClassObject,
  state?: boolean
) {
  if (state === classObject.isActive) return classObject.isActive;

  classObject.isActive = !classObject.isActive;

  const courseObject = coursesMap.get(classObject.courseID);
  if (!courseObject) {
    throw Error(
      `Invalid ClassObject reference: ${classObject.courseID} - ${classObject.id}`
    );
  }

  if (classObject.isActive) {
    courseObject.activeClasses += 1;
  } else {
    courseObject.activeClasses -= 1;
  }

  return classObject.isActive;
}

export function deleteClass(coursesMap: CoursesMap, classObject: ClassObject) {
  const courseObject = coursesMap.get(classObject.courseID);
  const classesMap = courseObject?.classesMap;
  if (!courseObject || !classesMap?.has(classObject.id)) {
    throw Error(
      `Invalid ClassObject reference: ${classObject.courseID} - ${classObject.id}`
    );
  }

  classesMap.delete(classObject.id);
  if (classObject.isActive) {
    courseObject.activeClasses -= 1;
  }

  if (courseObject.classesMap.size == 0) {
    coursesMap.delete(courseObject.id);
  }
}

export function getCourseState(courseObject: CourseObject) {
  return courseObject.activeClasses == courseObject.classesMap.size;
}

export function toggleCourseState(
  coursesMap: CoursesMap,
  courseObject: CourseObject,
  state?: boolean
) {
  const newState = !getCourseState(courseObject);
  if (state === !newState) return state;

  for (const classObject of courseObject.classesMap.values()) {
    toggleClassState(coursesMap, classObject, newState);
  }

  return newState;
}

export function deleteCourse(
  coursesMap: CoursesMap,
  courseObject: CourseObject
) {
  if (!coursesMap.has(courseObject.id)) {
    throw Error(`Invalid CourseObject reference: ${courseObject.id}`);
  }

  coursesMap.delete(courseObject.id);
}

export function getAllState(coursesMap: CoursesMap) {
  for (const courseObject of coursesMap.values()) {
    if (courseObject.activeClasses != courseObject.classesMap.size)
      return false;
  }
  return true;
}

export function toggleAllState(coursesMap: CoursesMap, state?: boolean) {
  const newState = !getAllState(coursesMap);
  if (state === !newState) return state;

  for (const courseObject of coursesMap.values()) {
    toggleCourseState(coursesMap, courseObject, newState);
  }

  return newState;
}

export function deleteAll(coursesMap: CoursesMap) {
  coursesMap.clear();
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
