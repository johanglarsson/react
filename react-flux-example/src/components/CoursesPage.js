import { useState, useEffect } from "react";
import courseStore from "../stores/courseStore";
import CourseList from "./CourseList";
import { Link } from "react-router-dom";
import { loadCourses, deleteCourse } from "../actions/courseActions";
import authorStore from "../stores/authorStore";
import { loadAuthors } from "../actions/authorActions";

function CoursePage() {
  const [courses, setCourses] = useState(courseStore.getCourses());
  const [authors, setAuthors] = useState(authorStore.getAuthors());

  useEffect(() => {
    courseStore.addChangeListener(onChange);
    if (courseStore.getCourses().length === 0) {
      loadCourses();
    }
    authorStore.addChangeListener(onChange);
    if (authorStore.getAuthors().length === 0) {
      loadAuthors();
    }

    return () => {
      courseStore.removeChangeListener(onChange);
      authorStore.removeChangeListener(onChange);
    };
  }, []);

  function onChange() {
    setCourses(courseStore.getCourses());
    setAuthors(authorStore.getAuthors()); // Is this really needed.
  }

  return (
    <>
      <h2>Courses</h2>
      <Link className="btn btn-primary" to="/course">
        Add Course
      </Link>
      <CourseList
        courses={courses}
        authors={authors}
        deleteCourse={deleteCourse}
      />
    </>
  );
}

export default CoursePage;
