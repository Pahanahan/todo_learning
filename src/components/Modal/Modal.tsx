import React, { memo, useRef, useState, useEffect } from "react";

import Button from "../../UI/Button/Button";

import close from "../../assets/icons/close.svg";
import styles from "./Modal.module.css";

interface ModalProps {
  action: string;
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  resetWeekHandler: React.MouseEventHandler<HTMLButtonElement>;
  updatedDeleteTasks: (id: number) => void;
  deletedTaskId: number;
  saveToLocalStorageNewTask: (title: string) => void;
}

function Modal({
  action,
  showModal,
  setShowModal,
  resetWeekHandler,
  updatedDeleteTasks,
  deletedTaskId,
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

  const deleteTaskModal = (
    <Button onClick={() => updatedDeleteTasks(deletedTaskId)} type="button">
      Delete Task
    </Button>
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
            : action === "addTask"
            ? "Add New Task"
            : "Are your sure to Delete this Task?"}
        </p>
        {action === "reset" && resetModal}
        {action === "addTask" && addTaskModal}
        {action === "deleteTask" && deleteTaskModal}
      </div>
    </div>
  );
}

export default memo(Modal);
