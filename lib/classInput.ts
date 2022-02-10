export interface ClassObject {
  courseID: string;
  courseName: string;
  date: string[];
  startPeriod: number[];
  periodsCount: number[];
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

  return {
    courseID,
    courseName,
    date,
    startPeriod,
    periodsCount,
  } as ClassObject;
}

export function _mapCourses(rawData: string[]) {
  let coursesMap: Map<string, ClassObject[]> = new Map();

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

export function parseClassInput(rawData: string) {
  return _mapCourses(rawData.split("\t"));
}
