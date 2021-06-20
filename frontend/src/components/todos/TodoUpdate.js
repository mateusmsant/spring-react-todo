import React from "react";
import { Modal, Button } from "react-bootstrap";
import TodoForm from "./TodoForm";
import todoApi from "../../api/todoApi";

const TodoUpdate = ({
  todoTitle,
  todoId,
  showUpdateModal,
  handleClose,
  todos,
  setTodos,
  hasOnlyEmptySpaces,
}) => {
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const newTodoTitle = e.target.title.value;
    if (newTodoTitle && !hasOnlyEmptySpaces(newTodoTitle)) {
      const updatedTodos = todos.map((todo) => {
        if (todo.id === todoId) {
          todo.title = newTodoTitle;
          if (todo.done) {
            updateTodo(todoId, { title: newTodoTitle, done: true });
          } else {
            updateTodo(todoId, { title: newTodoTitle, done: false });
          }
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
    <form>
      <Modal show={showUpdateModal} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Deletar task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <TodoForm
            handleFormSubmit={handleFormSubmit}
            label="Novo título"
            setTodos={setTodos}
            button="Atualizar"
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" size="sm" onClick={handleClose}>
            Voltar
          </Button>
        </Modal.Footer>
      </Modal>
    </form>
  );
};

export default TodoUpdate;
