export function getLocalStorage(key: "main-timer" | "task-timer" | "tasks") {
  const time = localStorage.getItem(key);
  return time;
}
