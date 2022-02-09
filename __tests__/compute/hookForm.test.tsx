import {
  mapCourses,
  ClassObject,
  toClassObject,
} from "../../pages/compute/hookForm";

describe("mapCourses", () => {
  it("should return courses Map with respective course ID (with labs)", function () {
    const inputData =
      "IT092IU \tIT092IU \t Principles of Programming Languages \t02\t01\t4\t4\tITIT19CS2\t35 \t5 \t *   \t Sáu   Tư \t 1   7 \t 4   3 \t LA1.608   ONLINE \t N.Q.Phú   Q.T.Tho \t 07/03/2022--15/05/2022   07/02/2022--05/06/2022 \tIT092IU \tIT092IU \t Principles of Programming Languages \t02\t02\t4\t4\tITIT19CS2\t35 \t1 \t *   \t Năm   Tư \t 1   7 \t 4   3 \t LA1.302   ONLINE \t N.Q.Phú   Q.T.Tho \t 07/03/2022--15/05/2022   07/02/2022--05/06/2022 \tIT093IU \tIT093IU \t Web Application Development \t01\t03\t4\t4\tITIT19CS1\t30 \t12 \t *   \t Sáu   Ba \t 7   7 \t 4   3 \t LA1.605   ONLINE \t N.V.Sinh   N.V.Sinh \t 07/03/2022--15/05/2022   07/02/2022--05/06/2022";

    const rawData = inputData.split("\t");

    const coursesMap = mapCourses(rawData);

    expect(coursesMap.size).toEqual(2);
    expect(coursesMap.has("IT092IU")).toBeTruthy();
    expect(coursesMap.has("IT093IU")).toBeTruthy();
    expect(coursesMap.get("IT092IU")?.length).toEqual(2);
    expect(coursesMap.get("IT092IU")?.at(0)?.length).toEqual(17);
    expect(coursesMap.get("IT092IU")?.at(1)?.length).toEqual(17);
    expect(coursesMap.get("IT093IU")?.length).toEqual(1);
    expect(coursesMap.get("IT093IU")?.at(0)?.length).toEqual(17);
  });

  it("should return courses Map with respective course ID (without have labs)", function () {
    const inputData =
      "PE018IU \tPE018IU \t History of Vietnamese Communist Party \t10\t\t2\t2\tITIT19CS1\t75 \t3 \t\tTư\t9\t2\tONLINE\tH.Y.Linh\t07/02/2022--05/06/2022\tPE019IU \tPE019IU \t Ho Chi Minh's Thoughts \t10\t\t2\t2\tITIT19CS1\t75 \tHết \t\tTư\t7\t2\tONLINE\tP.T.T.Huong\t07/02/2022--05/06/2022";

    const rawData = inputData.split("\t");

    const coursesMap = mapCourses(rawData);

    expect(coursesMap.size).toEqual(2);
    expect(coursesMap.has("PE018IU")).toBeTruthy();
    expect(coursesMap.has("PE019IU")).toBeTruthy();
    expect(coursesMap.get("PE018IU")?.length).toEqual(1);
    expect(coursesMap.get("PE018IU")?.at(0)?.length).toEqual(17);
    expect(coursesMap.get("PE019IU")?.length).toEqual(1);
    expect(coursesMap.get("PE019IU")?.at(0)?.length).toEqual(17);
  });

  it("should return courses Map with respective course ID (with and without labs)", function () {
    const inputData =
      "IT134IU \tIT134IU \t Internet of Things \t01\t01\t4\t4\tITIT19CE\t30 \t3 \t *\tHaiBảy\t74\t43\tLA1.607L201\tL.D.TânL.D.Tân\t07/03/2022--15/05/202207/02/2022--05/06/2022\tPE018IU \tPE018IU \t History of Vietnamese Communist Party \t10\t\t2\t2\tITIT19CS1\t75 \t3 \t\tTư\t9\t2\tONLINE\tH.Y.Linh\t07/02/2022--05/06/2022";

    const rawData = inputData.split("\t");

    const coursesMap = mapCourses(rawData);

    expect(coursesMap.size).toEqual(2);
    expect(coursesMap.has("IT134IU")).toBeTruthy();
    expect(coursesMap.has("PE018IU")).toBeTruthy();
    expect(coursesMap.get("IT134IU")?.length).toEqual(1);
    expect(coursesMap.get("IT134IU")?.at(0)?.length).toEqual(17);
    expect(coursesMap.get("PE018IU")?.length).toEqual(1);
    expect(coursesMap.get("PE018IU")?.at(0)?.length).toEqual(17);
  });
});

describe("toClassObject", function () {
  it("should turn string array to class Object with fields", function () {
    let classStrArray = [
      "IT092IU ",
      "IT092IU ",
      " Principles of Programming Languages ",
      "02",
      "01",
      "4",
      "4",
      "ITIT19CS2",
      "35 ",
      "5 ",
      " *   ",
      " Fri   Wed ",
      " 1   7 ",
      " 4   3 ",
      " LA1.608   ONLINE ",
      " N.Q.Phú   Q.T.Tho ",
      " 07/03/2022--15/05/2022   07/02/2022--05/06/2022 ",
    ];

    let expectedObject: ClassObject = {
      courseID: "IT092IU",
      courseName: "Principles of Programming Languages",
      hasLab: true,
      date: ["Fri", "Wed"],
      startPeriod: [1, 7],
      periodsCount: [4, 3],
    };

    let classObject = toClassObject(classStrArray);
    expect(classObject).toStrictEqual(expectedObject);
  });
});
