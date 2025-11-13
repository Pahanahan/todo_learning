import Checkbox from "../Checkbox/Checkbox";

import styles from "./TaskRow.module.css";

interface WeekDay {
  name: string;
  done: boolean;
}

interface Task {
  title: string;
  id: number;
  weekDays: WeekDay[];
}

interface TaskRowProps {
  task: Task;
  onChecked: (id: number, day: string) => void;
  onDelete: (id: number) => void;
}

function TaskRow({ task, onChecked, onDelete }: TaskRowProps) {
  return (
    <div className={styles.task}>
      <div className={styles.task__title}>
        {task.title}
        <button
          onClick={() => onDelete(task.id)}
          className={styles.task__remove}
        >
          Delete
        </button>
      </div>
      <div className={styles.task__inputs}>
        {task.weekDays.map((week) => (
          <Checkbox
            key={week.name}
            onChecked={() => onChecked(task.id, week.name)}
            checked={week.done}
          />
        ))}
      </div>
    </div>
  );
}

export default TaskRow;
