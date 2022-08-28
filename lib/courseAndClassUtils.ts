import { ClassObject, CourseObject, CoursesMap } from "./classInput";

export function getActiveClasses(courseObject: CourseObject) {
  return new Map(
    Array.from(courseObject.classesMap).filter(
      ([_, classObject]) => classObject.isActive
    )
  );
}

export function getActiveCourses(coursesMap: CoursesMap) {
  return new Map(
    Array.from(coursesMap).filter(([_, courseObject]) => {
      for (const classObject of courseObject.classesMap.values()) {
        if (classObject.isActive) return true;
      }
      return false;
    })
  ) as CoursesMap;
}

export function toggleClassState(
  coursesMap: CoursesMap,
  classObject: ClassObject,
  state?: boolean
) {
  if (state === classObject.isActive) return classObject.isActive;

  classObject.isActive = !classObject.isActive;

  const courseObject = coursesMap.get(classObject.courseID);
  if (!courseObject) {
    throw Error(
      `Invalid ClassObject reference: ${classObject.courseID} - ${classObject.id}`
    );
  }

  return classObject.isActive;
}

export function deleteClass(coursesMap: CoursesMap, classObject: ClassObject) {
  const courseObject = coursesMap.get(classObject.courseID);
  const classesMap = courseObject?.classesMap;
  if (!courseObject || !classesMap?.has(classObject.id)) {
    throw Error(
      `Invalid ClassObject reference: ${classObject.courseID} - ${classObject.id}`
    );
  }

  classesMap.delete(classObject.id);

  if (courseObject.classesMap.size == 0) {
    coursesMap.delete(courseObject.id);
  }
}

export function getCourseState(courseObject: CourseObject) {
  return getActiveClasses(courseObject).size == courseObject.classesMap.size;
}

export function toggleCourseState(
  coursesMap: CoursesMap,
  courseObject: CourseObject,
  state?: boolean
) {
  const newState = !getCourseState(courseObject);
  if (state === !newState) return state;

  for (const classObject of courseObject.classesMap.values()) {
    toggleClassState(coursesMap, classObject, newState);
  }

  return newState;
}

export function deleteCourse(
  coursesMap: CoursesMap,
  courseObject: CourseObject
) {
  if (!coursesMap.has(courseObject.id)) {
    throw Error(`Invalid CourseObject reference: ${courseObject.id}`);
  }

  coursesMap.delete(courseObject.id);
}

export function getAllState(coursesMap: CoursesMap) {
  if (coursesMap.size == 0) return false;
  for (const courseObject of coursesMap.values()) {
    if (getActiveClasses(courseObject).size != courseObject.classesMap.size)
      return false;
  }
  return true;
}

export function toggleAllState(coursesMap: CoursesMap, state?: boolean) {
  const newState = !getAllState(coursesMap);
  if (state === !newState) return state;

  for (const courseObject of coursesMap.values()) {
    toggleCourseState(coursesMap, courseObject, newState);
  }

  return newState;
}

export function deleteAll(coursesMap: CoursesMap) {
  coursesMap.clear();
}
