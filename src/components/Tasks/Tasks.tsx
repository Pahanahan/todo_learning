import Task from "../Task/Task";

import styles from "./Tasks.module.css";

function Tasks() {
  return <div className={styles.tasks}>{<Task />}</div>;
}

export default Tasks;
