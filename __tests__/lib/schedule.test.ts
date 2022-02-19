import {
  generateSchedule,
  ClassID,
  _serializeClassTime,
  _checkClassCollision,
  _extractDates,
  _isClassesMapActive,
} from "../../lib/schedule";
import {
  ClassesMap,
  ClassObject,
  CoursesMap,
  parseClassInput,
} from "../../lib/classInput";

describe("Schedule Generator", () => {
  const coursesMap: CoursesMap = new Map();
  beforeAll(() => {
    initializeCourseMap(coursesMap);
  });

  describe("_extractDates()", () => {
    it("should extract and serialize dates", function () {
      const class1 = coursesMap.get("C1")?.get("C10101");
      const class2 = coursesMap.get("C2")?.get("C201");
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
      const classObjectC10 = course1.get("C10101");
      if (!classObjectC10) throw Error("Missing Class C10101");
      expect(_serializeClassTime(classObjectC10)).toEqual([
        [33, 36],
        [71, 75],
      ]);

      const classObjectC11 = course1.get("C10102");
      if (!classObjectC11) throw Error("Missing Class C10102");
      expect(_serializeClassTime(classObjectC11)).toEqual([
        [23, 26],
        [71, 75],
      ]);

      // Check C2 classes
      const classObjectC20 = course2.get("C201");
      if (!classObjectC20) throw Error("Missing Class C201");
      expect(_serializeClassTime(classObjectC20)).toEqual([[17, 20]]);

      const classObjectC21 = course2.get("C202");
      if (!classObjectC21) throw Error("Missing Class C202");
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
          isActive: true,
        });
      }).toThrowError(
        /^Missing elements in array of date or startPeriod or periodsCount:/
      );
    });
  });

  describe("_checkClassCollision()", () => {
    it("should check for class collisions with ", function () {
      const prefix: ClassID[] = [{ courseKey: "C1", classKey: "C10101" }];

      expect(
        _checkClassCollision({
          coursesMap,
          schedule: [...prefix, { courseKey: "C2", classKey: "C201" }],
        })
      ).toBeTruthy();

      expect(
        _checkClassCollision({
          coursesMap,
          schedule: [...prefix, { courseKey: "C2", classKey: "C202" }],
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

  describe("_isClassesMapActive()", () => {
    it("should return false when all classes are not active", () => {
      const coursesMapCopy: CoursesMap = new Map();
      initializeCourseMap(coursesMapCopy);

      const course2 = coursesMapCopy.get("C2");
      if (!course2) throw Error("Missing course in courseMap");

      const C202 = coursesMapCopy.get("C2")?.get("C202");
      const C201 = coursesMapCopy.get("C2")?.get("C201");
      if (!C202 || !C201) throw Error("Missing class in courseMap");

      // Disable both C201 and C202 Classes
      C201.isActive = false;
      C202.isActive = false;

      expect(_isClassesMapActive(course2)).toBeFalsy();
    });

    it("should return true when more than 0 classes are active", () => {
      const coursesMapCopy: CoursesMap = new Map();
      initializeCourseMap(coursesMapCopy);

      const course2 = coursesMapCopy.get("C2");
      if (!course2) throw Error("Missing course in courseMap");

      const C201 = coursesMapCopy.get("C2")?.get("C201");
      if (!C201) throw Error("Missing class in courseMap");

      expect(_isClassesMapActive(course2)).toBeTruthy();

      // Disable C201 Class
      C201.isActive = false;
      expect(_isClassesMapActive(course2)).toBeTruthy();
    });
  });

  describe("generateSchedule()", () => {
    it("should generate schedules when all classes are active", function () {
      const schedules = generateSchedule(coursesMap);

      expect(schedules).toStrictEqual([
        [
          { courseKey: "C1", classKey: "C10101" },
          { courseKey: "C2", classKey: "C201" },
        ],
        [
          { courseKey: "C1", classKey: "C10102" },
          { courseKey: "C2", classKey: "C201" },
        ],
        [
          { courseKey: "C1", classKey: "C10102" },
          { courseKey: "C2", classKey: "C202" },
        ],
      ] as ClassID[][]);
    });
  });

  it("should generate some schedules when some classes aren't active", function () {
    const coursesMapCopy: CoursesMap = new Map();
    initializeCourseMap(coursesMapCopy);

    const C202 = coursesMapCopy.get("C2")?.get("C202");
    const C201 = coursesMapCopy.get("C2")?.get("C201");
    if (!C202 || !C201) throw Error("Missing class in courseMap");

    // Disable C202 Class
    C202.isActive = false;
    const schedulesC202 = generateSchedule(coursesMapCopy);
    C202.isActive = true;

    expect(schedulesC202).toStrictEqual([
      [
        { courseKey: "C1", classKey: "C10101" },
        { courseKey: "C2", classKey: "C201" },
      ],
      [
        { courseKey: "C1", classKey: "C10102" },
        { courseKey: "C2", classKey: "C201" },
      ],
    ] as ClassID[][]);

    // Disable C201 Class
    C201.isActive = false;
    const schedulesC201 = generateSchedule(coursesMapCopy);
    C201.isActive = true;

    expect(schedulesC201).toStrictEqual([
      [
        { courseKey: "C1", classKey: "C10102" },
        { courseKey: "C2", classKey: "C202" },
      ],
    ] as ClassID[][]);
  });

  it("should generate C1 schedules when all classes in C1 aren't active", function () {
    const coursesMapCopy: CoursesMap = new Map();
    initializeCourseMap(coursesMapCopy);

    const C202 = coursesMapCopy.get("C2")?.get("C202");
    const C201 = coursesMapCopy.get("C2")?.get("C201");
    if (!C202 || !C201) throw Error("Missing class in courseMap");

    // Disable both C201 and C202 Classes
    C201.isActive = false;
    C202.isActive = false;
    const schedulesC201C202 = generateSchedule(coursesMapCopy);
    C201.isActive = true;
    C202.isActive = true;

    expect(schedulesC201C202).toStrictEqual([
      [{ courseKey: "C1", classKey: "C10101" }],
      [{ courseKey: "C1", classKey: "C10102" }],
    ] as ClassID[][]);
  });

  it("should return an empty array when there is no schedule generated.", () => {
    const schedules = generateSchedule(new Map());
    expect(schedules).toStrictEqual([]);
  });
});

describe("parseClassInput() and generateSchedule()", () => {
  let coursesMap: CoursesMap;
  beforeEach(() => {
    const rawInputString =
      "IT092IU 	IT092IU 	 Principles of Programming Languages 	01	01	4	4	ITIT19CS1	35 	Full 	 *   	 Fri   Sat 	 7   1 	 4   3 	 LA1.607   ONLINE 	 N.Q.Phú   Q.T.Tho 	 07/03/2022--15/05/2022   07/02/2022--05/06/2022 	IT092IU 	IT092IU 	 Principles of Programming Languages 	01	02	4	4	ITIT19CS1	35 	4 	 *   	 Mon   Sat 	 1   1 	 4   3 	 LA1.607   ONLINE 	 N.Q.Phú   Q.T.Tho 	 07/03/2022--15/05/2022   07/02/2022--05/06/2022 	IT093IU 	IT093IU 	 Web Application Development 	01	03	4	4	ITIT19CS1	30 	15 	 *   	 Fri   Tue 	 7   7 	 4   3 	 LA1.605   ONLINE 	 N.V.Sinh   N.V.Sinh 	 07/03/2022--15/05/2022   07/02/2022--05/06/2022 	IT093IU 	IT093IU 	 Web Application Development 	01	02	4	4	ITIT19CS1	30 	Full 	 *   	 Thu   Tue 	 7   7 	 4   3 	 LA1.606   ONLINE 	 P.Q.S.Lam   N.V.Sinh 	 07/03/2022--15/05/2022   07/02/2022--05/06/2022 	IT093IU 	IT093IU 	 Web Application Development 	01	01	4	4	ITIT19CS1	30 	Full 	 *   	 Sat   Tue 	 7   7 	 4   3 	 LA1.608   ONLINE 	 P.Q.S.Lam   N.V.Sinh 	 07/03/2022--15/05/2022   07/02/2022--05/06/2022 	IT097IU 	IT097IU 	 Introduction to Artificial Intelligence 	01	01	4	4	ITIT19CS1	35 	3 	 *   	 Wed   Fri 	 1   1 	 4   3 	 LA1.606   ONLINE 	 P.Q.S.Lam   L.T.Sach 	 07/03/2022--15/05/2022   07/02/2022--05/06/2022 	IT097IU 	IT097IU 	 Introduction to Artificial Intelligence 	01	02	4	4	ITIT19CS1	35 	10 	 *   	 Wed   Fri 	 7   1 	 4   3 	 LA1.606   ONLINE 	 P.Q.S.Lam   L.T.Sach 	 07/03/2022--15/05/2022   07/02/2022--05/06/2022 	PE018IU 	PE018IU 	 History of Vietnamese Communist Party 	10		2	2	ITIT19CS1	75 	3 	 	 Wed 	 9 	 2 	 ONLINE 	 H.Y.Linh 	 07/02/2022--05/06/2022 	PE019IU 	PE019IU 	 Ho Chi Minh's Thoughts 	10		2	2	ITIT19CS1	75 	2 	 	 Wed 	 7 	 2 	 ONLINE 	 P.T.T.Huong 	 07/02/2022--05/06/2022";

    coursesMap = parseClassInput(rawInputString);
  });

  it("should generate all schedules from raw input string", function () {
    const schedules = generateSchedule(coursesMap);

    expect(schedules).toStrictEqual([
      [
        { courseKey: "IT092IU", classKey: "IT092IU0102" },
        { courseKey: "IT093IU", classKey: "IT093IU0103" },
        { courseKey: "IT097IU", classKey: "IT097IU0101" },
        { courseKey: "PE018IU", classKey: "PE018IU10" },
        { courseKey: "PE019IU", classKey: "PE019IU10" },
      ],
      [
        { courseKey: "IT092IU", classKey: "IT092IU0101" },
        { courseKey: "IT093IU", classKey: "IT093IU0102" },
        { courseKey: "IT097IU", classKey: "IT097IU0101" },
        { courseKey: "PE018IU", classKey: "PE018IU10" },
        { courseKey: "PE019IU", classKey: "PE019IU10" },
      ],
      [
        { courseKey: "IT092IU", classKey: "IT092IU0102" },
        { courseKey: "IT093IU", classKey: "IT093IU0102" },
        { courseKey: "IT097IU", classKey: "IT097IU0101" },
        { courseKey: "PE018IU", classKey: "PE018IU10" },
        { courseKey: "PE019IU", classKey: "PE019IU10" },
      ],
      [
        { courseKey: "IT092IU", classKey: "IT092IU0101" },
        { courseKey: "IT093IU", classKey: "IT093IU0101" },
        { courseKey: "IT097IU", classKey: "IT097IU0101" },
        { courseKey: "PE018IU", classKey: "PE018IU10" },
        { courseKey: "PE019IU", classKey: "PE019IU10" },
      ],
      [
        { courseKey: "IT092IU", classKey: "IT092IU0102" },
        { courseKey: "IT093IU", classKey: "IT093IU0101" },
        { courseKey: "IT097IU", classKey: "IT097IU0101" },
        { courseKey: "PE018IU", classKey: "PE018IU10" },
        { courseKey: "PE019IU", classKey: "PE019IU10" },
      ],
    ] as ClassID[][]);
  });

  it("should generate some schedules from raw input string when some classes aren't active", function () {
    const IT092IU0102 = coursesMap.get("IT092IU")?.get("IT092IU0102");
    const PE018IU10 = coursesMap.get("PE018IU")?.get("PE018IU10");
    if (!IT092IU0102 || !PE018IU10) throw Error("Missing class in courseMap");

    IT092IU0102.isActive = false;
    PE018IU10.isActive = false;
    const schedules = generateSchedule(coursesMap);

    expect(schedules).toStrictEqual([
      [
        { courseKey: "IT092IU", classKey: "IT092IU0101" },
        { courseKey: "IT093IU", classKey: "IT093IU0102" },
        { courseKey: "IT097IU", classKey: "IT097IU0101" },
        { courseKey: "PE019IU", classKey: "PE019IU10" },
      ],
      [
        { courseKey: "IT092IU", classKey: "IT092IU0101" },
        { courseKey: "IT093IU", classKey: "IT093IU0101" },
        { courseKey: "IT097IU", classKey: "IT097IU0101" },
        { courseKey: "PE019IU", classKey: "PE019IU10" },
      ],
    ] as ClassID[][]);
  });
});

function initializeCourseMap(courseMap: CoursesMap) {
  const classMapC1: ClassesMap = new Map();
  classMapC1.set("C10101", {
    id: "C10101",
    courseID: "C1",
    courseName: "Course1",
    date: ["Wed", "Fri"],
    startPeriod: [1, 7],
    periodsCount: [3, 4],
    isActive: true,
  });

  classMapC1.set("C10102", {
    id: "C10102",
    courseID: "C1",
    courseName: "Course1",
    date: ["Tue", "Fri"],
    startPeriod: [7, 7],
    periodsCount: [3, 4],
    isActive: true,
  });

  const classMapC2: ClassesMap = new Map();
  classMapC2.set("C201", {
    id: "C201",
    courseID: "C2",
    courseName: "Course2",
    date: ["Tue"],
    startPeriod: [1],
    periodsCount: [3],
    isActive: true,
  });

  classMapC2.set("C202", {
    id: "C202",
    courseID: "C2",
    courseName: "Course2",
    date: ["Wed"],
    startPeriod: [1],
    periodsCount: [3],
    isActive: true,
  });

  courseMap.set("C1", classMapC1);
  courseMap.set("C2", classMapC2);
}
