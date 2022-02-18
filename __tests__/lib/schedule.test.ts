import {
  generateSchedule,
  ClassID,
  _serializeClassTime,
  _checkClassCollision,
  _extractDates,
} from "../../lib/schedule";
import { CoursesMap, parseClassInput } from "../../lib/classInput";

describe("Schedule Generator", () => {
  const coursesMap: CoursesMap = new Map();
  beforeAll(() => {
    initializeCourseMap(coursesMap);
  });

  describe("_extractDates()", () => {
    it("should extract and serialize dates", function () {
      const class1 = coursesMap.get("C1")?.get("mqssC1k2sR");
      const class2 = coursesMap.get("C2")?.get("7U6epESwH6");
      if (!class1 || !class2) throw Error("Missing class in courseMap");

      expect(_extractDates(class1)).toEqual([2, 4]);
      expect(_extractDates(class2)).toEqual([1]);
    });

    it("should throw error with invalid classObject", function () {
      expect(() => {
        _extractDates({
          courseID: "ERR",
          courseName: "ErrorCourse",
          // @ts-ignore
          date: ["What?"], // Invalid WeekDate
          startPeriod: [1],
          periodsCount: [3],
        });
      }).toThrowError(/^Invalid week date:/);
    });
  });

  describe("_serializeClassTime()", () => {
    it("should serialize class time", function () {
      const course1 = coursesMap.get("C1");
      const course2 = coursesMap.get("C2");
      if (!course1 || !course2) throw Error("Missing course in courseMap");

      // Check C1 classes
      const classObjectC10 = course1.get("mqssC1k2sR");
      if (!classObjectC10) throw Error("Missing Class mqssC1k2sR");
      expect(_serializeClassTime(classObjectC10)).toEqual([
        [33, 36],
        [71, 75],
      ]);

      const classObjectC11 = course1.get("urZD52YPog");
      if (!classObjectC11) throw Error("Missing Class urZD52YPog");
      expect(_serializeClassTime(classObjectC11)).toEqual([
        [23, 26],
        [71, 75],
      ]);

      // Check C2 classes
      const classObjectC20 = course2.get("7U6epESwH6");
      if (!classObjectC20) throw Error("Missing Class 7U6epESwH6");
      expect(_serializeClassTime(classObjectC20)).toEqual([[17, 20]]);

      const classObjectC21 = course2.get("tk9A_ye58T");
      if (!classObjectC21) throw Error("Missing Class tk9A_ye58T");
      expect(_serializeClassTime(classObjectC21)).toEqual([[33, 36]]);
    });

    it("should throw an Error due to missing periods for dates", function () {
      expect(() => {
        _serializeClassTime({
          id: "errorBad",
          courseID: "ERR",
          courseName: "ErrorCourse",
          date: ["Wed", "Fri"],
          startPeriod: [1], // Missing startPeriod for "Fri" date
          periodsCount: [3], // Missing periodsCount for "Fri" date
        });
      }).toThrowError(
        /^Missing elements in array of date or startPeriod or periodsCount:/
      );
    });
  });

  describe("_checkClassCollision()", () => {
    it("should check for class collisions with ", function () {
      const prefix: ClassID[] = [{ courseKey: "C1", classKey: "mqssC1k2sR" }];

      expect(
        _checkClassCollision({
          coursesMap,
          schedule: [...prefix, { courseKey: "C2", classKey: "7U6epESwH6" }],
        })
      ).toBeTruthy();

      expect(
        _checkClassCollision({
          coursesMap,
          schedule: [...prefix, { courseKey: "C2", classKey: "tk9A_ye58T" }],
        })
      ).toBeFalsy();

      expect(() => {
        _checkClassCollision({
          coursesMap,
          schedule: [...prefix, { courseKey: "C2", classKey: "errorBad" }],
        });
      }).toThrowError(/^Invalid ClassObject reference:/);

      expect(() => {
        _checkClassCollision({
          coursesMap,
          schedule: [...prefix, { courseKey: "INVALID", classKey: "errorBad" }],
        });
      }).toThrowError(/^Invalid ClassObject reference:/);
    });
  });

  describe("generateSchedule()", () => {
    it("should generate schedule with ", function () {
      const schedules = generateSchedule(coursesMap);

      expect(schedules).toStrictEqual([
        [
          { courseKey: "C1", classKey: "mqssC1k2sR" },
          { courseKey: "C2", classKey: "7U6epESwH6" },
        ],
        [
          { courseKey: "C1", classKey: "urZD52YPog" },
          { courseKey: "C2", classKey: "7U6epESwH6" },
        ],
        [
          { courseKey: "C1", classKey: "urZD52YPog" },
          { courseKey: "C2", classKey: "tk9A_ye58T" },
        ],
      ] as ClassID[][]);
    });
  });
});

