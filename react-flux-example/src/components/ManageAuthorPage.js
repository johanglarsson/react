import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import PageNotFound from "./PageNotFound";
import AuthorForm from "./AuthorForm";
import authorStore from "../stores/authorStore";
import { toast } from "react-toastify";
import * as authorActions from "../actions/authorActions";

function ManageAuthorPage(props) {
  const [author, setAuthor] = useState({
    id: "",
    name: "",
  });
  const [authors, setAuthors] = useState(authorStore.getAuthors());
  const [authorFound, setAuthorFound] = useState(true);

  useEffect(() => {
    authorStore.addChangeListener(onChange);
    const id = props.match.params.id;
    if (authors.length === 0) {
      authorActions.loadAuthors();
    } else if (id) {
      let _author = authorStore.getAuthorById(id);
      setAuthor(_author);
      if (!_author) {
        setAuthorFound(false);
      }
    }
    return () => authorStore.removeChangeListener(onChange);
  }, [authors.length, props.match.params.id]);

  function onChange() {
    setAuthors(authorStore.getAuthors);
  }

  function handleSubmit(event) {
    event.preventDefault();
    authorActions.saveAuthor(author).then(() => {
      props.history.push("/authors");
      toast.success("Author saved.");
    });
  }

  function handleChange(event) {
    const updatedAuthor = {
      ...author,
      [event.target.name]: event.target.value,
    };
    setAuthor(updatedAuthor);
  }

  if (!authorFound && !props.match.params.id) {
    return (
      <Route>
        <PageNotFound></PageNotFound>
      </Route>
    );
  } else {
    return (
      <AuthorForm
        author={author}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
    );
  }
}

export default ManageAuthorPage;
