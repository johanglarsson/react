import React, { useState, useEffect } from "react";
import CourseForm from "./CourseForm";
import courseStore from "../stores/courseStore";
import authorStore from "../stores/authorStore";
import * as courseActions from "../actions/courseActions";
import { toast } from "react-toastify";
import { Route } from "react-router-dom";
import PageNotFound from "./PageNotFound";

function ManageCoursePage(props) {
  const [courseFound, setCourseFound] = useState(true);
  const [errors, setErrors] = useState({});
  const [courses, setCourses] = useState(courseStore.getCourses());
  const [course, setCourse] = useState({
    id: "",
    authorId: null,
    title: "",
    slug: "",
    category: "",
  });
  const [authors, setAuthors] = useState(authorStore.getAuthors());

  // Runs once if the request params change
  useEffect(() => {
    courseStore.addChangeListener(onChange);
    const slug = props.match.params.slug;
    if (courses.length === 0) {
      courseActions.loadCourses();
    } else if (slug) {
      let _course = courseStore.getCourseBySlug(slug);
      setCourse(_course);
      if (!_course) {
        setCourseFound(false);
      }
    }
    return () => courseStore.removeChangeListener(onChange);
  }, [courses.length, props.match.params.slug]);

  function onChange() {
    setCourses(courseStore.getCourses());
  }

  function handleChange(event) {
    const updatedCourse = {
      ...course,
      [event.target.name]: event.target.value,
    };
    setCourse(updatedCourse);
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!formIsValid()) return;
    courseActions.saveCourse(course).then(() => {
      props.history.push("/courses");
      toast.success("Course saved.");
    });
  }

  function formIsValid() {
    const _errors = {};
    if (!course.title) _errors.title = "Title is required";
    if (!course.authorId) _errors.authorId = "Author ID is required";
    if (!course.category) _errors.category = "Category is required";
    setErrors(_errors);
    return Object.keys(_errors).length === 0;
  }
  if (!courseFound && !props.match.params.slug) {
    return (
      <Route>
        <PageNotFound />
      </Route>
    );
  } else {
    return (
      <>
        <h2>Manage Course</h2>
        <CourseForm
          course={course}
          errors={errors}
          authors={authors}
          onChange={handleChange}
          onSubmit={handleSubmit}
        />
      </>
    );
  }
}

export default ManageCoursePage;
