import React, { useRef, useState, useEffect } from "react";

import Button from "../../UI/Button/Button";

import close from "../../assets/icons/close.svg";
import styles from "./Modal.module.css";

interface ModalProps {
  action: string;
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  resetWeekHandler: React.MouseEventHandler<HTMLButtonElement>;
  saveToLocalStorageNewTask: (title: string) => void;
}

function Modal({
  action,
  showModal,
  setShowModal,
  resetWeekHandler,
  saveToLocalStorageNewTask,
}: ModalProps) {
  const [taskState, setTaskState] = useState<string>("");
  const [inputValid, setInputValid] = useState<boolean>(true);
  const overlayRef = useRef(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (showModal && inputRef.current) {
      inputRef.current.focus();
    }
  }, [showModal, inputRef]);

  const closeModal = () => {
    setShowModal(false);
  };

  const closeModalOverlay = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === overlayRef.current) {
      setShowModal(false);
    }
  };

  const changeTaskState = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTaskState(value);
    setInputValid(value.trim().length > 0);
  };

  const addNewTask = () => {
    if (taskState.trim().length === 0) {
      return;
    }
    saveToLocalStorageNewTask(taskState);
    setTaskState("");
  };

  const resetModal = (
    <Button onClick={resetWeekHandler} type="button">
      Start New Week
    </Button>
  );

  const addTaskModal = (
    <div className={styles.modal__form}>
      <input
        onChange={changeTaskState}
        value={taskState}
        ref={inputRef}
        className={inputValid ? `${styles.modal__input}` : `${styles.invalid}`}
        type="text"
        placeholder="Введите новое задание"
      />
      <Button onClick={addNewTask} type="button">
        Add New Task
      </Button>
    </div>
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
