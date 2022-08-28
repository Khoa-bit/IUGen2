import { ClassesMap, CourseObject, CoursesMap } from "lib/classInput";

export function _initializeCourseMap(courseMap: CoursesMap) {
  const classMapC1: ClassesMap = new Map();
  classMapC1.set("C10101", {
    id: "C10101",
    courseID: "C1",
    courseName: "Course1",
    date: ["Wed", "Fri"],
    startPeriod: [1, 7],
    periodsCount: [3, 4],
    location: ["AC11", "AC12"],
    lecturer: ["LC11", "LC12"],
    isActive: true,
  });

  classMapC1.set("C10102", {
    id: "C10102",
    courseID: "C1",
    courseName: "Course1",
    date: ["Tue", "Fri"],
    startPeriod: [7, 7],
    periodsCount: [3, 4],
    location: ["AC11", "AC12"],
    lecturer: ["LC11", "LC12"],
    isActive: true,
  });

  const courseObjectC1: CourseObject = {
    id: "C1",
    name: "Course1",
    classesMap: classMapC1,
  };

  const classMapC2: ClassesMap = new Map();
  classMapC2.set("C201", {
    id: "C201",
    courseID: "C2",
    courseName: "Course2",
    date: ["Tue"],
    startPeriod: [1],
    periodsCount: [3],
    location: ["AC21"],
    lecturer: ["LC21"],
    isActive: true,
  });

  classMapC2.set("C202", {
    id: "C202",
    courseID: "C2",
    courseName: "Course2",
    date: ["Wed"],
    startPeriod: [1],
    periodsCount: [3],
    location: ["AC21"],
    lecturer: ["LC21"],
    isActive: true,
  });

  const courseObjectC2: CourseObject = {
    id: "C2",
    name: "Course2",
    classesMap: classMapC2,
  };

  courseMap.set("C1", courseObjectC1);
  courseMap.set("C2", courseObjectC2);
}

export function addAdjacentCourses(courseMap: CoursesMap) {
  const classMapC3: ClassesMap = new Map();
  classMapC3.set("C301", {
    id: "C301",
    courseID: "C3",
    courseName: "Course3",
    date: ["Tue"],
    startPeriod: [4],
    periodsCount: [2],
    location: ["AC31"],
    lecturer: ["LC31"],
    isActive: true,
  });

  classMapC3.set("C302", {
    id: "C302",
    courseID: "C3",
    courseName: "Course3",
    date: ["Wed"],
    startPeriod: [4],
    periodsCount: [2],
    location: ["AC31"],
    lecturer: ["LC31"],
    isActive: true,
  });

  classMapC3.set("C303", {
    id: "C303",
    courseID: "C3",
    courseName: "Course3",
    date: ["Fri"],
    startPeriod: [4],
    periodsCount: [2],
    location: ["AC31"],
    lecturer: ["LC31"],
    isActive: true,
  });

  const courseObjectC3: CourseObject = {
    id: "C3",
    name: "Course3",
    classesMap: classMapC3,
  };

  courseMap.set("C3", courseObjectC3);
}
