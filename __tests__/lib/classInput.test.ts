import {
  ClassObject,
  _toClassObject,
  _mapCoursesFirefox,
  parseClassInput,
  _mapCoursesChromium,
  _fillOptionalFields,
} from "lib/classInput";

describe("_mapCoursesFirefox()", () => {
  it("should return courses Map with respective course ID", function () {
    const parseData = [
      "IT134IU",
      "IT134IU",
      "Internet of Things",
      "01",
      "01",
      "4",
      "4",
      "ITIT19CE",
      "30",
      "6",
      "*",
      "Mon___Sat",
      "7___4",
      "4___3",
      "LA1.607___L201",
      "L.D.Tân___L.D.Tân",
      "07/03/2022--15/05/2022___07/02/2022--05/06/2022",
      "PE018IU",
      "PE018IU",
      "History of Vietnamese Communist Party",
      "10",
      "",
      "2",
      "2",
      "ITIT19CS1",
      "75",
      "2",
      "",
      "Wed",
      "9",
      "2",
      "ONLINE",
      "H.Y.Linh",
      "07/02/2022--05/06/2022",
    ];
    const coursesMap = _mapCoursesFirefox(parseData);

    expect(coursesMap.size).toEqual(2);
    expect(coursesMap.has("IT134IU")).toBeTruthy();
    expect(coursesMap.has("PE018IU")).toBeTruthy();
    expect(coursesMap.get("IT134IU")?.classesMap.size).toEqual(1);
    expect(coursesMap.get("PE018IU")?.classesMap.size).toEqual(1);

    const class0 = coursesMap.get("IT134IU")?.classesMap.get("IT134IU0101");
    expect(JSON.stringify(class0)).toMatch(
      '{"id":"IT134IU0101","courseID":"IT134IU","courseName":"Internet of Things","date":["Mon","Sat"],"startPeriod":[7,4],"periodsCount":[4,3],"location":["LA1.607","L201"],"lecturer":["L.D.Tân","L.D.Tân"],"isActive":true}'
    );

    const class1 = coursesMap.get("PE018IU")?.classesMap.get("PE018IU10");
    expect(JSON.stringify(class1)).toMatch(
      '{"id":"PE018IU10","courseID":"PE018IU","courseName":"History of Vietnamese Communist Party","date":["Wed"],"startPeriod":[9],"periodsCount":[2],"location":["ONLINE"],"lecturer":["H.Y.Linh"],"isActive":true}'
    );
  });
});

describe("_mapCoursesChromium()", () => {
  it("should return courses Map with respective course ID", function () {
    const parseData = [
      "IT134IU",
      "IT134IU",
      "Internet of Things",
      "01",
      "01",
      "4",
      "4",
      "ITIT19CE",
      "30",
      "6",
      "*___Mon___Sat 7___4 4___3 LA1.607___L201 L.D.Tân___L.D.Tân 07/03/2022--15/05/2022___07/02/2022--05/06/2022",
      "PE018IU",
      "PE018IU",
      "History of Vietnamese Communist Party",
      "10",
      "",
      "2",
      "2",
      "ITIT19CS1",
      "75",
      "2",
      "Wed 9 2 ONLINE H.Y.Linh 07/02/2022--05/06/2022",
    ];
    const coursesMap = _mapCoursesChromium(parseData);

    expect(coursesMap.size).toEqual(2);
    expect(coursesMap.has("IT134IU")).toBeTruthy();
    expect(coursesMap.has("PE018IU")).toBeTruthy();
    expect(coursesMap.get("IT134IU")?.classesMap.size).toEqual(1);
    expect(coursesMap.get("PE018IU")?.classesMap.size).toEqual(1);

    const class0 = coursesMap.get("IT134IU")?.classesMap.get("IT134IU0101");
    expect(JSON.stringify(class0)).toMatch(
      '{"id":"IT134IU0101","courseID":"IT134IU","courseName":"Internet of Things","date":["Mon","Sat"],"startPeriod":[7,4],"periodsCount":[4,3],"location":["LA1.607","L201"],"lecturer":["L.D.Tân","L.D.Tân"],"isActive":true}'
    );

    const class1 = coursesMap.get("PE018IU")?.classesMap.get("PE018IU10");
    expect(JSON.stringify(class1)).toMatch(
      '{"id":"PE018IU10","courseID":"PE018IU","courseName":"History of Vietnamese Communist Party","date":["Wed"],"startPeriod":[9],"periodsCount":[2],"location":["ONLINE"],"lecturer":["H.Y.Linh"],"isActive":true}'
    );
  });
});

