import React, { useState } from "react";
import { ReactComponent as Spinner } from "../../res/spinner.svg";
import TodoDelete from "./TodoDelete";
import empty from "../../res/empty.png";

const TodoList = ({
  todos,
  setTodos,
  handleStatusChange,
  handleTaskDelete,
}) => {
  const [show, setShow] = useState(false);
  const [todoId, setTodoId] = useState(null);
  const [todoTitle, setTodoTitle] = useState(null);
  const handleClose = () => setShow(false);

  const handleShow = (id, title) => {
    setShow(true);
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

  return (
    <div>
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
                      <button className="btn btn-sm btn-success outlined">
                        Update
                      </button>
                      <div className="button-divider"></div>
                      <button
                        className="btn btn-sm btn-danger outlined"
                        onClick={() => handleShow(todo.id, todo.title)}
                      >
                        Delete
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
      {show && (
        <TodoDelete
          todos={todos}
          setTodos={setTodos}
          show={show}
          todoId={todoId}
          todoTitle={todoTitle}
          handleShow={handleShow}
          handleClose={handleClose}
        />
      )}
    </div>
  );
};

export default TodoList;
