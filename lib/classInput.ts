import { WeekDate, SERIAL_DATE } from "./schedule";

export interface ClassObject {
  courseID: string;
  courseName: string;
  date: WeekDate[];
  startPeriod: number[];
  periodsCount: number[];
}

export type CoursesMap = Map<string, ClassObject[]>;

interface validateClassObjectFields {
  classStrArray: string[];
  date: string[];
  startPeriod: number[];
  periodsCount: number[];
}

function _validateClassObject({
  classStrArray,
  date,
  startPeriod,
  periodsCount,
}: validateClassObjectFields) {
  date.forEach((dateStr) => {
    if (SERIAL_DATE.get(dateStr) === undefined) {
      throw Error(`Invalid week date "${dateStr}": ${classStrArray}`);
    }
  });

  if (
    date.length !== startPeriod.length ||
    startPeriod.length !== periodsCount.length
  ) {
    throw Error(
      `Missing elements in array of date or startPeriod or periodsCount: ${classStrArray}`
    );
  }
}

export function _toClassObject(classStrArray: string[]) {
  const courseID = classStrArray[0].trim();
  const courseName = classStrArray[2].trim();
  const date = classStrArray[11].trim().split(/\s+/);
  const startPeriod = classStrArray[12]
    .trim()
    .split(/\s+/)
    .map((strValue) => parseInt(strValue));
  const periodsCount = classStrArray[13]
    .trim()
    .split(/\s+/)
    .map((strValue) => parseInt(strValue));

  _validateClassObject({ classStrArray, date, periodsCount, startPeriod });

  return {
    courseID,
    courseName,
    date,
    startPeriod,
    periodsCount,
  } as ClassObject;
}

export function _mapCourses(rawData: string[]) {
  let coursesMap: CoursesMap = new Map();

  for (let i = 0; i < rawData.length; i += 17) {
    let classObject = _toClassObject(rawData.slice(i, i + 17));

    let courseKey = classObject.courseID;
    let courseValue = coursesMap.get(courseKey);
    if (courseValue) {
      coursesMap.set(courseKey, [...courseValue, classObject]);
    } else {
      coursesMap.set(courseKey, [classObject]);
    }
  }

  return coursesMap;
}

export function parseClassInput(rawInputString: string) {
  return _mapCourses(rawInputString.split("\t"));
}
