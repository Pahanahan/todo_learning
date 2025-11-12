import type React from "react";
import styles from "./Button.module.css";

interface ButttonProps {
  type: "button" | "submit";
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

function Button({ type, children, onClick }: ButttonProps) {
  return (
    <button onClick={onClick} className={styles.btn} type={type}>
      {children}
    </button>
  );
}

export default Button;
