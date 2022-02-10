import type { GetStaticProps, NextPage } from "next";
import { ClassObject } from "../../lib/classInput";

const Home: NextPage = () => {
  return (
    <main>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
    </main>
  );
};

export interface ClassID {
  courseKey: string;
  classIndex: number;
}

interface generateScheduleParams {
  coursesMap: Map<string, ClassObject[]>;
  courseKeys: string[];
  prefix: ClassID[];
}

interface CheckClassCollisionParams {
  coursesMap: Map<string, ClassObject[]>;
  prefix: ClassID[];
  classID: ClassID;
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

      if (checkClassCollision({ coursesMap, prefix, classID })) {
        let childResult = generateSchedule({
          coursesMap,
          courseKeys: courseKeys.slice(1),
          prefix: [...prefix, classID],
        });
        result.push(...childResult);
      }
    }

    return result;
  }
}

const serialDate = new Map(
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

export function serializeClassTime(classObject: ClassObject) {
  const date0 = serialDate.get(classObject.date[0]);
  const date1 =
    classObject.date.length != 1 ? serialDate.get(classObject.date[1]) : null;
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

export function checkClassCollision({
  coursesMap,
  prefix,
  classID,
}: CheckClassCollisionParams) {
  const classObject = coursesMap.get(classID.courseKey)?.at(classID.classIndex);
  if (!classObject) return false;

  const serialTimeline: number[][] = [];

  serialTimeline.push(...serializeClassTime(classObject));

  // Can be memoize in generateSchedule(), reduce prefix-serialized repetition
  for (let prefixClassID of prefix) {
    const prefixClassObject = coursesMap
      .get(prefixClassID.courseKey)
      ?.at(prefixClassID.classIndex);

    if (!prefixClassObject) continue;

    serialTimeline.push(...serializeClassTime(prefixClassObject));
  }

  serialTimeline.sort((a, b) => {
    return a[0] > b[0] ? 1 : -1;
  });

  for (let i = 0; i < serialTimeline.length - 1; i++) {
    if (serialTimeline[i][1] > serialTimeline[i + 1][0]) return false;
  }

  return true;
}

export default Home;
