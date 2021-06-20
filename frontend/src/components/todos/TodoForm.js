import React from "react";

const TodoForm = ({ handleFormSubmit, button, label }) => {
  return (
    <form onSubmit={handleFormSubmit} className="d-flex flex-column">
      <div className="mb-3">
        <label className="form-label">{label}</label>
        <input type="text" className="form-control" id="title" name="title" />
      </div>
      <button
        type="submit"
        className="btn btn-outline-primary w-25 my-0 mx-auto"
      >
        {button}
      </button>
    </form>
  );
};

export default TodoForm;
