import React, { createContext, useState, useContext } from "react";
import todoApi from "../api/todoApi";

const TodoContext = createContext();

export default function TodoProvider({ children }) {
  const [todos, setTodos] = useState(null);
  const [todoId, setTodoId] = useState(null);
  const [formType, setFormType] = useState("create");
  const [todoTitle, setTodoTitle] = useState(null);
  const [serverError, setServerError] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);

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

  const handleClose = () => {
    setShowDeleteModal(false);
    setShowUpdateModal(false);
  };

  const handleShowDeleteModal = (id, title) => {
    setShowDeleteModal(true);
    setTodoId(id);
    setTodoTitle(title);
  };

  const handleShowUpdateModal = (id, title) => {
    setShowUpdateModal(true);
    setTodoId(id);
    setTodoTitle(title);
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
        handleCreateSubmit,
        handleClose,
        handleShowDeleteModal,
        handleShowUpdateModal,
        showDeleteModal,
        showUpdateModal,
        todoId,
        todoTitle,
        handleDelete,
        formType,
        setFormType,
        serverError,
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
