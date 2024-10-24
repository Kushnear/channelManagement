import React from "react";
import styles from "./CategoryItem.module.scss";

const CategoryItem = ({ category }) => {
  return (
    <div className={styles.categoryItem}>
      <h3>{category.name}</h3>
      <p>{category.description}</p>
    </div>
  );
};

export default CategoryItem;
