import React, { useEffect } from "react";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";
import { useTodo } from "../../context/todoContext";

const Todos = () => {
  const { fetchTodos } = useTodo();

  useEffect(() => {
    fetchTodos();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="todos-wrapper">
      <TodoForm />
      <hr />
      <TodoList />
    </div>
  );
};

export default Todos;
