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

    fetchTodos();
  }, []);

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

  const hasOnlyEmptySpaces = (value) => {
    return !/\S/.test(value);
  };

  const handleFormSubmit = async (e) => {
    console.log("oi");
    e.preventDefault();
    const newTodoTitle = e.target.title.value;
    if (newTodoTitle && !hasOnlyEmptySpaces(newTodoTitle)) {
      await todoApi.post("/todos", {
        title: newTodoTitle,
        done: false,
      });

      const newTodos = await todoApi.get("/todos");
      if (newTodos) {
        setTodos(newTodos.data);
      }
    }
  };

  return (
    <div className="todos-wrapper">
      <TodoForm
        setTodos={setTodos}
        handleFormSubmit={handleFormSubmit}
        button="Adicionar"
        label="Nova tarefa"
      />
      <hr />
      <TodoList
        setTodos={setTodos}
        todos={todos}
        handleStatusChange={handleStatusChange}
        hasOnlyEmptySpaces={hasOnlyEmptySpaces}
      />
    </div>
  );
};

export default Todos;
