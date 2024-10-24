// src/components/ui/Checkbox.jsx
import React from "react";
import styles from "./Checkbox.module.scss";

function Checkbox({ id, checked, onChange }) {
  return (
    <input
      type="checkbox"
      id={id}
      className={styles.checkbox}
      checked={checked}
      onChange={(e) => onChange(e.target.checked)}
    />
  );
}

export default Checkbox;