describe("_fillOptionalFields()", function () {
  it("should fill in 3 optional fields - hasLab, hasLocation, hasLecturer", function () {
    const classStrArray = [
      "IT092IU",
      "IT092IU",
      "Principles of Programming Languages",
      "02",
      "01",
      "4",
      "4",
      "ITIT19CS2",
      "35",
      "5",
      "Fri___Wed",
      "1___7",
      "4___3",
      "07/03/2022--15/05/2022___07/02/2022--05/06/2022",
    ];

    const expectedClassStrArray = [
      "IT092IU",
      "IT092IU",
      "Principles of Programming Languages",
      "02",
      "01",
      "4",
      "4",
      "ITIT19CS2",
      "35",
      "5",
      "___",
      "Fri___Wed",
      "1___7",
      "4___3",
      "-___-",
      "-___-",
      "07/03/2022--15/05/2022___07/02/2022--05/06/2022",
    ];

    const filledClassStrArray = _fillOptionalFields(classStrArray);
    expect(filledClassStrArray.toString()).toMatch(
      expectedClassStrArray.toString()
    );
  });

  it("should fill in 2 optional fields - hasLocation, hasLecturer (Lab is '*')", function () {
    const classStrArrayLabStar = [
      "IT092IU",
      "IT092IU",
      "Principles of Programming Languages",
      "02",
      "01",
      "4",
      "4",
      "ITIT19CS2",
      "35",
      "5",
      "*",
      "Fri___Wed",
      "1___7",
      "4___3",
      "07/03/2022--15/05/2022___07/02/2022--05/06/2022",
    ];

    const expectedClassStrArrayLabStar = [
      "IT092IU",
      "IT092IU",
      "Principles of Programming Languages",
      "02",
      "01",
      "4",
      "4",
      "ITIT19CS2",
      "35",
      "5",
      "*",
      "Fri___Wed",
      "1___7",
      "4___3",
      "-___-",
      "-___-",
      "07/03/2022--15/05/2022___07/02/2022--05/06/2022",
    ];

    const filledClassArrayLabStar = _fillOptionalFields(classStrArrayLabStar);
    expect(filledClassArrayLabStar.toString()).toMatch(
      expectedClassStrArrayLabStar.toString()
    );
  });

  it("should fill in 2 optional fields - hasLocation, hasLecturer (Lab is '')", function () {
    const classStrArrayLabBlank = [
      "IT092IU",
      "IT092IU",
      "Principles of Programming Languages",
      "02",
      "01",
      "4",
      "4",
      "ITIT19CS2",
      "35",
      "5",
      "",
      "Fri___Wed",
      "1___7",
      "4___3",
      "07/03/2022--15/05/2022___07/02/2022--05/06/2022",
    ];

    const expectedClassStrArrayLabBlank = [
      "IT092IU",
      "IT092IU",
      "Principles of Programming Languages",
      "02",
      "01",
      "4",
      "4",
      "ITIT19CS2",
      "35",
      "5",
      "",
      "Fri___Wed",
      "1___7",
      "4___3",
      "-___-",
      "-___-",
      "07/03/2022--15/05/2022___07/02/2022--05/06/2022",
    ];

    const filledClassArrayLabBlank = _fillOptionalFields(classStrArrayLabBlank);
    expect(filledClassArrayLabBlank.toString()).toMatch(
      expectedClassStrArrayLabBlank.toString()
    );
  });

  it("should throw if missing week date", function () {
    const classStrArray = [
      "IT092IU",
      "IT092IU",
      "Principles of Programming Languages",
      "02",
      "01",
      "4",
      "4",
      "ITIT19CS2",
      "35",
      "5",
      "*",
      "1___7",
      "4___3",
      "LA1.608___ONLINE",
      "N.Q.Phú___Q.T.Tho",
      "07/03/2022--15/05/2022___07/02/2022--05/06/2022",
    ];

    expect(() => _fillOptionalFields(classStrArray)).toThrowError(
      /^Missing date for class:/
    );
  });
});

