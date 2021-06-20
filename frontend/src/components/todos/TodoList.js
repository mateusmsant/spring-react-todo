import React, { Fragment, useEffect, useState } from "react";
import todoApi from "../../api/todoApi";
import { ReactComponent as Spinner } from "../../res/spinner.svg";

const TodoList = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const fetchTodos = async () => {
      const response = await todoApi.get("/todos");
      if (response) {
        setTodos(response.data);
      }
    };

    setTimeout(() => {
      fetchTodos();
    }, 2000);
  });

  if (todos.length === 0) {
    return (
      <div className="spinner-container">
        <Spinner className="spinner" />
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-center">Todos</h2>
      <div className="row">
        <table className="table table-striped table-bordererd">
          <thead>
            <tr>
              <th>Title</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {todos.map((todo) => {
              return (
                <Fragment key={todo.title}>
                  <tr>
                    <td>{todo.title}</td>
                    <td className="d-flex justify-content-center">
                      <button className="btn btn-sm btn-success outlined">
                        Update
                      </button>
                      <div className="button-divider"></div>
                      <button className="btn btn-sm btn-danger outlined">
                        Delete
                      </button>
                    </td>
                  </tr>
                </Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TodoList;
