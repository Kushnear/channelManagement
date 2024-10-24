// src/components/SettingsMenu.jsx
import React from "react";
import styles from "./SettingsMenu.module.scss";

function SettingsMenu({ menuItems, selectedMenuItem, setSelectedMenuItem }) {
  return (
    <div className={styles.menu}>
      {menuItems.map((item) => (
        <button
          key={item.id}
          className={`${styles.menuItem} ${
            selectedMenuItem === item.id ? styles.selected : ""
          }`}
          onClick={() => setSelectedMenuItem(item.id)}
        >
          {item.name}
        </button>
      ))}
    </div>
  );
}

export default SettingsMenu;
