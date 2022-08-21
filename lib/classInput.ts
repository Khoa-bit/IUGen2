import { WeekDate, SERIAL_DATE } from "./schedule";
import { Browser } from "./utils";

export interface ClassObject {
  id: string;
  courseID: string;
  courseName: string;
  date: WeekDate[];
  startPeriod: number[];
  periodsCount: number[];
  location: string[];
  lecturer: string[];
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

const VNToEngDates = new Map<string, WeekDate>(
  Object.entries({
    Hai: "Mon",
    Ba: "Tue",
    Tư: "Wed",
    Năm: "Thu",
    Sáu: "Fri",
    Bảy: "Sun",
    Nhật: "Sat",
    Mon: "Mon",
    Tue: "Tue",
    Wed: "Wed",
    Thu: "Thu",
    Fri: "Fri",
    Sun: "Sun",
    Sat: "Sat",
  })
);

export function _toClassObject(classStrArray: string[]): ClassObject {
  const courseID = classStrArray[0];
  const courseName = classStrArray[2];
  const group = classStrArray[3];
  const practice = classStrArray[4];
  const date = classStrArray[11].split(/___/).map((weekDate) => {
    const dateStr = VNToEngDates.get(weekDate);
    if (dateStr === undefined)
      throw Error(
        `Invalid week date format: ${weekDate} in ${classStrArray[11]}`
      );
    return dateStr;
  });
  const startPeriod = classStrArray[12]
    .split(/___/)
    .map((strValue) => parseInt(strValue));
  const periodsCount = classStrArray[13]
    .split(/___/)
    .map((strValue) => parseInt(strValue));
  const location = classStrArray[14].split(/___/);
  const lecturer = classStrArray[15].split(/___/);
  const id = courseID + group + practice;

  // Ensure a course with 2 classes have a pair of each fields.
  if (date.length != startPeriod.length || date.length != periodsCount.length) {
    throw Error(
      `Missing date or startPeriod or periodsCount: ${classStrArray}`
    );
  }

  return {
    id,
    courseID,
    courseName,
    date,
    startPeriod,
    periodsCount,
    location,
    lecturer,
    isActive: true,
  };
}

export function _mapCoursesFirefox(parseData: string[]) {
  const step = 17;
  if (parseData.length % step != 0)
    throw Error("Failed to match: Missing columns");

  let coursesMap: CoursesMap = new Map();

  for (let i = 0; i < parseData.length; i += step) {
    let classData = parseData.slice(i, i + step);
    classData = _fillOptionalFields(classData);
    let classObject = _toClassObject(classData);
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

export function _mapCoursesChromium(parseData: string[]) {
  const step = 11;
  if (parseData.length % step != 0)
    throw Error("Failed to match: Missing columns");

  let coursesMap: CoursesMap = new Map();

  for (let i = 0; i < parseData.length; i += step) {
    let classData = parseData.slice(i, i + step);
    classData = _splitDataChromium11to17(classData);
    classData = _fillOptionalFields(classData);

    let classObject = _toClassObject(classData);
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

function _splitDataChromium11to17(classData: string[]) {
  const classInfoClump = classData.pop();
  if (classInfoClump == undefined)
    throw new Error("Failed to match: Missing columns");

  const groupedClump = classInfoClump.replaceAll(/\*___/g, "* ");
  const parsedClassInfo = groupedClump.split(/[ "]+/);
  return classData.concat(parsedClassInfo);
}

export function _fillOptionalFields(classData: string[]) {
  let missingCount = 17 - classData.length;
  if (missingCount == 0) {
    return classData;
  }

  let hasLab = false;
  let hasWeekDate = false;
  let hasLocation = false;
  let hasLecturer = false;

  for (let i = 2; i <= 7 - missingCount; i++) {
    const value = classData.at(-i);
    if (value == undefined) throw new Error("Failed to match: Missing columns");

    if (value.match(/^([\d\/\-]+(___[\d\/\-]+)?)$/)) {
      // Match anchor ()
      continue;
    } else if (!hasLab && value.match(/^[\*\s]?$/)) {
      // Match Teacher name "*", ""
      hasLab = true;
    } else if (
      !hasWeekDate &&
      value.split(/___/).filter((weekDate) => VNToEngDates.has(weekDate)).length
    ) {
      // Match week date Tư, Wed
      hasWeekDate = true;
    } else if (!hasLecturer && value.match(/^[^\d\s]+$/)) {
      // Match Teacher name L.H.Duong, H.K.Tu
      hasLecturer = true;
    } else if (!hasLocation && value.match(/^[^\s]+$/)) {
      // Match location LA1.604, A1.203
      hasLocation = true;
    }
  }

  if (!hasWeekDate) {
    throw new Error(`Missing date for class: ${classData}`);
  }

  let ptr = 10;
  return classData
    .slice(0, 10)
    .concat([
      hasLab ? classData[ptr++] : "___",
      classData[ptr++],
      classData[ptr++],
      classData[ptr++],
      hasLocation ? classData[ptr++] : "-___-",
      hasLecturer ? classData[ptr++] : "-___-",
      classData[ptr++],
    ]);
}

export function parseClassInput(rawInputString: string, browser: Browser) {
  const parseData = rawInputString
    .trim()
    .replaceAll(/[ "]{3,}/g, "___")
    .split(/[ "]*\t[ "]*/);
  if (browser == "firefox") {
    return _mapCoursesFirefox(parseData);
  } else {
    return _mapCoursesChromium(parseData);
  }
}
