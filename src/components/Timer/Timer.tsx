import { useState, useEffect } from "react";

import { setLocalStorage } from "../../utils/setLocalStorage";
import { getLocalStorage } from "../../utils/getLocalStorage";

import styles from "./Timer.module.css";

function Timer() {
  const mainTimerLocalStorage = Number(getLocalStorage("main-timer"));
  const taskTimerLocalStorage = Number(getLocalStorage("task-timer"));

  const [mainTimer, setMainTimer] =
    useState<number>(mainTimerLocalStorage) || 0;
  const [taskTimer, setTaskTimer] =
    useState<number>(taskTimerLocalStorage) || 0;
  const [isRunning, setIsRunning] = useState<boolean>(false);

  const mainTimerFormat = {
    hours:
      Math.floor(mainTimer / 3600) < 10
        ? `0${Math.floor(mainTimer / 3600)}`
        : `${Math.floor(mainTimer / 3600)}`,
    minutes:
      Math.floor((mainTimer % 3600) / 60) < 10
        ? `0${Math.floor((mainTimer % 3600) / 60)}`
        : `${Math.floor((mainTimer % 3600) / 60)}`,
    seconds: mainTimer % 60 < 10 ? `0${mainTimer % 60}` : `${mainTimer % 60}`,
  };

  const taskTimerFormat = {
    hours:
      Math.floor(taskTimer / 3600) < 10
        ? `0${Math.floor(taskTimer / 3600)}`
        : `${Math.floor(taskTimer / 3600)}`,
    minutes:
      Math.floor((taskTimer % 3600) / 60) < 10
        ? `0${Math.floor((taskTimer % 3600) / 60)}`
        : `${Math.floor((taskTimer % 3600) / 60)}`,
    seconds: taskTimer % 60 < 10 ? `0${taskTimer % 60}` : `${taskTimer % 60}`,
  };

  const startTimer = () => {
    setIsRunning(true);
  };

  const stopTimers = () => {
    setIsRunning(false);
  };

  const clearTaskTimer = () => {
    setLocalStorage("task-timer", 0);
    setTaskTimer(0);
  };

  const clearAllTimers = () => {
    setIsRunning(false);
    setLocalStorage("all", 0);
    setMainTimer(0);
    setTaskTimer(0);
  };

  useEffect(() => {
    if (isRunning) {
      const interval = setInterval(() => {
        setMainTimer((prev) => {
          const next = prev + 1;
          setLocalStorage("main-timer", next);
          return next;
        });
        setTaskTimer((prev) => {
          const next = prev + 1;
          setLocalStorage("task-timer", next);
          return next;
        });
      }, 1000);

      return () => clearInterval(interval);
    }

    return;
  }, [isRunning, setMainTimer, setTaskTimer]);

  const mainTimerElement = (
    <div className={styles["timer__main-element"]}>
      {mainTimerFormat.hours}:{mainTimerFormat.minutes}:
      {mainTimerFormat.seconds}
    </div>
  );

  const taskTimerElement = (
    <div className={styles["timer__task-element"]}>
      {taskTimerFormat.hours}:{taskTimerFormat.minutes}:
      {taskTimerFormat.seconds}
    </div>
  );

  return (
    <div className={styles.timer}>
      <div className="container">
        <div className={styles.timer__inner}>
          <div className={styles.timer__main}>
            Main timer
            {mainTimerElement}
          </div>
          <div className={styles.timer__task}>
            Task timer
            {taskTimerElement}
          </div>
          <div className={styles.timer__btns}>
            <button className={styles.timer__btn} onClick={startTimer}>
              Start
            </button>
            <button className={styles.timer__btn} onClick={stopTimers}>
              Stop
            </button>
            <button className={styles.timer__btn} onClick={clearTaskTimer}>
              Reset Task Timer
            </button>
            <button className={styles.timer__btn} onClick={clearAllTimers}>
              Reset All Timers
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Timer;
