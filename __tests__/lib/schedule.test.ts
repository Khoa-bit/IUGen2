import { CoursesMap, parseClassInput } from "lib/classInput";
import { toggleClassState } from "lib/courseAndClassUtils";
import { BG_COLOR_PALETTE } from "pages/index";
import {
  ClassID,
  generateSchedule,
  mapColor,
  mapToCompleteSchedule,
  PERIODS_PER_DAY,
  _checkClassCollision,
  _extractDates,
  _serializeClassTime,
} from "lib/schedule";
import {
  addAdjacentCourses,
  _initializeCourseMap,
} from "__tests__/utilities/initializeCourseMap.setup";

describe("Schedule Generator", () => {
  const coursesMap: CoursesMap = new Map();
  beforeEach(() => {
    coursesMap.clear();
    _initializeCourseMap(coursesMap);
  });

  describe("_extractDates()", () => {
    it("should extract and serialize dates", function () {
      const class1 = coursesMap.get("C1")?.classesMap.get("C10101");
      const class2 = coursesMap.get("C2")?.classesMap.get("C201");
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
      const courseObjectC1 = coursesMap.get("C1");
      const courseObjectC2 = coursesMap.get("C2");
      if (!courseObjectC1 || !courseObjectC2)
        throw Error("Missing course in courseMap");

      // Check C1 classes
      const classObjectC10 = courseObjectC1.classesMap.get("C10101");
      if (!classObjectC10) throw Error("Missing Class C10101");
      expect(_serializeClassTime(classObjectC10)).toEqual([
        [2 * PERIODS_PER_DAY + 0, 2 * PERIODS_PER_DAY + 3],
        [4 * PERIODS_PER_DAY + 6, 4 * PERIODS_PER_DAY + 10],
      ]);

      const classObjectC11 = courseObjectC1.classesMap.get("C10102");
      if (!classObjectC11) throw Error("Missing Class C10102");
      expect(_serializeClassTime(classObjectC11)).toEqual([
        [1 * PERIODS_PER_DAY + 6, 1 * PERIODS_PER_DAY + 9],
        [4 * PERIODS_PER_DAY + 6, 4 * PERIODS_PER_DAY + 10],
      ]);

      // Check C2 classes
      const classObjectC20 = courseObjectC2.classesMap.get("C201");
      if (!classObjectC20) throw Error("Missing Class C201");
      expect(_serializeClassTime(classObjectC20)).toEqual([
        [1 * PERIODS_PER_DAY + 0, 1 * PERIODS_PER_DAY + 3],
      ]);

      const classObjectC21 = courseObjectC2.classesMap.get("C202");
      if (!classObjectC21) throw Error("Missing Class C202");
      expect(_serializeClassTime(classObjectC21)).toEqual([
        [2 * PERIODS_PER_DAY + 0, 2 * PERIODS_PER_DAY + 3],
      ]);
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
          location: ["AC11", "AC12"],
          lecturer: ["LC11", "LC12"],
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
          noAdjacent: false,
          minFreeDays: 0,
        })
      ).toBe(true);

      expect(
        _checkClassCollision({
          coursesMap,
          schedule: [...prefix, { courseKey: "C2", classKey: "C202" }],
          noAdjacent: false,
          minFreeDays: 0,
        })
      ).toBe(false);

      expect(() => {
        _checkClassCollision({
          coursesMap,
          schedule: [...prefix, { courseKey: "C2", classKey: "errorBad" }],
          noAdjacent: false,
          minFreeDays: 0,
        });
      }).toThrowError(/^Invalid ClassObject reference:/);

      expect(() => {
        _checkClassCollision({
          coursesMap,
          schedule: [...prefix, { courseKey: "INVALID", classKey: "errorBad" }],
          noAdjacent: false,
          minFreeDays: 0,
        });
      }).toThrowError(/^Invalid ClassObject reference:/);
    });
  });

  describe("generateSchedule()", () => {
    it("should generate schedules when all classes are active", function () {
      const { schedules, hasAnyActive } = generateSchedule(
        coursesMap,
        false,
        0
      );

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

      expect(hasAnyActive).toBe(true);
    });

    it("should generate some schedules when some classes aren't active", function () {
      const C202 = coursesMap.get("C2")?.classesMap.get("C202");
      const C201 = coursesMap.get("C2")?.classesMap.get("C201");
      if (!C202 || !C201) throw Error("Missing class in courseMap");

      // Disable C202 Class
      toggleClassState(coursesMap, C202);
      const { schedules: schedulesC202, hasAnyActive: hasAnyActiveC202 } =
        generateSchedule(coursesMap, false, 0);
      toggleClassState(coursesMap, C202);

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

      expect(hasAnyActiveC202).toBe(true);

      // Disable C201 Class
      toggleClassState(coursesMap, C201);
      const { schedules: schedulesC201, hasAnyActive: hasAnyActiveC201 } =
        generateSchedule(coursesMap, false, 0);
      toggleClassState(coursesMap, C201);

      expect(schedulesC201).toStrictEqual([
        [
          { courseKey: "C1", classKey: "C10102" },
          { courseKey: "C2", classKey: "C202" },
        ],
      ] as ClassID[][]);

      expect(hasAnyActiveC201).toBe(true);
    });

    it("should generate C1 schedules when all classes in C1 aren't active", function () {
      const courseObjectC2 = coursesMap.get("C2");
      if (!courseObjectC2) throw Error("Missing course in courseMap");

      const C202 = courseObjectC2.classesMap.get("C202");
      const C201 = courseObjectC2.classesMap.get("C201");
      if (!C202 || !C201) throw Error("Missing class in courseMap");

      // Disable both C201 and C202 Classes
      toggleClassState(coursesMap, C201);
      toggleClassState(coursesMap, C202);
      const { schedules: schedulesC201C202, hasAnyActive } = generateSchedule(
        coursesMap,
        false,
        0
      );
      toggleClassState(coursesMap, C201);
      toggleClassState(coursesMap, C202);

      expect(schedulesC201C202).toStrictEqual([
        [{ courseKey: "C1", classKey: "C10101" }],
        [{ courseKey: "C1", classKey: "C10102" }],
      ] as ClassID[][]);

      expect(hasAnyActive).toBe(true);
    });

    it("should return an empty array when there is no schedule generated.", () => {
      const { schedules, hasAnyActive } = generateSchedule(new Map(), false, 0);
      expect(schedules).toStrictEqual([]);

      expect(hasAnyActive).toBe(false);
    });

    it("should generate schedules with free days conditions", function () {
      const { schedules, hasAnyActive } = generateSchedule(
        coursesMap,
        false,
        4
      );

      expect(schedules).toStrictEqual([
        [
          { courseKey: "C1", classKey: "C10102" },
          { courseKey: "C2", classKey: "C201" },
        ],
      ] as ClassID[][]);

      expect(hasAnyActive).toBe(true);
    });

    it("should generate schedules with free days conditions", function () {
      addAdjacentCourses(coursesMap);
      const {
        schedules: adjacentSchedules,
        hasAnyActive: hasAnyActiveAdjacent,
      } = generateSchedule(coursesMap, false, 0);
      const {
        schedules: noAdjacentSchedules,
        hasAnyActive: hasAnyActiveNoAdjacent,
      } = generateSchedule(coursesMap, true, 0);

      expect(adjacentSchedules.length).toBe(9);
      expect(noAdjacentSchedules.length).toBe(5);

      expect(noAdjacentSchedules).toStrictEqual([
        [
          { courseKey: "C1", classKey: "C10102" },
          { courseKey: "C2", classKey: "C202" },
          { courseKey: "C3", classKey: "C301" },
        ],
        [
          { courseKey: "C1", classKey: "C10102" },
          { courseKey: "C2", classKey: "C201" },
          { courseKey: "C3", classKey: "C302" },
        ],
        [
          { courseKey: "C1", classKey: "C10101" },
          { courseKey: "C2", classKey: "C201" },
          { courseKey: "C3", classKey: "C303" },
        ],
        [
          { courseKey: "C1", classKey: "C10102" },
          { courseKey: "C2", classKey: "C201" },
          { courseKey: "C3", classKey: "C303" },
        ],
        [
          { courseKey: "C1", classKey: "C10102" },
          { courseKey: "C2", classKey: "C202" },
          { courseKey: "C3", classKey: "C303" },
        ],
      ] as ClassID[][]);

      expect(hasAnyActiveAdjacent).toBe(true);
      expect(hasAnyActiveNoAdjacent).toBe(true);
    });
  });

  describe("mapToCompleteSchedule()", () => {
    it("should map from Schedule to CompleteSchedule", () => {
      const C10101 = coursesMap.get("C1")?.classesMap.get("C10101");
      const C201 = coursesMap.get("C2")?.classesMap.get("C201");
      if (!C201 || !C10101) throw Error("Missing class in courseMap");

      const completeSchedule = mapToCompleteSchedule(coursesMap, [
        { courseKey: "C1", classKey: "C10101" },
        { courseKey: "C2", classKey: "C201" },
      ]);

      expect(completeSchedule.length).toBe(2);
      expect(completeSchedule[0].color).toMatch(BG_COLOR_PALETTE[0]); // Default color
      expect(completeSchedule[1].color).toMatch(BG_COLOR_PALETTE[0]); // Default color
      expect(completeSchedule[0].classObject).toBe(C10101);
      expect(completeSchedule[1].classObject).toBe(C201);
    });
  });

  describe("mapColor()", () => {
    it("should set color for all courses", () => {
      let originalColorArray: string[] = [];
      for (const courseObject of coursesMap.values()) {
        if (courseObject.color) originalColorArray.push(courseObject.color);
      }
      expect(originalColorArray.length).toEqual(0);

      const coloredMap = mapColor(coursesMap);

      let colorArray: string[] = [];
      for (const courseObject of coloredMap.values()) {
        if (courseObject.color) colorArray.push(courseObject.color);
      }
      expect(colorArray.length).toEqual(2);
      expect(colorArray[0]).toMatch(BG_COLOR_PALETTE[0]);
      expect(colorArray[1]).toMatch(BG_COLOR_PALETTE[1]);
    });
  });
});

