import React from "react";
import styles from "./Select.module.scss";

function Select({ children, value, onChange, error = false, valid = false }) {
  const selectClass = `${styles.select} ${
    error ? styles.error : valid ? styles.valid : ""
  }`;

  return (
    <select className={selectClass} value={value} onChange={onChange}>
      {children}
    </select>
  );
}

export default Select;
