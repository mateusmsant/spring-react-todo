import React, { useState } from "react";
import { ReactComponent as Spinner } from "../../res/spinner.svg";
import empty from "../../res/empty.png";
import TodoDelete from "./TodoDelete";
import TodoUpdate from "./TodoUpdate";

const TodoList = ({
  todos,
  setTodos,
  handleStatusChange,
  hasOnlyEmptySpaces,
}) => {
  const [show, setShow] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [todoId, setTodoId] = useState(null);
  const [todoTitle, setTodoTitle] = useState(null);

  const handleClose = () => {
    setShow(false);
    setShowUpdateModal(false);
  };

  const handleShowDeleteModal = (id, title) => {
    setShow(true);
    setTodoId(id);
    setTodoTitle(title);
  };

  const handleShowUpdateModal = (id, title) => {
    setShowUpdateModal(true);
    setTodoId(id);
    setTodoTitle(title);
  };

  if (!todos) {
    return (
      <div className="spinner-container">
        <Spinner className="spinner" />
      </div>
    );
  }

  if (todos.length === 0) {
    return (
      <div className="text-center empty">
        <span className="display-6">Não há tarefas. Adicione uma!</span>
        <img src={empty} style={{ width: "50%" }} alt="" />
      </div>
    );
  }

  const renderModal = () => {
    if (show) {
      return (
        <TodoDelete
          todos={todos}
          setTodos={setTodos}
          show={show}
          todoId={todoId}
          todoTitle={todoTitle}
          handleClose={handleClose}
        />
      );
    }

    if (showUpdateModal) {
      return (
        <TodoUpdate
          todos={todos}
          setTodos={setTodos}
          showUpdateModal={showUpdateModal}
          todoId={todoId}
          todoTitle={todoTitle}
          handleClose={handleClose}
          hasOnlyEmptySpaces={hasOnlyEmptySpaces}
        />
      );
    }
  };

  return (
    <div>
      <div>{renderModal()}</div>
      <div className="row" style={{ margin: "0 auto" }}>
        <table className="table">
          <thead>
            <tr>
              <th>Tarefa</th>
              <th className="text-center">Ações</th>
              <th className="text-center">Concluído</th>
            </tr>
          </thead>
          <tbody>
            {todos.map((todo) => {
              return (
                <tr key={todo.id}>
                  <td className="middle" style={{ whiteSpace: "nowrap" }}>
                    {todo.title}
                  </td>
                  <td className="middle text-center w-100">
                    <div className="d-flex justify-content-center">
                      <button
                        className="btn btn-sm btn-outline-success"
                        onClick={() =>
                          handleShowUpdateModal(todo.id, todo.title)
                        }
                      >
                        Atualizar
                      </button>
                      <div className="button-divider"></div>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() =>
                          handleShowDeleteModal(todo.id, todo.title)
                        }
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
                        name={`${todo.id}-done`}
                        onChange={() => handleStatusChange(todo.id)}
                        checked={todo.done ? true : false}
                      />
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TodoList;