describe("parseClassInput() and generateSchedule()", () => {
  let coursesMap: CoursesMap;
  beforeEach(() => {
    const rawInputString =
      "IT092IU 	IT092IU 	 Principles of Programming Languages 	01	01	4	4	ITIT19CS1	35 	Full 	 *   	 Fri   Sat 	 7   1 	 4   3 	 LA1.607   ONLINE 	 N.Q.Phú   Q.T.Tho 	 07/03/2022--15/05/2022   07/02/2022--05/06/2022 	IT092IU 	IT092IU 	 Principles of Programming Languages 	01	02	4	4	ITIT19CS1	35 	4 	 *   	 Mon   Sat 	 1   1 	 4   3 	 LA1.607   ONLINE 	 N.Q.Phú   Q.T.Tho 	 07/03/2022--15/05/2022   07/02/2022--05/06/2022 	IT093IU 	IT093IU 	 Web Application Development 	01	03	4	4	ITIT19CS1	30 	15 	 *   	 Fri   Tue 	 7   7 	 4   3 	 LA1.605   ONLINE 	 N.V.Sinh   N.V.Sinh 	 07/03/2022--15/05/2022   07/02/2022--05/06/2022 	IT093IU 	IT093IU 	 Web Application Development 	01	02	4	4	ITIT19CS1	30 	Full 	 *   	 Thu   Tue 	 7   7 	 4   3 	 LA1.606   ONLINE 	 P.Q.S.Lam   N.V.Sinh 	 07/03/2022--15/05/2022   07/02/2022--05/06/2022 	IT093IU 	IT093IU 	 Web Application Development 	01	01	4	4	ITIT19CS1	30 	Full 	 *   	 Sat   Tue 	 7   7 	 4   3 	 LA1.608   ONLINE 	 P.Q.S.Lam   N.V.Sinh 	 07/03/2022--15/05/2022   07/02/2022--05/06/2022 	IT097IU 	IT097IU 	 Introduction to Artificial Intelligence 	01	01	4	4	ITIT19CS1	35 	3 	 *   	 Wed   Fri 	 1   1 	 4   3 	 LA1.606   ONLINE 	 P.Q.S.Lam   L.T.Sach 	 07/03/2022--15/05/2022   07/02/2022--05/06/2022 	IT097IU 	IT097IU 	 Introduction to Artificial Intelligence 	01	02	4	4	ITIT19CS1	35 	10 	 *   	 Wed   Fri 	 7   1 	 4   3 	 LA1.606   ONLINE 	 P.Q.S.Lam   L.T.Sach 	 07/03/2022--15/05/2022   07/02/2022--05/06/2022 	PE018IU 	PE018IU 	 History of Vietnamese Communist Party 	10		2	2	ITIT19CS1	75 	3 	 	 Wed 	 9 	 2 	 ONLINE 	 H.Y.Linh 	 07/02/2022--05/06/2022 	PE019IU 	PE019IU 	 Ho Chi Minh's Thoughts 	10		2	2	ITIT19CS1	75 	2 	 	 Wed 	 7 	 2 	 ONLINE 	 P.T.T.Huong 	 07/02/2022--05/06/2022";

    coursesMap = parseClassInput(rawInputString, "firefox");
  });

  it("should generate all schedules from raw input string", function () {
    const { schedules } = generateSchedule(coursesMap, false, 0);

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
    const IT092IU0102 = coursesMap
      .get("IT092IU")
      ?.classesMap.get("IT092IU0102");
    const PE018IU10 = coursesMap.get("PE018IU")?.classesMap.get("PE018IU10");
    if (!IT092IU0102 || !PE018IU10) throw Error("Missing class in courseMap");

    toggleClassState(coursesMap, IT092IU0102);
    toggleClassState(coursesMap, PE018IU10);
    const { schedules } = generateSchedule(coursesMap);
    toggleClassState(coursesMap, IT092IU0102);
    toggleClassState(coursesMap, PE018IU10);

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
