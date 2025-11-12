import { useState } from "react";

import Checkbox from "./components/Checkbox/Checkbox";
import Button from "../../UI/Button/Button";
import Modal from "../Modal/Modal";
import { setLocalStorage } from "../../utils/setLocalStorage";
import { getLocalStorage } from "../../utils/getLocalStorage";
// import { tasks } from "../../data/data";

import styles from "./Table.module.css";

interface WeekDay {
  name: string;
  done: boolean;
}

interface Task {
  title: string;
  id: number;
  weekDays: WeekDay[];
}

function Table() {
  const tasksData = getLocalStorage("tasks");
  const tasks: Task[] = tasksData ? JSON.parse(tasksData) : [];

  const [tasksState, setTasksState] = useState(tasks);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [action, setAction] = useState<string>("");

  const weekDays = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

  const weekDaysMap = weekDays.map((item) => {
    return <div key={item}>{item}</div>;
  });

  const onCheckedHandler = (id: number, weekDay: string) => {
    const newTasksState = tasksState.slice().map((task) => {
      if (task.id === id) {
        const newWeek = task.weekDays.map((week) => {
          if (week.name === weekDay) {
            return { ...week, done: !week.done };
          } else {
            return week;
          }
        });
        return { title: task.title, id: task.id, weekDays: newWeek };
      } else {
        return task;
      }
    });

    setTasksState(newTasksState);
  };

  const resetWeekHandler = () => {
    const newTasksState = tasksState.slice().map((task) => {
      const newWeek = task.weekDays.map((week) => {
        return { ...week, done: false };
      });
      return { title: task.title, id: task.id, weekDays: newWeek };
    });

    setTasksState(newTasksState);
    setShowModal(false);
  };

  const addNewTask = () => {
    setShowModal(true);
    setAction("addTask");
  };

  const reset = () => {
    setShowModal(true);
    setAction("reset");
  };

  const deleteTask = (id: number) => {
    setTasksState((prev) => {
      const updatedTasks = prev.filter((task) => task.id !== id);
      setLocalStorage("tasks", JSON.stringify(updatedTasks));

      return updatedTasks;
    });
  };

  const saveToLocalStorageNewTask = (title: string) => {
    setTasksState((prev) => {
      const newTask = {
        id: Date.now(),
        title: title,
        weekDays: [
          { name: "Пн", done: false },
          { name: "Вт", done: false },
          { name: "Ср", done: false },
          { name: "Чт", done: false },
          { name: "Пт", done: false },
          { name: "Сб", done: false },
          { name: "Вс", done: false },
        ],
      };

      const updatedTasks = [...prev, newTask];
      setLocalStorage("tasks", JSON.stringify(updatedTasks));

      return updatedTasks;
    });

    setShowModal(false);
  };

  const tasksMap = tasksState.map((task) => {
    return (
      <div key={task.id} className={styles.table__line}>
        <div className={styles.table__title}>
          {task.title}
          <button
            onClick={() => deleteTask(task.id)}
            className={styles.table__remove}
          >
            Delete
          </button>
        </div>
        <div className={styles.table__inputs}>
          {task.weekDays.map((week) => (
            <Checkbox
              key={week.name}
              onChecked={() => onCheckedHandler(task.id, week.name)}
              checked={week.done}
            />
          ))}
        </div>
      </div>
    );
  });

  return (
    <div className={styles.table}>
      <div className="container">
        <div className={styles.table__inner}>
          <div className={styles.table__lines}>
            <div className={styles.table__weekdays}>{weekDaysMap}</div>
            {tasksMap}
          </div>
          <div className={styles.table__btn}>
            <Button onClick={addNewTask} type="button">
              Add New Task
            </Button>
            <Button onClick={reset} type="button">
              Start New Week
            </Button>
          </div>
          <Modal
            showModal={showModal}
            setShowModal={setShowModal}
            resetWeekHandler={resetWeekHandler}
            action={action}
            saveToLocalStorageNewTask={saveToLocalStorageNewTask}
          />
        </div>
      </div>
    </div>
  );
}

export default Table;
