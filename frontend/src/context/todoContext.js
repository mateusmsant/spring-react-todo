import React, { createContext, useState, useContext } from "react";
import todoApi from "../api/todoApi";

const TodoContext = createContext();

export default function TodoProvider({ children }) {
  const [todos, setTodos] = useState(null);
  const [serverError, setServerError] = useState(null);

  const fetchTodos = async () => {
    const response = await todoApi
      .get("/todos")
      .catch((e) => setServerError(true));

    if (response) {
      if (response.status === 200) {
        setTodos(response.data);
      }
    }
  };

  const handleStatusChange = (id) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.done = !todo.done;
        updateTodo(id, todo);
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  const updateTodo = async (id, updatedTodo) => {
    await todoApi.put(`/todos/${id}`, updatedTodo);
  };

  return (
    <TodoContext.Provider
      value={{
        todos,
        setTodos,
        fetchTodos,
        updateTodo,
        handleStatusChange,
        serverError,
        setServerError,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
}

export function useTodo() {
  const todoContext = useContext(TodoContext);
  if (!todoContext) {
    throw new Error("Missing TodoProvider");
  }
  return todoContext;
}
