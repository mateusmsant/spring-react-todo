import React, { useEffect } from "react";
import { useTodo } from "../../context/todoContext";
import TodoDelete from "./TodoDelete";
import TodoUpdate from "./TodoUpdate";

const TodoTable = () => {
  const {
    showDeleteModal,
    showUpdateModal,
    handleShowUpdateModal,
    handleShowDeleteModal,
    todos,
    handleStatusChange,
    setFormType,
    sortTodos,
  } = useTodo();

  useEffect(() => {
    showUpdateModal ? setFormType("update") : setFormType("create");
  }, [setFormType, showUpdateModal]);

  const renderModal = () => {
    if (showDeleteModal) {
      return <TodoDelete />;
    }

    if (showUpdateModal) {
      return <TodoUpdate />;
    }
  };

  const renderTodos =
    todos &&
    todos.map((todo) => {
      return (
        <tr onClick={sortTodos} key={todo.id}>
          <td className={`middle w-25 ${todo.done ? "done" : ""}`}>
            <span style={{ whiteSpace: "normal" }}>{todo.title}</span>
          </td>
          <td className="middle text-center">
            <div className="d-flex justify-content-center">
              <button
                className="btn btn-sm btn-outline-success"
                onClick={() => handleShowUpdateModal(todo.id, todo.title)}
              >
                Atualizar
              </button>
              <div className="button-divider"></div>
              <button
                className="btn btn-sm btn-outline-danger"
                onClick={() => handleShowDeleteModal(todo.id, todo.title)}
              >
                Deletar
              </button>
            </div>
          </td>
          <td className="middle">
            <div className="form-check form-switch d-flex justify-content-center">
              <input
                className="form-check-input"
                type="checkbox"
                onChange={() => handleStatusChange(todo.id)}
                checked={todo.done ? true : false}
              />
            </div>
          </td>
        </tr>
      );
    });

  return (
    <div>
      {(showDeleteModal || showUpdateModal) && <div>{renderModal()}</div>}
      <div className="row" style={{ margin: "0 auto" }}>
        <table className="table">
          <thead>
            <tr>
              <th>Tarefa</th>
              <th className="text-center">Ações</th>
              <th className="text-center">Concluído</th>
            </tr>
          </thead>
          <tbody>{renderTodos}</tbody>
        </table>
      </div>
    </div>
  );
};

export default TodoTable;
