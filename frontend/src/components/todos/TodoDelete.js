import React from "react";
import { Modal, Button } from "react-bootstrap";
import todoApi from "../../api/todoApi";

const TodoDelete = ({
  todoTitle,
  todoId,
  show,
  handleClose,
  todos,
  setTodos,
}) => {
  console.log(todoTitle);

  const handleDelete = async () => {
    if (todoId) {
      await todoApi.delete(`/todos/${todoId}`);
      const updatedTodos = todos.filter((todo) => todo.id !== todoId);
      setTodos(updatedTodos);
      handleClose();
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Deletar task</Modal.Title>
        </Modal.Header>
        <Modal.Body>{`Tem certeza que quer excluir a tarefa ${todoTitle}?`}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" size="sm" onClick={handleClose}>
            Voltar
          </Button>
          <Button
            variant="danger"
            size="sm"
            onClick={() => handleDelete(todoId)}
          >
            Excluir
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default TodoDelete;
