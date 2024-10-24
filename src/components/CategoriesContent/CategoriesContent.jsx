// src/components/CategoriesContent.jsx
import React from "react";
import { Pencil, X, Plus } from "lucide-react";
import Button from "../ui/Button/Button";
import styles from "./CategoriesContent.module.scss";

function CategoriesContent({
  categories,
  handleAddCategory,
  handleEditCategory,
  handleDeleteCategory,
}) {
  return (
    <>
      <div className={styles.header}>
        <h2>Категории</h2>
        <Button onClick={handleAddCategory} size="sm">
          <Plus />
        </Button>
      </div>
      <div className={styles.categoryList}>
        {categories.map((category) => (
          <div key={category.id} className={styles.categoryItem}>
            <span>{category.title}</span>
            <div className={styles.actions}>
              <button onClick={() => handleEditCategory(category)}>
                <Pencil />
              </button>
              <button onClick={() => handleDeleteCategory(category.id)}>
                <X />
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default CategoriesContent;
