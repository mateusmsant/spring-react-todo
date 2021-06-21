import React from "react";
import { useModal } from "../../context/modalContext";
import { useForm } from "../../context/formContext";

const TodoForm = ({ button, label }) => {
  const { formType } = useModal();
  const {
    handleCreateSubmit,
    handleUpdateSubmit,
    newTitle,
    setNewTitle,
    currentTitle,
    setCurrentTitle,
  } = useForm();

  const handleChangeMethod = () => {
    if (formType === "create") {
      return (e) => setNewTitle(e.target.value);
    }
    return (e) => setCurrentTitle(e.target.value);
  };

  return (
    <form
      onSubmit={formType === "create" ? handleCreateSubmit : handleUpdateSubmit}
      className="d-flex flex-column"
    >
      <div className="mb-3">
        <label className="form-label">{label}</label>
        <input
          type="text"
          className="form-control"
          id="title"
          name="title"
          value={formType === "create" ? newTitle : currentTitle}
          onChange={handleChangeMethod()}
        />
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
