// src/components/ui/Select.jsx
import React from "react";
import styles from "./Select.module.scss";

function Select({ children, value, onChange }) {
  return (
    <select
      className={styles.select}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {children}
    </select>
  );
}

export default Select;
