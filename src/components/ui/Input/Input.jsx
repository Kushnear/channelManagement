// src/components/ui/Input.jsx
import React from "react";
import styles from "./Input.module.scss";

function Input({ size = "md", ...props }) {
  return <input className={`${styles.input} ${styles[size]}`} {...props} />;
}

export default Input;