describe("parseClassInput() and generateSchedule()", () => {
  it("should generate a schedule from raw input string", function () {
    const rawInputString =
      "IT092IU 	IT092IU 	 Principles of Programming Languages 	01	01	4	4	ITIT19CS1	35 	Full 	 *   	 Fri   Sat 	 7   1 	 4   3 	 LA1.607   ONLINE 	 N.Q.Phú   Q.T.Tho 	 07/03/2022--15/05/2022   07/02/2022--05/06/2022 	IT092IU 	IT092IU 	 Principles of Programming Languages 	01	02	4	4	ITIT19CS1	35 	4 	 *   	 Mon   Sat 	 1   1 	 4   3 	 LA1.607   ONLINE 	 N.Q.Phú   Q.T.Tho 	 07/03/2022--15/05/2022   07/02/2022--05/06/2022 	IT093IU 	IT093IU 	 Web Application Development 	01	03	4	4	ITIT19CS1	30 	15 	 *   	 Fri   Tue 	 7   7 	 4   3 	 LA1.605   ONLINE 	 N.V.Sinh   N.V.Sinh 	 07/03/2022--15/05/2022   07/02/2022--05/06/2022 	IT093IU 	IT093IU 	 Web Application Development 	01	02	4	4	ITIT19CS1	30 	Full 	 *   	 Thu   Tue 	 7   7 	 4   3 	 LA1.606   ONLINE 	 P.Q.S.Lam   N.V.Sinh 	 07/03/2022--15/05/2022   07/02/2022--05/06/2022 	IT093IU 	IT093IU 	 Web Application Development 	01	01	4	4	ITIT19CS1	30 	Full 	 *   	 Sat   Tue 	 7   7 	 4   3 	 LA1.608   ONLINE 	 P.Q.S.Lam   N.V.Sinh 	 07/03/2022--15/05/2022   07/02/2022--05/06/2022 	IT097IU 	IT097IU 	 Introduction to Artificial Intelligence 	01	01	4	4	ITIT19CS1	35 	3 	 *   	 Wed   Fri 	 1   1 	 4   3 	 LA1.606   ONLINE 	 P.Q.S.Lam   L.T.Sach 	 07/03/2022--15/05/2022   07/02/2022--05/06/2022 	IT097IU 	IT097IU 	 Introduction to Artificial Intelligence 	01	02	4	4	ITIT19CS1	35 	10 	 *   	 Wed   Fri 	 7   1 	 4   3 	 LA1.606   ONLINE 	 P.Q.S.Lam   L.T.Sach 	 07/03/2022--15/05/2022   07/02/2022--05/06/2022 	PE018IU 	PE018IU 	 History of Vietnamese Communist Party 	10		2	2	ITIT19CS1	75 	3 	 	 Wed 	 9 	 2 	 ONLINE 	 H.Y.Linh 	 07/02/2022--05/06/2022 	PE019IU 	PE019IU 	 Ho Chi Minh's Thoughts 	10		2	2	ITIT19CS1	75 	2 	 	 Wed 	 7 	 2 	 ONLINE 	 P.T.T.Huong 	 07/02/2022--05/06/2022";

    const coursesMap = parseClassInput(rawInputString);

    const schedules = generateSchedule(coursesMap);

    // Due to ClassObject ID is random generated => classKey is also random generated by nanoid.
    // nanoid can't guarantee seeding.
    expect(schedules).toStrictEqual([
      [
        { courseKey: "IT092IU", classKey: schedules[0][0].classKey },
        { courseKey: "IT093IU", classKey: schedules[0][1].classKey },
        { courseKey: "IT097IU", classKey: schedules[0][2].classKey },
        { courseKey: "PE018IU", classKey: schedules[0][3].classKey },
        { courseKey: "PE019IU", classKey: schedules[0][4].classKey },
      ],
      [
        { courseKey: "IT092IU", classKey: schedules[1][0].classKey },
        { courseKey: "IT093IU", classKey: schedules[1][1].classKey },
        { courseKey: "IT097IU", classKey: schedules[1][2].classKey },
        { courseKey: "PE018IU", classKey: schedules[1][3].classKey },
        { courseKey: "PE019IU", classKey: schedules[1][4].classKey },
      ],
      [
        { courseKey: "IT092IU", classKey: schedules[2][0].classKey },
        { courseKey: "IT093IU", classKey: schedules[2][1].classKey },
        { courseKey: "IT097IU", classKey: schedules[2][2].classKey },
        { courseKey: "PE018IU", classKey: schedules[2][3].classKey },
        { courseKey: "PE019IU", classKey: schedules[2][4].classKey },
      ],
      [
        { courseKey: "IT092IU", classKey: schedules[3][0].classKey },
        { courseKey: "IT093IU", classKey: schedules[3][1].classKey },
        { courseKey: "IT097IU", classKey: schedules[3][2].classKey },
        { courseKey: "PE018IU", classKey: schedules[3][3].classKey },
        { courseKey: "PE019IU", classKey: schedules[3][4].classKey },
      ],
      [
        { courseKey: "IT092IU", classKey: schedules[4][0].classKey },
        { courseKey: "IT093IU", classKey: schedules[4][1].classKey },
        { courseKey: "IT097IU", classKey: schedules[4][2].classKey },
        { courseKey: "PE018IU", classKey: schedules[4][3].classKey },
        { courseKey: "PE019IU", classKey: schedules[4][4].classKey },
      ],
    ] as ClassID[][]);
  });
});

function initializeCourseMap(courseMap: CoursesMap) {
  const classMapC1 = new Map();
  classMapC1.set("mqssC1k2sR", {
    id: "mqssC1k2sR",
    courseID: "C1",
    courseName: "Course1",
    date: ["Wed", "Fri"],
    startPeriod: [1, 7],
    periodsCount: [3, 4],
  });

  classMapC1.set("urZD52YPog", {
    id: "urZD52YPog",
    courseID: "C1",
    courseName: "Course1",
    date: ["Tue", "Fri"],
    startPeriod: [7, 7],
    periodsCount: [3, 4],
  });

  const classMapC2 = new Map();
  classMapC2.set("7U6epESwH6", {
    id: "7U6epESwH6",
    courseID: "C2",
    courseName: "Course2",
    date: ["Tue"],
    startPeriod: [1],
    periodsCount: [3],
  });

  classMapC2.set("tk9A_ye58T", {
    id: "tk9A_ye58T",
    courseID: "C2",
    courseName: "Course2",
    date: ["Wed"],
    startPeriod: [1],
    periodsCount: [3],
  });

  courseMap.set("C1", classMapC1);
  courseMap.set("C2", classMapC2);
}