describe("_toClassObject()", function () {
  it("should turn string array to class Object with fields", function () {
    const classStrArray = [
      "IT092IU",
      "IT092IU",
      "Principles of Programming Languages",
      "02",
      "01",
      "4",
      "4",
      "ITIT19CS2",
      "35",
      "5",
      "*",
      "Fri___Wed",
      "1___7",
      "4___3",
      "LA1.608___ONLINE",
      "N.Q.Phú___Q.T.Tho",
      "07/03/2022--15/05/2022___07/02/2022--05/06/2022",
    ];

    const classObject = _toClassObject(classStrArray);
    const expectedObject: ClassObject = {
      id: "IT092IU0201",
      courseID: "IT092IU",
      courseName: "Principles of Programming Languages",
      date: ["Fri", "Wed"],
      startPeriod: [1, 7],
      periodsCount: [4, 3],
      location: ["LA1.608", "ONLINE"],
      lecturer: ["N.Q.Phú", "Q.T.Tho"],
      isActive: true,
    };
    expect(classObject).toStrictEqual(expectedObject);
  });

  it("should turn string array to class Object with Vietnamese fields", function () {
    const classStrArray = [
      "IT092IU",
      "IT092IU",
      "Principles of Programming Languages",
      "02",
      "01",
      "4",
      "4",
      "ITIT19CS2",
      "35",
      "5",
      "*",
      "Sáu___Tư",
      "1___7",
      "4___3",
      "LA1.608___ONLINE",
      "N.Q.Phú___Q.T.Tho",
      "07/03/2022--15/05/2022___07/02/2022--05/06/2022",
    ];

    const classObject = _toClassObject(classStrArray);
    const expectedObject: ClassObject = {
      id: "IT092IU0201",
      courseID: "IT092IU",
      courseName: "Principles of Programming Languages",
      date: ["Fri", "Wed"],
      startPeriod: [1, 7],
      periodsCount: [4, 3],
      location: ["LA1.608", "ONLINE"],
      lecturer: ["N.Q.Phú", "Q.T.Tho"],
      isActive: true,
    };
    expect(classObject).toStrictEqual(expectedObject);
  });

  it("should throw an Error due to missing periods for dates", function () {
    const classStrArray = [
      "IT092IU",
      "IT092IU",
      "Principles of Programming Languages",
      "02",
      "01",
      "4",
      "4",
      "ITIT19CS2",
      "35",
      "5",
      "*",
      "Fri___Wed",
      "7", // Missing startPeriod for "Fri" date
      "4___3",
      "LA1.608___ONLINE",
      "N.Q.Phú___Q.T.Tho",
      "07/03/2022--15/05/2022___07/02/2022--05/06/2022",
    ];

    expect(() => {
      _toClassObject(classStrArray);
    }).toThrowError(/^Missing date or startPeriod or periodsCount:/);
  });

  it("should throw an Error due to invalid week date", function () {
    const classStrArray = [
      "IT092IU",
      "IT092IU",
      "Principles of Programming Languages",
      "02",
      "01",
      "4",
      "4",
      "ITIT19CS2",
      "35",
      "5",
      "*",
      "Fri___What?", // Invalid WeekDate
      "1___7",
      "4___3",
      "LA1.608___ONLINE",
      "N.Q.Phú___Q.T.Tho",
      "07/03/2022--15/05/2022___07/02/2022--05/06/2022",
    ];

    expect(() => {
      _toClassObject(classStrArray);
    }).toThrowError(/^Invalid week date format: What\? in/);
  });
});

