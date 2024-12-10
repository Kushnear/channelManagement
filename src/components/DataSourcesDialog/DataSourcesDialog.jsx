import React, { useState, useEffect } from "react";
import Dialog from "../ui/Dialog/Dialog";
import Button from "../ui/Button/Button";
import Input from "../ui/Input/Input";
import Label from "../ui/Label/Label";
import Select from "../ui/Select/Select";
import styles from "./DataSourcesDialog.module.scss";

const DataSourcesDialog = ({
  isDataSourceDialogOpen,
  setIsdataSourceDialogOpen,
  onSubmit,
  channelData = {},
  categories = [],
  isEditListeningChannel,
  handleEditListeningChannel,
  handleAddListeningChannel,
}) => {
  const [title, setTitle] = useState(channelData.title || "");
  const [type, setType] = useState(channelData.type || "tg");
  const [url, setUrl] = useState(channelData.url || "");
  const [categoryId, setCategoryId] = useState(
    channelData.post_category_id || ""
  );
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [errors, setErrors] = useState({
    title: { error: false, valid: false },
    url: { error: false, valid: false },
    categoryId: { error: false, valid: false },
  });

  const validateField = (fieldName, value) => {
    switch (fieldName) {
      case "title":
        return type === "rss" && value.trim() === "" ? false : true;
      case "url":
        if (!value.trim()) return false;
        if (type === "tg") return /^https:\/\/t\.me\/\+/.test(value.trim());
        return true;
      case "categoryId":
        return value !== "";
      default:
        return true;
    }
  };

  const handleFieldBlur = (fieldName, value) => {
    const isValid = validateField(fieldName, value);
    setErrors((prev) => ({
      ...prev,
      [fieldName]: { error: !isValid, valid: isValid },
    }));
  };

  const validateForm = () => {
    const newErrors = {
      title: {
        error: type === "rss" && title.trim() === "",
        valid: type !== "rss" || title.trim() !== "",
      },
      url: {
        error:
          (!isEditListeningChannel && url.trim() === "") ||
          (type === "tg" && !/^https:\/\/t\.me\/\+/.test(url.trim())),
        valid:
          (isEditListeningChannel || url.trim() !== "") &&
          (type !== "tg" || /^https:\/\/t\.me\/\+/.test(url.trim())),
      },
      categoryId: {
        error: categoryId === "",
        valid: categoryId !== "",
      },
    };
    setErrors(newErrors);
    return Object.values(newErrors).every((field) => field.valid);
  };

  const handleAccept = () => {
    setIsSubmitted(true);
    if (validateForm()) {
      const data = {
        title,
        type,
        url,
        categoryId,
      };
      if (isEditListeningChannel) {
        handleEditListeningChannel(data);
      } else {
        handleAddListeningChannel(data);
      }
      handleClose();
    }
  };

  const handleClose = () => {
    setIsdataSourceDialogOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setTitle("");
    setType("tg");
    setUrl("");
    setCategoryId("");
    setErrors({
      title: { error: false, valid: false },
      url: { error: false, valid: false },
      categoryId: { error: false, valid: false },
    });
    setIsSubmitted(false);
  };

  useEffect(() => {
    if (channelData) {
      setTitle(channelData.title || "");
      setType(channelData.type || "tg");
      setUrl(channelData.url || "");
      setCategoryId(channelData.post_category_id || "");
    }
  }, [channelData]);

  return (
    <Dialog isOpen={isDataSourceDialogOpen} onClose={handleClose}>
      <div className={styles.dialogContent}>
        {/* Channel Type Selector */}
        {!isEditListeningChannel && (
          <div className={styles.typeSelect}>
            <Label htmlFor="type">Тип</Label>
            <Select
              id="type"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="tg">Канал</option>
              <option value="rss">RSS</option>
            </Select>
          </div>
        )}

        {/* Title input for RSS type only */}
        {type === "rss" && (
          <div className={styles.header}>
            <Label htmlFor="title">Название</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onBlur={() => handleFieldBlur("title", title)}
              error={isSubmitted && errors.title.error}
              valid={errors.title.valid}
            />
          </div>
        )}

        {/* URL input */}
        <div className={styles.linkInput}>
          <Label htmlFor="link">Ссылка</Label>
          <Input
            id="link"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onBlur={() => handleFieldBlur("url", url)}
            error={isSubmitted && errors.url.error}
            valid={errors.url.valid}
          />
        </div>

        {/* Category Selector */}
        <div className={styles.categorySelect}>
          <Label htmlFor="category">Категория</Label>
          <Select
            id="category"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            onBlur={() => handleFieldBlur("categoryId", categoryId)}
            error={isSubmitted && errors.categoryId.error}
            valid={errors.categoryId.valid}
          >
            <option value="">Выберите категорию</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.title}
              </option>
            ))}
          </Select>
        </div>

        {/* Action Buttons */}
        <div className={styles.buttons}>
          <Button onClick={handleClose} variant="red">
            Отмена
          </Button>
          <Button onClick={handleAccept} variant="green">
            Принять
          </Button>
        </div>
      </div>
    </Dialog>
  );
};

export default DataSourcesDialog;
