import React from "react";
import { useTodo } from "../../context/todoContext";

const TodoForm = ({ button, label }) => {
  const { handleCreateSubmit, handleUpdateSubmit, formType } = useTodo();

  return (
    <form
      onSubmit={formType === "create" ? handleCreateSubmit : handleUpdateSubmit}
      className="d-flex flex-column"
    >
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
