// src/components/ui/Dialog.jsx
import React from "react";
import styles from "./Dialog.module.scss";

function Dialog({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div className={styles.dialogOverlay}>
      <div className={styles.dialogContent}>
        <button className={styles.closeButton} onClick={onClose}>
          &times;
        </button>
        {children}
      </div>
    </div>
  );
}

export default Dialog;
