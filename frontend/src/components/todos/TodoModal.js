import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import TodoForm from "./TodoForm";
import { useModal } from "../../context/modalContext";

const TodoModal = () => {
  const {
    todoTitle,
    todoId,
    handleDelete,
    modalTitle,
    showModal,
    formType,
    handleClose,
  } = useModal();

  return (
    <form>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>{modalTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {formType === "update" ? (
            <TodoForm label="Novo título" button="Atualizar" />
          ) : (
            `Tem certeza que quer excluir a tarefa ${todoTitle}?`
          )}
        </Modal.Body>
        <Modal.Footer>
          {formType === "update" ? (
            <Button variant="secondary" size="sm" onClick={handleClose}>
              Voltar
            </Button>
          ) : (
            <>
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
            </>
          )}
        </Modal.Footer>
      </Modal>
    </form>
  );
};

export default TodoModal;
