import React, { createContext, useState, useContext } from "react";
import todoApi from "../api/todoApi";
import { useTodo } from "./todoContext";

const ModalContext = createContext();

export default function ModalProvider({ children }) {
  const { todos, setTodos } = useTodo();
  const [todoId, setTodoId] = useState(null);
  const [newTitle, setNewTitle] = useState("");
  const [currentTitle, setCurrentTitle] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [formType, setFormType] = useState("create");
  const [deleteModalTitle, setDeleteModalTitle] = useState("");

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

  const handleClose = () => {
    setShowModal(false);
    setFormType("create");
  };

  const handleShowModal = (id, title, type) => {
    setShowModal(true);
    setTodoId(id);
    setCurrentTitle(title);
    setDeleteModalTitle(title);
    setFormType(type);
  };

  return (
    <ModalContext.Provider
      value={{
        todoId,
        formType,
        showModal,
        handleClose,
        handleShowModal,
        handleDelete,
        setFormType,
        newTitle,
        setNewTitle,
        currentTitle,
        setCurrentTitle,
        deleteModalTitle,
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
