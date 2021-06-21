import React from "react";
import { useModal } from "../../context/modalContext";
import { useForm } from "../../context/formContext";

const TodoForm = ({ button }) => {
  const { formType, setCurrentTitle } = useModal();
  const {
    handleCreateSubmit,
    handleUpdateSubmit,
    newTitle,
    setNewTitle,
    currentTitle,
  } = useForm();

  const isFormTypeCreate = formType === "create";

  return (
    <form
      onSubmit={isFormTypeCreate ? handleCreateSubmit : handleUpdateSubmit}
      className="d-flex flex-column"
    >
      <div className="mb-3">
        <label className="form-label">
          {isFormTypeCreate ? "Nova tarefa" : "Atualizar tarefa"}
        </label>
        <input
          type="text"
          className="form-control"
          id="title"
          name="title"
          value={isFormTypeCreate ? newTitle : currentTitle}
          onChange={
            isFormTypeCreate
              ? (e) => setNewTitle(e.target.value)
              : (e) => setCurrentTitle(e.target.value)
          }
        />
      </div>
      <button
        type="submit"
        className="btn btn-outline-primary w-25 my-0 mx-auto"
      >
        {isFormTypeCreate ? "Adicionar" : "Atualizar"}
      </button>
    </form>
  );
};

export default TodoForm;
