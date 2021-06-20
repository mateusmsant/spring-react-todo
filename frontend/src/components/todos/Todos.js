import React, { useState, useEffect } from "react";
import todoApi from "../../api/todoApi";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";

const Todos = () => {
  const [todos, setTodos] = useState(null);

  useEffect(() => {
    const fetchTodos = async () => {
      const response = await todoApi.get("/todos");
      if (response) {
        setTodos(response.data);
      }
    };

    setTimeout(() => {
      fetchTodos();
    }, 1000);
  });

  const updateTodo = async (id, updatedTodo) => {
    await todoApi.put(`/todos/${id}`, updatedTodo);
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

  const handleTaskDelete = async (id) => {
    await todoApi.delete(`/todos/${id}`);
    const updatedTodos = todos.filter((todo) => id !== todo.id);
    setTodos(updatedTodos);
  };

  return (
    <div className="todos-wrapper">
      <h2 className="text-center">Todos</h2>
      <TodoForm setTodos={setTodos} />
      <TodoList
        setTodos={setTodos}
        todos={todos}
        handleStatusChange={handleStatusChange}
        handleTaskDelete={handleTaskDelete}
      />
    </div>
  );
};

export default Todos;
