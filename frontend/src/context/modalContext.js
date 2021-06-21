import React, { createContext, useState, useContext } from "react";
import todoApi from "../api/todoApi";
import { useTodo } from "./todoContext";

const ModalContext = createContext();

export default function ModalProvider({ children }) {
  const { todos, setTodos } = useTodo();
  const [todoId, setTodoId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [formType, setFormType] = useState("create");
  const [deleteModalTitle, setDeleteModalTitle] = useState("");
  const [currentTitle, setCurrentTitle] = useState("");

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
    setFormType(type);
    setCurrentTitle(title);
    setDeleteModalTitle(title);
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
        deleteModalTitle,
        currentTitle,
        setCurrentTitle,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}

export function useModal() {
  const modalContext = useContext(ModalContext);
  if (!modalContext) {
    throw new Error("Missing ModalProvider");
  }
  return modalContext;
}
