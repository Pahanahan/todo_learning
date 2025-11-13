import { memo, useState } from "react";
import TaskRow from "./components/TaskRow/TaskRow";
import Button from "../../UI/Button/Button";
import Modal from "../Modal/Modal";
import { setLocalStorage } from "../../utils/setLocalStorage";
import { getLocalStorage } from "../../utils/getLocalStorage";

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
  const [deletedTaskId, setDeletedTaskId] = useState<number>(0);

  const weekDays = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

  const weekDaysMap = weekDays.map((item) => {
    return <div key={item}>{item}</div>;
  });

  const onCheckedHandler = (id: number, weekDay: string) => {
    const newTasksState = tasksState.map((task) => {
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
    setLocalStorage("tasks", JSON.stringify(newTasksState));
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
    setShowModal(true);
    setAction("deleteTask");
    setDeletedTaskId(id);
  };

  const updatedDeleteTasks = (id: number) => {
    setTasksState((prev) => {
      const updatedTasks = prev.filter((task) => task.id !== id);
      setLocalStorage("tasks", JSON.stringify(updatedTasks));

      return updatedTasks;
    });
    setShowModal(false);
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
      <TaskRow
        key={task.id}
        task={task}
        onChecked={onCheckedHandler}
        onDelete={deleteTask}
      ></TaskRow>
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
            updatedDeleteTasks={updatedDeleteTasks}
            deletedTaskId={deletedTaskId}
          />
        </div>
      </div>
    </div>
  );
}

export default memo(Table);
