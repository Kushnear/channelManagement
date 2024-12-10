import React from "react";
import styles from "./Input.module.scss";

function Input({ size = "md", error = false, valid = false, ...props }) {
  const inputClass = `${styles.input} ${styles[size]} ${
    error ? styles.error : valid ? styles.valid : ""
  }`;

  return <input className={inputClass} {...props} />;
}

export default Input;
