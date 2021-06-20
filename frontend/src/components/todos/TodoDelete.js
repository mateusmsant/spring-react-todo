import React from "react";
import { useTodo } from "../../context/todoContext";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const TodoDelete = () => {
  const { showDeleteModal, handleClose, todoTitle, todoId, handleDelete } =
    useTodo();

  return (
    <>
      <Modal show={showDeleteModal} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Deletar tarefa</Modal.Title>
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
