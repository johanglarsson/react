import React from "react";
import { Link } from "react-router-dom";
import AuthorList from "./AuthorList";
import authorStore from "../stores/authorStore";
import courseStore from "../stores/courseStore";
import { useState, useEffect } from "react";
import { loadAuthors, deleteAuthor } from "../actions/authorActions";
import { loadCourses } from "../actions/courseActions";

function AuthorsPage() {
  const [authors, setAuthors] = useState(authorStore.getAuthors());
  const [courses, setCourses] = useState(courseStore.getCourses());

  useEffect(() => {
    authorStore.addChangeListener(onChange);
    courseStore.addChangeListener(onChange);
    if (authorStore.getAuthors().length === 0) {
      loadAuthors();
    }

    if (courseStore.getCourses().length === 0) {
      loadCourses();
    }

    return () => {
      authorStore.removeChangeListener(onChange);
      courseStore.removeChangeListener(onChange);
    };
  }, []);

  function onChange() {
    setAuthors(authorStore.getAuthors());
    setCourses(courseStore.getCourses());
  }

  return (
    <>
      <h2>Authors</h2>
      <Link className="btn btn-primary" to="/author">
        Add Author
      </Link>
      <AuthorList
        authors={authors}
        courses={courses}
        deleteAuthor={deleteAuthor}
      />
    </>
  );
}
export default AuthorsPage;
