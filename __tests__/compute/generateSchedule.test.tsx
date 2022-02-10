import {
  generateSchedule,
  ClassID,
  serializeClassTime,
  checkClassCollision,
} from "../../pages/compute/generateSchedule";
import { ClassObject } from "../../pages/compute/hookForm";

describe("Schedule Generator", () => {
  const coursesMap: Map<string, ClassObject[]> = new Map();
  beforeAll(() => {
    initializeCourseMap(coursesMap);
  });

  it("should serialize class time with serializeClassTime()", function () {
    const course1 = coursesMap.get("C1");
    const course2 = coursesMap.get("C2");
    if (!course1 || !course2) throw Error("Missing course in courseMap");

    expect(serializeClassTime(course1[0])).toEqual([
      [33, 36],
      [71, 75],
    ]);
    expect(serializeClassTime(course1[1])).toEqual([
      [23, 26],
      [71, 75],
    ]);
    expect(serializeClassTime(course2[0])).toEqual([[17, 20]]);
    expect(serializeClassTime(course2[1])).toEqual([[33, 36]]);
  });

  it("should check for class collisions with checkClassCollision()", function () {
    const prefix: ClassID[] = [{ courseKey: "C1", classIndex: 0 }];

    expect(
      checkClassCollision({
        coursesMap,
        prefix,
        classID: { courseKey: "C2", classIndex: 0 },
      })
    ).toBeTruthy();

    expect(
      checkClassCollision({
        coursesMap,
        prefix,
        classID: { courseKey: "C2", classIndex: 1 },
      })
    ).toBeFalsy();

    expect(
      checkClassCollision({
        coursesMap,
        prefix,
        classID: { courseKey: "C2", classIndex: 99 },
      })
    ).toBeFalsy();

    expect(
      checkClassCollision({
        coursesMap,
        prefix,
        classID: { courseKey: "INVALID", classIndex: 0 },
      })
    ).toBeFalsy();
  });

  it("should generate schedule with generateSchedule()", function () {
    const courseKeys: string[] = ["C1", "C2"];
    const prefix: ClassID[] = [];

    const schedules = generateSchedule({ coursesMap, courseKeys, prefix });

    expect(schedules).toStrictEqual([
      [
        { courseKey: "C1", classIndex: 0 },
        { courseKey: "C2", classIndex: 0 },
      ],
      [
        { courseKey: "C1", classIndex: 1 },
        { courseKey: "C2", classIndex: 0 },
      ],
      [
        { courseKey: "C1", classIndex: 1 },
        { courseKey: "C2", classIndex: 1 },
      ],
    ] as ClassID[][]);
  });
});

function initializeCourseMap(courseMap: Map<string, ClassObject[]>) {
  courseMap.set("C1", [
    {
      courseID: "C1",
      courseName: "Course1",
      hasLab: true,
      date: ["Wed", "Fri"],
      startPeriod: [1, 7],
      periodsCount: [3, 4],
    },
    {
      courseID: "C1",
      courseName: "Course1",
      hasLab: true,
      date: ["Tue", "Fri"],
      startPeriod: [7, 7],
      periodsCount: [3, 4],
    },
  ]);

  courseMap.set("C2", [
    {
      courseID: "C2",
      courseName: "Course2",
      hasLab: false,
      date: ["Tue"],
      startPeriod: [1],
      periodsCount: [3],
    },
    {
      courseID: "C2",
      courseName: "Course2",
      hasLab: false,
      date: ["Wed"],
      startPeriod: [1],
      periodsCount: [3],
    },
  ]);
}
