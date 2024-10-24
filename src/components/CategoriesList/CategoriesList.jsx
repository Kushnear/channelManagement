import React from "react";
import CategoryItem from "../CategoryItem/CategoryItem";
import styles from "./CategoriesList.module.scss";

const CategoriesList = ({ categories }) => {
  return (
    <div className={styles.categoriesList}>
      {categories.length > 0 ? (
        categories.map((category, index) => (
          <CategoryItem key={index} category={category} />
        ))
      ) : (
        <p>No categories available.</p>
      )}
    </div>
  );
};

export default CategoriesList;
