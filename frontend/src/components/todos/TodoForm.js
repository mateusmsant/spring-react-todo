import React from "react";
import todoApi from "../../api/todoApi";
import { fetchTodos } from "../../utils/methods";

const TodoForm = ({ setTodos }) => {
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const newTodoTitle = e.target.title.value;
    if (newTodoTitle) {
      const data = {
        title: newTodoTitle,
        done: false,
      };

      await todoApi.post("/todos", data);

      const newTodos = await fetchTodos();
      if (newTodos) {
        setTodos(newTodos.data);
      }
    }
  };

  return (
    <form onSubmit={handleFormSubmit} className="d-flex flex-column">
      <div className="mb-3">
        <label className="form-label">Nova tarefa</label>
        <input type="text" className="form-control" id="title" name="title" />
      </div>
      <button
        type="submit"
        className="btn btn-outline-primary w-25 my-0 mx-auto"
      >
        Adiciona
      </button>
    </form>
  );
};

export default TodoForm;
