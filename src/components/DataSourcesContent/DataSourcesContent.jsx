import React, { useState } from "react";
import styles from "./DataSourcesContent.module.scss";
import Select from "../ui/Select/Select"; // Импортируем кастомный Select

const DataSourcesContent = ({ channels, loading, error }) => {
  const [selectedSource, setSelectedSource] = useState("all");

  const sourceTypes = [
    { id: "all", label: "All" },
    { id: "tg-channels", label: "TG-каналы" },
    { id: "rss", label: "RSS" },
  ];

  const filteredChannels = channels?.filter(
    (channel) =>
      selectedSource === "all" ||
      (selectedSource === "tg-channels" && channel.type === "TG") ||
      (selectedSource === "rss" && channel.type === "RSS")
  );

  if (loading) {
    return <div className={styles.loading}>Загрузка каналов...</div>;
  }

  if (error) {
    return <div className={styles.error}>Ошибка: {error}</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.sourceSelect}>
          <Select value={selectedSource} onChange={setSelectedSource}>
            {sourceTypes.map((source) => (
              <option key={source.id} value={source.id}>
                {source.label}
              </option>
            ))}
          </Select>
        </div>
      </div>

      <div className={styles.channelsList}>
        {filteredChannels?.map((channel) => (
          <div key={channel.id} className={styles.channelRow}>
            <div className={styles.channelInfo}>
              <div className={styles.typeIndicator}>{channel.type}</div>
              <span className={styles.channelName}>
                {channel.name || channel.url}
              </span>
              <span className={styles.categoryLabel}>
                {channel.category?.name || "Без категории"}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DataSourcesContent;
