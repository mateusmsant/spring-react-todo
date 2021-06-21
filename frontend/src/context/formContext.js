import React, { createContext, useContext, useState } from "react";
import todoApi from "../api/todoApi";
import { useTodo } from "./todoContext";
import { useModal } from "./modalContext";

const FormContext = createContext();

export default function ModalProvider({ children }) {
  const { todos, setTodos, serverError, setServerError } = useTodo();
  const { todoId, handleClose, currentTitle } = useModal();
  const [newTitle, setNewTitle] = useState("");

  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    if (!serverError) {
      const newTodoTitle = e.target.title.value;
      if (newTodoTitle && !hasOnlyEmptySpaces(newTodoTitle)) {
        const newTodo = { title: newTodoTitle, done: false };
        const response = await todoApi.post("/todos", newTodo).catch((e) => {
          setServerError(true);
        });
        const addedTodo = response.data;
        setTodos([...todos, addedTodo]);
      }
    }
  };

  const hasOnlyEmptySpaces = (value) => {
    return !/\S/.test(value);
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    const newTodoTitle = e.target.title.value;
    if (newTodoTitle && !hasOnlyEmptySpaces(newTodoTitle)) {
      const updatedTodos = todos.map((todo) => {
        if (todo.id === todoId) {
          todo.title = newTodoTitle;
          updateTodo(todoId, todo);
        }
        return todo;
      });

      if (updatedTodos) {
        setTodos(updatedTodos);
        handleClose();
      }
    }
  };

  const updateTodo = async (id, updatedTodo) => {
    await todoApi.put(`/todos/${id}`, updatedTodo).catch((e) => {
      setServerError(true);
    });
  };

  return (
    <FormContext.Provider
      value={{
        handleCreateSubmit,
        handleUpdateSubmit,
        newTitle,
        setNewTitle,
        currentTitle,
      }}
    >
      {children}
    </FormContext.Provider>
  );
}

export function useForm() {
  const formContext = useContext(FormContext);
  if (!formContext) {
    throw new Error("Missing FormProvider");
  }
  return formContext;
}
