import { CoursesMap } from "lib/classInput";
import {
  getActiveClasses,
  deleteClass,
  deleteCourse,
  getAllState,
  getCourseState,
  toggleAllState,
  toggleClassState,
  toggleCourseState,
  getActiveCourses,
} from "lib/courseAndClassUtils";
import { _initializeCourseMap } from "__tests__/utilities/initializeCourseMap.setup";

describe("Course and Class utilities", () => {
  const coursesMap: CoursesMap = new Map();

  beforeEach(() => {
    _initializeCourseMap(coursesMap);
  });

  describe("getActiveClasses()", () => {
    it("should get all active classes", () => {
      const courseObjectC2 = coursesMap.get("C2");
      if (!courseObjectC2) throw Error("Missing course in courseMap");
      const C202 = courseObjectC2.classesMap.get("C202");
      const C201 = courseObjectC2.classesMap.get("C201");
      if (!C202 || !C201) throw Error("Missing class in courseMap");
      // Disable and enable both C201 and C202 Classes
      expect(
        JSON.stringify(Array.from(getActiveClasses(courseObjectC2).entries()))
      ).toEqual(
        '[["C201",{"id":"C201","courseID":"C2","courseName":"Course2","date":["Tue"],"startPeriod":[1],"periodsCount":[3],"location":["AC21"],"lecturer":["LC21"],"isActive":true}],["C202",{"id":"C202","courseID":"C2","courseName":"Course2","date":["Wed"],"startPeriod":[1],"periodsCount":[3],"location":["AC21"],"lecturer":["LC21"],"isActive":true}]]'
      );
      expect(toggleClassState(coursesMap, C201)).toBe(false);
      expect(C201.isActive).toBe(false);
      expect(
        JSON.stringify(Array.from(getActiveClasses(courseObjectC2).entries()))
      ).toEqual(
        '[["C202",{"id":"C202","courseID":"C2","courseName":"Course2","date":["Wed"],"startPeriod":[1],"periodsCount":[3],"location":["AC21"],"lecturer":["LC21"],"isActive":true}]]'
      );
      expect(toggleClassState(coursesMap, C202)).toBe(false);
      expect(C202.isActive).toBe(false);
      expect(
        JSON.stringify(Array.from(getActiveClasses(courseObjectC2).entries()))
      ).toEqual("[]");
      expect(toggleClassState(coursesMap, C201)).toBe(true);
      expect(C201.isActive).toBe(true);
      expect(
        JSON.stringify(Array.from(getActiveClasses(courseObjectC2).entries()))
      ).toEqual(
        '[["C201",{"id":"C201","courseID":"C2","courseName":"Course2","date":["Tue"],"startPeriod":[1],"periodsCount":[3],"location":["AC21"],"lecturer":["LC21"],"isActive":true}]]'
      );
      expect(toggleClassState(coursesMap, C202)).toBe(true);
      expect(C202.isActive).toBe(true);
      expect(
        JSON.stringify(Array.from(getActiveClasses(courseObjectC2).entries()))
      ).toEqual(
        '[["C201",{"id":"C201","courseID":"C2","courseName":"Course2","date":["Tue"],"startPeriod":[1],"periodsCount":[3],"location":["AC21"],"lecturer":["LC21"],"isActive":true}],["C202",{"id":"C202","courseID":"C2","courseName":"Course2","date":["Wed"],"startPeriod":[1],"periodsCount":[3],"location":["AC21"],"lecturer":["LC21"],"isActive":true}]]'
      );
    });
  });

  describe("getActiveCourses()", () => {
    it("should get all active courses", () => {
      const courseObjectC1 = coursesMap.get("C1");
      const courseObjectC2 = coursesMap.get("C2");
      if (!courseObjectC1 || !courseObjectC2)
        throw Error("Missing course in courseMap");

      expect(
        JSON.stringify(Array.from(getActiveCourses(coursesMap).entries()))
      ).toEqual(
        '[["C1",{"id":"C1","name":"Course1","classesMap":{}}],["C2",{"id":"C2","name":"Course2","classesMap":{}}]]'
      );
      expect(toggleCourseState(coursesMap, courseObjectC1)).toBe(false);
      expect(
        JSON.stringify(Array.from(getActiveCourses(coursesMap).entries()))
      ).toEqual('[["C2",{"id":"C2","name":"Course2","classesMap":{}}]]');
      expect(toggleCourseState(coursesMap, courseObjectC2)).toBe(false);
      expect(
        JSON.stringify(Array.from(getActiveCourses(coursesMap).entries()))
      ).toEqual("[]");
      expect(toggleCourseState(coursesMap, courseObjectC1)).toBe(true);
      expect(
        JSON.stringify(Array.from(getActiveCourses(coursesMap).entries()))
      ).toEqual('[["C1",{"id":"C1","name":"Course1","classesMap":{}}]]');
      expect(toggleCourseState(coursesMap, courseObjectC2)).toBe(true);
      expect(
        JSON.stringify(Array.from(getActiveCourses(coursesMap).entries()))
      ).toEqual(
        '[["C1",{"id":"C1","name":"Course1","classesMap":{}}],["C2",{"id":"C2","name":"Course2","classesMap":{}}]]'
      );
    });
  });

  describe("toggleClassState()", () => {
    it("should toggle class state", () => {
      const courseObjectC2 = coursesMap.get("C2");
      if (!courseObjectC2) throw Error("Missing course in courseMap");
      const C202 = courseObjectC2.classesMap.get("C202");
      const C201 = courseObjectC2.classesMap.get("C201");
      if (!C202 || !C201) throw Error("Missing class in courseMap");
      // Disable and enable both C201 and C202 Classes
      expect(getActiveClasses(courseObjectC2).size).toEqual(2);
      expect(toggleClassState(coursesMap, C201)).toBe(false);
      expect(C201.isActive).toBe(false);
      expect(getActiveClasses(courseObjectC2).size).toEqual(1);
      expect(toggleClassState(coursesMap, C202)).toBe(false);
      expect(C202.isActive).toBe(false);
      expect(getActiveClasses(courseObjectC2).size).toEqual(0);
      expect(toggleClassState(coursesMap, C201)).toBe(true);
      expect(C201.isActive).toBe(true);
      expect(getActiveClasses(courseObjectC2).size).toEqual(1);
      expect(toggleClassState(coursesMap, C202)).toBe(true);
      expect(C202.isActive).toBe(true);
      expect(getActiveClasses(courseObjectC2).size).toEqual(2);
    });
    it("should set class state", () => {
      const courseObjectC2 = coursesMap.get("C2");
      if (!courseObjectC2) throw Error("Missing course in courseMap");
      const C202 = courseObjectC2.classesMap.get("C202");
      const C201 = courseObjectC2.classesMap.get("C201");
      if (!C202 || !C201) throw Error("Missing class in courseMap");
      // Disable both C201 and C202 Classes
      expect(getActiveClasses(courseObjectC2).size).toEqual(2);
      expect(toggleClassState(coursesMap, C201)).toBe(false);
      expect(C201.isActive).toBe(false);
      expect(getActiveClasses(courseObjectC2).size).toEqual(1);
      expect(toggleClassState(coursesMap, C201, false)).toBe(false);
      expect(C201.isActive).toBe(false);
      expect(getActiveClasses(courseObjectC2).size).toEqual(1);
      expect(toggleClassState(coursesMap, C201, true)).toBe(true);
      expect(C201.isActive).toBe(true);
      expect(getActiveClasses(courseObjectC2).size).toEqual(2);
      expect(toggleClassState(coursesMap, C202)).toBe(false);
      expect(C202.isActive).toBe(false);
      expect(getActiveClasses(courseObjectC2).size).toEqual(1);
    });
  });

  describe("deleteClass()", () => {
    it("should delete class with correct ClassObject", () => {
      const courseObjectC2 = coursesMap.get("C2");
      if (!courseObjectC2) throw Error("Missing course in courseMap");
      const C202 = courseObjectC2.classesMap.get("C202");
      const C201 = courseObjectC2.classesMap.get("C201");
      if (!C202 || !C201) throw Error("Missing class in courseMap");
      expect(getActiveClasses(courseObjectC2).size).toEqual(2);
      toggleClassState(coursesMap, C201);
      expect(C201.isActive).toBe(false);
      expect(getActiveClasses(courseObjectC2).size).toEqual(1);
      deleteClass(coursesMap, C201);
      expect(getActiveClasses(courseObjectC2).size).toEqual(1);
      expect(courseObjectC2.classesMap.get("C201")).toBeUndefined();
      deleteClass(coursesMap, C202);
      expect(getActiveClasses(courseObjectC2).size).toEqual(0);
      expect(courseObjectC2.classesMap.get("C202")).toBeUndefined();
      // Delete CourseObject when there is no classes left
      expect(coursesMap.get(courseObjectC2.id)).toBeUndefined;
    });
    it("should throw error with incorrect ClassObject", () => {
      const courseObjectC2 = coursesMap.get("C2");
      if (!courseObjectC2) throw Error("Missing course in courseMap");
      const C202 = courseObjectC2.classesMap.get("C202");
      const C201 = courseObjectC2.classesMap.get("C201");
      if (!C202 || !C201) throw Error("Missing class in courseMap");
      C201.courseID = "Error";
      C202.id = "Error";
      expect(() => deleteClass(coursesMap, C201)).toThrowError(
        /^Invalid ClassObject reference:/
      );
      expect(() => deleteClass(coursesMap, C202)).toThrowError(
        /^Invalid ClassObject reference:/
      );
    });
  });

  describe("getCourseState()", () => {
    it("should return boolean for the state of the course", () => {
      const courseObjectC1 = coursesMap.get("C1");
      const courseObjectC2 = coursesMap.get("C2");
      if (!courseObjectC1 || !courseObjectC2) {
        throw Error("Missing course in courseMap");
      }
      const C202 = courseObjectC2.classesMap.get("C202");
      const C201 = courseObjectC2.classesMap.get("C201");
      if (!C202 || !C201) throw Error("Missing class in courseMap");
      expect(getCourseState(courseObjectC2)).toBe(true);
      toggleClassState(coursesMap, C202, false);
      expect(getCourseState(courseObjectC2)).toBe(false);
      toggleClassState(coursesMap, C201, false);
      expect(getCourseState(courseObjectC2)).toBe(false);
      toggleClassState(coursesMap, C201, true);
      toggleClassState(coursesMap, C202, true);
      expect(getCourseState(courseObjectC2)).toBe(true);
    });
  });

  describe("toggleCourseState()", () => {
    it("should toggle course state", () => {
      const courseObjectC2 = coursesMap.get("C2");
      if (!courseObjectC2) throw Error("Missing course in courseMap");
      const C202 = courseObjectC2.classesMap.get("C202");
      const C201 = courseObjectC2.classesMap.get("C201");
      if (!C202 || !C201) throw Error("Missing class in courseMap");
      expect(getActiveClasses(courseObjectC2).size).toEqual(2);
      expect(C201.isActive).toBe(true);
      expect(C202.isActive).toBe(true);
      // All classes are active
      expect(toggleCourseState(coursesMap, courseObjectC2)).toBe(false);
      expect(getActiveClasses(courseObjectC2).size).toEqual(0);
      expect(C201.isActive).toBe(false);
      expect(C202.isActive).toBe(false);
      // All classes are inactive
      expect(toggleCourseState(coursesMap, courseObjectC2)).toBe(true);
      expect(getActiveClasses(courseObjectC2).size).toEqual(2);
      expect(C201.isActive).toBe(true);
      expect(C202.isActive).toBe(true);
      // Only 1 class is inactive
      toggleClassState(coursesMap, C201, false);
      expect(toggleCourseState(coursesMap, courseObjectC2)).toBe(true);
      expect(getActiveClasses(courseObjectC2).size).toEqual(2);
      expect(C201.isActive).toBe(true);
      expect(C202.isActive).toBe(true);
    });
    it("should set course state", () => {
      const courseObjectC2 = coursesMap.get("C2");
      if (!courseObjectC2) throw Error("Missing course in courseMap");
      const C202 = courseObjectC2.classesMap.get("C202");
      const C201 = courseObjectC2.classesMap.get("C201");
      if (!C202 || !C201) throw Error("Missing class in courseMap");
      expect(getActiveClasses(courseObjectC2).size).toEqual(2);
      expect(C201.isActive).toBe(true);
      expect(C202.isActive).toBe(true);
      expect(toggleCourseState(coursesMap, courseObjectC2, true)).toBe(true);
      expect(getActiveClasses(courseObjectC2).size).toEqual(2);
      expect(C201.isActive).toBe(true);
      expect(C202.isActive).toBe(true);
      expect(toggleCourseState(coursesMap, courseObjectC2, false)).toBe(false);
      expect(getActiveClasses(courseObjectC2).size).toEqual(0);
      expect(C201.isActive).toBe(false);
      expect(C202.isActive).toBe(false);
      expect(toggleCourseState(coursesMap, courseObjectC2)).toBe(true);
      expect(getActiveClasses(courseObjectC2).size).toEqual(2);
      expect(C201.isActive).toBe(true);
      expect(C202.isActive).toBe(true);
    });
  });

  describe("deleteCourse()", () => {
    it("should delete course with correct CourseObject", () => {
      const courseObjectC2 = coursesMap.get("C2");
      if (!courseObjectC2) throw Error("Missing course in courseMap");
      expect(coursesMap.has(courseObjectC2.id)).toBe(true);
      deleteCourse(coursesMap, courseObjectC2);
      expect(coursesMap.has(courseObjectC2.id)).toBe(false);
    });
    it("should throw error with incorrect CourseObject", () => {
      const courseObjectC2 = coursesMap.get("C2");
      if (!courseObjectC2) throw Error("Missing course in courseMap");
      courseObjectC2.id = "Error";
      expect(coursesMap.has(courseObjectC2.id)).toBe(false);
      expect(() => deleteCourse(coursesMap, courseObjectC2)).toThrowError(
        /^Invalid CourseObject reference:/
      );
    });
  });

  describe("getAllState()", () => {
    it("should return boolean for the state of All classes and courses", () => {
      const courseObjectC1 = coursesMap.get("C1");
      const courseObjectC2 = coursesMap.get("C2");
      if (!courseObjectC1 || !courseObjectC2) {
        throw Error("Missing course in courseMap");
      }
      const C202 = courseObjectC2.classesMap.get("C202");
      const C201 = courseObjectC2.classesMap.get("C201");
      if (!C202 || !C201) throw Error("Missing class in courseMap");
      expect(getAllState(coursesMap)).toBe(true);
      // Only 1 class is inactive
      toggleClassState(coursesMap, C202);
      expect(getAllState(coursesMap)).toBe(false);
      // All classes is active again
      toggleClassState(coursesMap, C202);
      expect(getAllState(coursesMap)).toBe(true);
      // Only 1 course is inactive
      toggleCourseState(coursesMap, courseObjectC1);
      expect(getAllState(coursesMap)).toBe(false);
      // All courses is active again
      toggleCourseState(coursesMap, courseObjectC1);
      expect(getAllState(coursesMap)).toBe(true);
    });
  });

  describe("toggleAllState()", () => {
    it("should toggle all state", () => {
      const courseObjectC1 = coursesMap.get("C1");
      const courseObjectC2 = coursesMap.get("C2");
      if (!courseObjectC1 || !courseObjectC2)
        throw Error("Missing course in courseMap");
      const C202 = courseObjectC2.classesMap.get("C202");
      const C201 = courseObjectC2.classesMap.get("C201");
      if (!C202 || !C201) throw Error("Missing class in courseMap");
      expect(getActiveClasses(courseObjectC2).size).toEqual(2);
      expect(C201.isActive).toBe(true);
      expect(C202.isActive).toBe(true);
      // All are active
      expect(toggleAllState(coursesMap)).toBe(false);
      expect(getActiveClasses(courseObjectC2).size).toEqual(0);
      expect(C201.isActive).toBe(false);
      expect(C202.isActive).toBe(false);
      // Only 1 class is active
      toggleClassState(coursesMap, C201, true);
      expect(C202.isActive).toBe(false);
      expect(toggleAllState(coursesMap)).toBe(true);
      expect(C201.isActive).toBe(true);
      // Only 1 course is inactive
      toggleCourseState(coursesMap, courseObjectC2, false);
      expect(getActiveClasses(courseObjectC1).size).toEqual(2);
      expect(getActiveClasses(courseObjectC2).size).toEqual(0);
      expect(toggleAllState(coursesMap)).toBe(true);
      expect(getActiveClasses(courseObjectC1).size).toEqual(2);
      expect(getActiveClasses(courseObjectC2).size).toEqual(2);
    });
  });
});
