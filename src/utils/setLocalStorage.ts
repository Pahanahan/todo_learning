export function setLocalStorage(
  key: "main-timer" | "task-timer" | "all",
  time: number
) {
  if (key === "all") {
    localStorage.setItem("main-timer", time.toString());
    localStorage.setItem("task-timer", time.toString());
  }

  localStorage.setItem(key, time.toString());
}
