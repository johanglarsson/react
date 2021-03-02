import React from "react";
import TextInput from "./common/TextInput";
import PropTypes from "prop-types";

function AuthorForm(props) {
  return (
    <form onSubmit={props.onSubmit}>
      <TextInput
        id="name"
        name="name"
        label="Name"
        onChange={props.onChange}
        value={props.author.name}
      />
      <input type="submit" value="Save" className="btn btn-primary" />
    </form>
  );
}
AuthorForm.propTypes = {
  author: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default AuthorForm;
