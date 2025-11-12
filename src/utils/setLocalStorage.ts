export function setLocalStorage(
  key: "main-timer" | "task-timer" | "all" | "tasks",
  value: number | string
) {
  if (key === "all") {
    localStorage.setItem("main-timer", value.toString());
    localStorage.setItem("task-timer", value.toString());
  }

  localStorage.setItem(key, value.toString());
}
