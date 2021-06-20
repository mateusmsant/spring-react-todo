import React from "react";
import { useTodo } from "../../context/todoContext";
import TodoTable from "./TodoTable";
import { ReactComponent as Spinner } from "../../res/spinner.svg";
import empty from "../../res/empty.png";
import server from "../../res/server.png";

const TodoList = () => {
  const { todos, serverError } = useTodo();

  if (serverError) {
    return (
      <div className="text-center error">
        <span className="display-6">Erro no servidor!</span>
        <img src={server} style={{ width: "50%" }} alt="server_error" />
      </div>
    );
  }

  if (!todos) {
    return (
      <div className="spinner-container">
        <Spinner className="spinner" />
      </div>
    );
  }

  if (todos.length === 0) {
    return (
      <div className="text-center error">
        <span className="display-6">Não há tarefas. Adicione uma!</span>
        <img src={empty} style={{ width: "50%" }} alt="no_tasks" />
      </div>
    );
  }

  return <TodoTable />;
};

export default TodoList;
