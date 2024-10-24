// src/components/ui/Button.jsx
import React from "react";
import styles from "./Button.module.scss";

function Button({ children, variant = "default", size = "md", ...props }) {
  return (
    <button
      className={`${styles.button} ${styles[variant]} ${styles[size]}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
