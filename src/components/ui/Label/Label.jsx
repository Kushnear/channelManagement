// src/components/ui/Label.jsx
import React from "react";
import styles from "./Label.module.scss";

function Label({ children, htmlFor }) {
  return (
    <label htmlFor={htmlFor} className={styles.label}>
      {children}
    </label>
  );
}

export default Label;
