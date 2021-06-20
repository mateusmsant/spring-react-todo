import React, { createContext, useState, useContext } from "react";
import todoApi from "../api/todoApi";
import { useTodo } from "./todoContext";

const ModalContext = createContext();

export default function ModalProvider({ children }) {
  const { todos, setTodos } = useTodo();
  const [todoId, setTodoId] = useState(null);
  const [todoTitle, setTodoTitle] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [formType, setFormType] = useState("create");

  const handleDelete = async () => {
    if (todoId) {
      const response = await todoApi.delete(`/todos/${todoId}`);
      if (response.status === 200) {
        const updatedTodos = todos.filter((todo) => todo.id !== todoId);
        setTodos(updatedTodos);
      }
    }
    handleClose();
  };

  const hasOnlyEmptySpaces = (value) => {
    return !/\S/.test(value);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const handleShowModal = (id, title, type) => {
    setShowModal(true);
    setTodoId(id);
    setTodoTitle(title);
    setFormType(type);
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
      }
    }
  };

  const updateTodo = async (id, updatedTodo) => {
    await todoApi.put(`/todos/${id}`, updatedTodo);
  };

  return (
    <ModalContext.Provider
      value={{
        updateTodo,
        handleClose,
        handleShowModal,
        handleDelete,
        handleUpdateSubmit,
        formType,
        setFormType,
        showModal,
        todoTitle,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}

export function useModal() {
  const modalContext = useContext(ModalContext);
  if (!modalContext) {
    throw new Error("Missing TodoProvider");
  }
  return modalContext;
}
