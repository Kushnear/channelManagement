// src/components/CategoryDialog.jsx
import React from "react";
import Dialog from "../ui/Dialog/Dialog";
import Button from "../ui/Button/Button";
import Input from "../ui/Input/Input";
import Checkbox from "../ui/Checkbox/Checkbox";
// import RadioGroup from "../ui/RadioGroup";
import Label from "../ui/Label/Label";
import Select from "../ui/Select/Select";
import { Plus, X } from "lucide-react";
import styles from "./CategoryDialog.module.scss";

function CategoryDialog({
  isDialogOpen,
  setIsDialogOpen,
  categoryForm,
  setCategoryForm,
  handleSaveCategory,
  editingCategory,
  WEEKDAYS,
  handleAddTime,
  handleRemoveTime,
  handleTimeChange,
  handleToggleRadio,
}) {
  return (
    <Dialog isOpen={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
      <h2>{editingCategory ? "Настройки категории" : "Создать категорию"}</h2>
      <div className={styles.formGroup}>
        <Label>Название категории</Label>
        <Input
          value={categoryForm.name}
          onChange={(e) =>
            setCategoryForm({ ...categoryForm, name: e.target.value })
          }
          placeholder="Введите название категории"
        />

        {/* Остальные элементы формы... */}
        <div className={styles.actions}>
          <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
            Отмена
          </Button>
          <Button onClick={handleSaveCategory}>
            {editingCategory ? "Сохранить" : "Создать"}
          </Button>
        </div>
      </div>
    </Dialog>
  );
}

export default CategoryDialog;
