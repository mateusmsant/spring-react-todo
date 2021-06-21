import React, { createContext, useContext } from "react";
import todoApi from "../api/todoApi";
import { useTodo } from "./todoContext";
import { useModal } from "./modalContext";

const FormContext = createContext();

export default function ModalProvider({ children }) {
  const { todos, setTodos } = useTodo();
  const {
    todoId,
    handleClose,
    newTitle,
    setNewTitle,
    currentTitle,
    setCurrentTitle,
  } = useModal();

  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    const newTodoTitle = e.target.title.value;
    if (newTodoTitle && !hasOnlyEmptySpaces(newTodoTitle)) {
      const newTodo = { title: newTodoTitle, done: false };
      const response = await todoApi.post("/todos", newTodo);
      const addedTodo = response.data;
      setTodos([...todos, addedTodo]);
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
    await todoApi.put(`/todos/${id}`, updatedTodo);
  };

  return (
    <FormContext.Provider
      value={{
        handleCreateSubmit,
        handleUpdateSubmit,
        newTitle,
        setNewTitle,
        currentTitle,
        setCurrentTitle,
      }}
    >
      {children}
    </FormContext.Provider>
  );
}

export function useForm() {
  const formContext = useContext(FormContext);
  if (!formContext) {
    throw new Error("Missing TodoProvider");
  }
  return formContext;
}
