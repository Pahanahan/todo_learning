import type React from "react";
import { memo } from "react";

import styles from "./Checkbox.module.css";

interface CheckboxProps {
  checked: boolean;
  onChecked: React.ChangeEventHandler<HTMLInputElement>;
}

function Checkbox({ checked, onChecked }: CheckboxProps) {
  return (
    <div className={styles.input}>
      <div className={styles.input__box}>
        <input onChange={onChecked} type="checkbox" checked={checked} />
      </div>
    </div>
  );
}

export default memo(Checkbox);
