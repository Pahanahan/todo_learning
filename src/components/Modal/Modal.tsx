import React, { useRef } from "react";

import Button from "../../UI/Button/Button";

import close from "../../assets/icons/close.svg";
import styles from "./Modal.module.css";

interface ModalProps {
  action: string;
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  resetWeekHandler: React.MouseEventHandler<HTMLButtonElement>;
}

function Modal({
  action,
  showModal,
  setShowModal,
  resetWeekHandler,
}: ModalProps) {
  const overlayRef = useRef(null);
  const closeModal = () => {
    setShowModal(false);
  };

  const closeModalOverlay = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === overlayRef.current) {
      setShowModal(false);
    }
  };

  const resetModal = (
    <Button onClick={resetWeekHandler} type="button">
      Start New Week
    </Button>
  );

  const addTaskModal = (
    <form className={styles.modal__form}>
      <input
        className={styles.modal__input}
        type="text"
        placeholder="Введите новое задание"
      />
      <Button onClick={resetWeekHandler} type="button">
        Add New Task
      </Button>
    </form>
  );

  return (
    <div
      className={styles[`${showModal ? "modal" : "modal--hidden"}`]}
      ref={overlayRef}
      onClick={(e) => closeModalOverlay(e)}
    >
      <div className={styles.modal__element}>
        <button
          className={styles.modal__close}
          onClick={closeModal}
          type="button"
        >
          <img src={close} alt="close" />
        </button>
        <p className={styles.modal__message}>
          {action === "reset"
            ? "Are you sure Reset All Progress?"
            : "Add New Task"}
        </p>
        {action === "reset" && resetModal}
        {action === "addTask" && addTaskModal}
      </div>
    </div>
  );
}

export default Modal;
