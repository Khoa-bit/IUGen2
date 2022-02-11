import {
  generateSchedule,
  ClassID,
  _serializeClassTime,
  _checkClassCollision,
} from "../../lib/schedule";
import { CoursesMap, parseClassInput } from "../../lib/classInput";

describe("Schedule Generator", () => {
  const coursesMap: CoursesMap = new Map();
  beforeAll(() => {
    initializeCourseMap(coursesMap);
  });

  it("should serialize class time with _serializeClassTime()", function () {
    const course1 = coursesMap.get("C1");
    const course2 = coursesMap.get("C2");
    if (!course1 || !course2) throw Error("Missing course in courseMap");

    expect(_serializeClassTime(course1[0])).toEqual([
      [33, 36],
      [71, 75],
    ]);
    expect(_serializeClassTime(course1[1])).toEqual([
      [23, 26],
      [71, 75],
    ]);
    expect(_serializeClassTime(course2[0])).toEqual([[17, 20]]);
    expect(_serializeClassTime(course2[1])).toEqual([[33, 36]]);
  });

  it("should check for class collisions with _checkClassCollision()", function () {
    const prefix: ClassID[] = [{ courseKey: "C1", classIndex: 0 }];

    expect(
      _checkClassCollision({
        coursesMap,
        schedule: [...prefix, { courseKey: "C2", classIndex: 0 }],
      })
    ).toBeTruthy();

    expect(
      _checkClassCollision({
        coursesMap,
        schedule: [...prefix, { courseKey: "C2", classIndex: 1 }],
      })
    ).toBeFalsy();

    expect(() => {
      _checkClassCollision({
        coursesMap,
        schedule: [...prefix, { courseKey: "C2", classIndex: 99 }],
      });
    }).toThrowError(/^Invalid ClassObject reference:/);

    expect(() => {
      _checkClassCollision({
        coursesMap,
        schedule: [...prefix, { courseKey: "INVALID", classIndex: 0 }],
      });
    }).toThrowError(/^Invalid ClassObject reference:/);
  });

  it("should generate schedule with generateSchedule()", function () {
    const courseKeys: string[] = ["C1", "C2"];

    const schedules = generateSchedule({ coursesMap, courseKeys });

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

describe("parseClassInput() and generateSchedule()", () => {
  it("should generate a schedule from raw input string", function () {
    const rawInputString =
      "IT092IU \tIT092IU \t Principles of Programming Languages \t01\t01\t4\t4\tITIT19CS1\t35 \tFull \t *   \t Fri   Sat \t 7   1 \t 4   3 \t LA1.607   ONLINE \t N.Q.Phú   Q.T.Tho \t 07/03/2022--15/05/2022   07/02/2022--05/06/2022 \tIT092IU \tIT092IU \t Principles of Programming Languages \t01\t02\t4\t4\tITIT19CS1\t35 \t1 \t *   \t Mon   Sat \t 1   1 \t 4   3 \t LA1.607   ONLINE \t N.Q.Phú   Q.T.Tho \t 07/03/2022--15/05/2022   07/02/2022--05/06/2022 \tIT093IU \tIT093IU \t Web Application Development \t01\t03\t4\t4\tITIT19CS1\t30 \t16 \t *   \t Fri   Tue \t 7   7 \t 4   3 \t LA1.605   ONLINE \t N.V.Sinh   N.V.Sinh \t 07/03/2022--15/05/2022   07/02/2022--05/06/2022 \tIT093IU \tIT093IU \t Web Application Development \t01\t02\t4\t4\tITIT19CS1\t30 \tFull \t *   \t Thu   Tue \t 7   7 \t 4   3 \t LA1.606   ONLINE \t P.Q.S.Lam   N.V.Sinh \t 07/03/2022--15/05/2022   07/02/2022--05/06/2022 \tIT093IU \tIT093IU \t Web Application Development \t01\t01\t4\t4\tITIT19CS1\t30 \tFull \t *   \t Sat   Tue \t 7   7 \t 4   3 \t LA1.608   ONLINE \t P.Q.S.Lam   N.V.Sinh \t 07/03/2022--15/05/2022   07/02/2022--05/06/2022 \tIT097IU \tIT097IU \t Introduction to Artificial Intelligence \t01\t01\t4\t4\tITIT19CS1\t35 \t2 \t *   \t Wed   Fri \t 1   1 \t 4   3 \t LA1.606   ONLINE \t P.Q.S.Lam   L.T.Sach \t 07/03/2022--15/05/2022   07/02/2022--05/06/2022 \tIT097IU \tIT097IU \t Introduction to Artificial Intelligence \t01\t02\t4\t4\tITIT19CS1\t35 \t11 \t *   \t Wed   Fri \t 7   1 \t 4   3 \t LA1.606   ONLINE \t P.Q.S.Lam   L.T.Sach \t 07/03/2022--15/05/2022   07/02/2022--05/06/2022 \tPE018IU \tPE018IU \t History of Vietnamese Communist Party \t10\t\t2\t2\tITIT19CS1\t75 \t2 \t \t Wed \t 9 \t 2 \t ONLINE \t H.Y.Linh \t 07/02/2022--05/06/2022 \tPE019IU \tPE019IU \t Ho Chi Minh's Thoughts \t10\t\t2\t2\tITIT19CS1\t75 \tFull \t \t Wed \t 7 \t 2 \t ONLINE \t P.T.T.Huong \t 07/02/2022--05/06/2022";

    const resultCoursesMap = parseClassInput(rawInputString);

    const courseKeys: string[] = Array.from(resultCoursesMap.keys());

    const schedules = generateSchedule({
      coursesMap: resultCoursesMap,
      courseKeys,
    });

    expect(schedules).toStrictEqual([
      [
        { courseKey: "IT092IU", classIndex: 1 },
        { courseKey: "IT093IU", classIndex: 0 },
        { courseKey: "IT097IU", classIndex: 0 },
        { courseKey: "PE018IU", classIndex: 0 },
        { courseKey: "PE019IU", classIndex: 0 },
      ],
      [
        { courseKey: "IT092IU", classIndex: 0 },
        { courseKey: "IT093IU", classIndex: 1 },
        { courseKey: "IT097IU", classIndex: 0 },
        { courseKey: "PE018IU", classIndex: 0 },
        { courseKey: "PE019IU", classIndex: 0 },
      ],
      [
        { courseKey: "IT092IU", classIndex: 1 },
        { courseKey: "IT093IU", classIndex: 1 },
        { courseKey: "IT097IU", classIndex: 0 },
        { courseKey: "PE018IU", classIndex: 0 },
        { courseKey: "PE019IU", classIndex: 0 },
      ],
      [
        { courseKey: "IT092IU", classIndex: 0 },
        { courseKey: "IT093IU", classIndex: 2 },
        { courseKey: "IT097IU", classIndex: 0 },
        { courseKey: "PE018IU", classIndex: 0 },
        { courseKey: "PE019IU", classIndex: 0 },
      ],
      [
        { courseKey: "IT092IU", classIndex: 1 },
        { courseKey: "IT093IU", classIndex: 2 },
        { courseKey: "IT097IU", classIndex: 0 },
        { courseKey: "PE018IU", classIndex: 0 },
        { courseKey: "PE019IU", classIndex: 0 },
      ],
    ] as ClassID[][]);
  });
});

function initializeCourseMap(courseMap: CoursesMap) {
  courseMap.set("C1", [
    {
      courseID: "C1",
      courseName: "Course1",
      date: ["Wed", "Fri"],
      startPeriod: [1, 7],
      periodsCount: [3, 4],
    },
    {
      courseID: "C1",
      courseName: "Course1",
      date: ["Tue", "Fri"],
      startPeriod: [7, 7],
      periodsCount: [3, 4],
    },
  ]);

  courseMap.set("C2", [
    {
      courseID: "C2",
      courseName: "Course2",
      date: ["Tue"],
      startPeriod: [1],
      periodsCount: [3],
    },
    {
      courseID: "C2",
      courseName: "Course2",
      date: ["Wed"],
      startPeriod: [1],
      periodsCount: [3],
    },
  ]);
}
