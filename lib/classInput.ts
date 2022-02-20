import { WeekDate, SERIAL_DATE } from "./schedule";

export interface ClassObject {
  id: string;
  courseID: string;
  courseName: string;
  date: WeekDate[];
  startPeriod: number[];
  periodsCount: number[];
  isActive: boolean;
}

export interface CourseObject {
  id: string;
  name: string;
  color?: string;
  activeClasses: number;
  classesMap: ClassesMap;
}

export type ClassesMap = Map<string, ClassObject>;
export type CoursesMap = Map<string, CourseObject>;

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

export function _toClassObject(classStrArray: string[]): ClassObject {
  const courseID = classStrArray[0];
  const courseName = classStrArray[2];
  const group = classStrArray[3];
  const practice = classStrArray[4];
  const date = classStrArray[11].split(/\s+/) as WeekDate[];
  const startPeriod = classStrArray[12]
    .split(/\s+/)
    .map((strValue) => parseInt(strValue));
  const periodsCount = classStrArray[13]
    .split(/\s+/)
    .map((strValue) => parseInt(strValue));
  const id = courseID + group + practice;

  _validateClassObject({ classStrArray, date, periodsCount, startPeriod });

  return {
    id,
    courseID,
    courseName,
    date,
    startPeriod,
    periodsCount,
    isActive: true,
  };
}

export function _mapCourses(parseData: string[]) {
  if (parseData.length % 17 != 0)
    throw Error("Failed to match: Missing columns");

  let coursesMap: CoursesMap = new Map();

  for (let i = 0; i < parseData.length; i += 17) {
    let classObject = _toClassObject(parseData.slice(i, i + 17));

    let courseKey = classObject.courseID;

    let courseObject = coursesMap.get(courseKey);
    if (!courseObject) {
      courseObject = {
        id: courseKey,
        name: classObject.courseName,
        activeClasses: 0,
        classesMap: new Map(),
      };
      coursesMap.set(courseKey, courseObject);
    }
    courseObject.activeClasses += 1;
    courseObject.classesMap.set(classObject.id, classObject);
  }

  return coursesMap;
}

export function parseClassInput(rawInputString: string) {
  const parseData = rawInputString.trim().split(/[ ]*\t[ ]*/);
  return _mapCourses(parseData);
}
