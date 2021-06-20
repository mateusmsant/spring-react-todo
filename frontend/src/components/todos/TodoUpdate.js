import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import TodoForm from "./TodoForm";
import { useTodo } from "../../context/todoContext";

const TodoUpdate = () => {
  const { showUpdateModal, handleClose, setFormType } = useTodo();

  if (!showUpdateModal) {
    setFormType("create");
  }

  return (
    <form>
      <Modal show={showUpdateModal} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Atualizar tarefa</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <TodoForm label="Novo título" button="Atualizar" />
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
