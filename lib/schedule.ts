import { ClassObject, CoursesMap } from "./classInput";

export interface ClassID {
  courseKey: string;
  classIndex: number;
}

interface generateScheduleParams {
  coursesMap: CoursesMap;
  courseKeys: string[];
  prefix: ClassID[];
}

interface CheckClassCollisionParams {
  coursesMap: CoursesMap;
  schedule: ClassID[];
}

const SERIAL_DATE = new Map(
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

export function _serializeClassTime(classObject: ClassObject) {
  const date0 = SERIAL_DATE.get(classObject.date[0]);
  const date1 =
    classObject.date.length != 1 ? SERIAL_DATE.get(classObject.date[1]) : null;
  const result: number[][] = [];

  if (date0) {
    result.push([
      date0 * PERIODS_PER_DAY + classObject.startPeriod[0],
      date0 * PERIODS_PER_DAY +
        classObject.startPeriod[0] +
        classObject.periodsCount[0],
    ]);
  }

  if (date1) {
    result.push([
      date1 * PERIODS_PER_DAY + classObject.startPeriod[1],
      date1 * PERIODS_PER_DAY +
        classObject.startPeriod[1] +
        classObject.periodsCount[1],
    ]);
  }

  return result;
}

export function _checkClassCollision({
  coursesMap,
  schedule,
}: CheckClassCollisionParams) {
  const serialTimeline: number[][] = [];

  // Can be memoize in generateSchedule(), reduce prefix-serialized repetition
  for (let prefixClassID of schedule) {
    const prefixClassObject = coursesMap
      .get(prefixClassID.courseKey)
      ?.at(prefixClassID.classIndex);

    if (!prefixClassObject)
      throw ReferenceError(`Invalid ClassObject reference: ${prefixClassID}`);

    serialTimeline.push(..._serializeClassTime(prefixClassObject));
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
  prefix,
}: generateScheduleParams) {
  if (courseKeys.length == 0) {
    return [prefix];
  } else {
    const courseKey = courseKeys[0];
    const classObjects = coursesMap.get(courseKey);
    if (!classObjects) return [prefix];

    let result: ClassID[][] = [];

    for (let classIndex = 0; classIndex < classObjects.length; classIndex++) {
      const classID: ClassID = { courseKey, classIndex };
      const schedule = [...prefix, classID];

      if (_checkClassCollision({ coursesMap, schedule })) {
        let childResult = generateSchedule({
          coursesMap,
          courseKeys: courseKeys.slice(1),
          prefix: schedule,
        });
        result.push(...childResult);
      }
    }

    return result;
  }
}
