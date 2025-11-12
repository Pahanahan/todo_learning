export function getLocalStorage(key: "main-timer" | "task-timer") {
  const time = localStorage.getItem(key);
  return time;
}