describe("parseClassInput() - Firefox", () => {
  it("should parse raw class input string into CoursesMap Map", () => {
    const rawInputString =
      "IT134IU 	IT134IU 	 Internet of Things 	01	01	4	4	ITIT19CE	30 	6 	 *   	 Mon   Sat 	 7   4 	 4   3 	 LA1.607   L201 	 L.D.Tân   L.D.Tân 	 07/03/2022--15/05/2022   07/02/2022--05/06/2022 	PE018IU 	PE018IU 	 History of Vietnamese Communist Party 	10		2	2	ITIT19CS1	75 	2 	 	 Wed 	 9 	 2 	 ONLINE 	 H.Y.Linh 	 07/02/2022--05/06/2022";

    const coursesMap = parseClassInput(rawInputString, "firefox");

    const class0 = coursesMap.get("IT134IU")?.classesMap.get("IT134IU0101");
    expect(JSON.stringify(class0)).toMatch(
      '{"id":"IT134IU0101","courseID":"IT134IU","courseName":"Internet of Things","date":["Mon","Sat"],"startPeriod":[7,4],"periodsCount":[4,3],"location":["LA1.607","L201"],"lecturer":["L.D.Tân","L.D.Tân"],"isActive":true}'
    );

    const class1 = coursesMap.get("PE018IU")?.classesMap.get("PE018IU10");
    expect(JSON.stringify(class1)).toMatch(
      '{"id":"PE018IU10","courseID":"PE018IU","courseName":"History of Vietnamese Communist Party","date":["Wed"],"startPeriod":[9],"periodsCount":[2],"location":["ONLINE"],"lecturer":["H.Y.Linh"],"isActive":true}'
    );
  });

  it("should parse raw Google Sheet class input string into CoursesMap Map", () => {
    // !DEPRECATED Google Sheet Parsing.
    const rawInputString = `IT134IU	IT134IU	Internet of Things	1	1	4	4	ITIT19CE	30	9	*	"Mon   Sat"	"7   4"	"4   3"	"LA1.607   L201"	"L.D.Tân   L.D.Tân"	"07/03/2022--15/05/2022   07/02/2022--05/06/2022"	 PE018IU	PE018IU	History of Vietnamese Communist Party	10		2	2	ITIT19CS1	75	3		Wed	9	2	ONLINE	H.Y.Linh	07/02/2022--05/06/2022	`;

    const coursesMap = parseClassInput(rawInputString, "firefox");

    const class0 = coursesMap.get("IT134IU")?.classesMap.get("IT134IU11");
    expect(JSON.stringify(class0)).toMatch(
      '{"id":"IT134IU11","courseID":"IT134IU","courseName":"Internet of Things","date":["Mon","Sat"],"startPeriod":[7,4],"periodsCount":[4,3],"location":["LA1.607","L201"],"lecturer":["L.D.Tân","L.D.Tân"],"isActive":true}'
    );

    const class1 = coursesMap.get("PE018IU")?.classesMap.get("PE018IU10");
    expect(JSON.stringify(class1)).toMatch(
      '{"id":"PE018IU10","courseID":"PE018IU","courseName":"History of Vietnamese Communist Party","date":["Wed"],"startPeriod":[9],"periodsCount":[2],"location":["ONLINE"],"lecturer":["H.Y.Linh"],"isActive":true}'
    );
  });

  it("should throw Error for invalid input string", () => {
    // Missing column for "IT134IU" (missing a tab)
    const errorInput =
      "IT134IU 	 Internet of Things 	01	01	4	4	ITIT19CE	30 	6 	 *   	 Mon   Sat 	 7   4 	 4   3 	 LA1.607   L201 	 L.D.Tân   L.D.Tân 	 07/03/2022--15/05/2022   07/02/2022--05/06/2022";

    expect(() => {
      parseClassInput("Hello? :V", "firefox");
    }).toThrowError("Failed to match: Missing columns");

    expect(() => {
      parseClassInput(errorInput, "firefox");
    }).toThrowError("Failed to match: Missing columns");
  });
});

describe("parseClassInput() - Chromium", () => {
  it("should parse raw class input string into CoursesMap Map", () => {
    const rawInputString =
      "IT134IU	IT134IU	 Internet of Things	01	01	4	4	ITIT19CE	30	6	 *   Mon   Sat 7   4 4   3 LA1.607   L201 L.D.Tân   L.D.Tân 07/03/2022--15/05/2022   07/02/2022--05/06/2022 	PE018IU	PE018IU	 History of Vietnamese Communist Party	10		2	2	ITIT19CS1	75	2	 Wed 9 2 ONLINE H.Y.Linh 07/02/2022--05/06/2022";
    const coursesMap = parseClassInput(rawInputString, "chromium");

    const class0 = coursesMap.get("IT134IU")?.classesMap.get("IT134IU0101");
    expect(JSON.stringify(class0)).toMatch(
      '{"id":"IT134IU0101","courseID":"IT134IU","courseName":"Internet of Things","date":["Mon","Sat"],"startPeriod":[7,4],"periodsCount":[4,3],"location":["LA1.607","L201"],"lecturer":["L.D.Tân","L.D.Tân"],"isActive":true}'
    );

    const class1 = coursesMap.get("PE018IU")?.classesMap.get("PE018IU10");
    expect(JSON.stringify(class1)).toMatch(
      '{"id":"PE018IU10","courseID":"PE018IU","courseName":"History of Vietnamese Communist Party","date":["Wed"],"startPeriod":[9],"periodsCount":[2],"location":["ONLINE"],"lecturer":["H.Y.Linh"],"isActive":true}'
    );
  });

  it("should throw Error for invalid input string", () => {
    // Missing column for "IT134IU" (missing a tab)
    const errorInput =
      "IT134IU	 Internet of Things	01	01	4	4	ITIT19CE	30	6	 *   Mon   Sat 7   4 4   3 LA1.607   L201 L.D.Tân   L.D.Tân 07/03/2022--15/05/2022   07/02/2022--05/06/2022";

    expect(() => {
      parseClassInput("Hello? :V", "chromium");
    }).toThrowError("Failed to match: Missing columns");

    expect(() => {
      parseClassInput(errorInput, "chromium");
    }).toThrowError("Failed to match: Missing columns");
  });
});
