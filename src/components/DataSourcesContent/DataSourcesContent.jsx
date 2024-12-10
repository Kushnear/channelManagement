import React, { useState, useEffect } from "react";
import styles from "./DataSourcesContent.module.scss";
import Select from "../ui/Select/Select";
import { Pencil, X, Plus } from "lucide-react";
import Button from "../ui/Button/Button";

const DataSourcesContent = ({
  listeningChannels,
  loading,
  error,
  handleEditListeningChannel,
  handleDeleteListeningChannel,
  handleAddListeningChannel,
  setIsdataSourceDialogOpen,
  setSelectedListeningChannel,
  setIsEditListeningChannel,
}) => {
  const [selectedSource, setSelectedSource] = useState("all");

  useEffect(() => {
    if (listeningChannels.length) {
      console.log("this is data sources content data", listeningChannels);
    }
    console.log("this is data sources content data", listeningChannels);
  }, [listeningChannels]);

  // const combinedData = [
  //   ...listeningChannels.channels.map((item) => ({
  //     ...item,
  //     type: "tg",
  //   })),
  //   ...listeningChannels.rss.map((item) => ({ ...item, type: "rss" })),
  // ];

  const sourceTypes = [
    { id: "all", label: "All" },
    { id: "tg-channels", label: "TG-каналы" },
    { id: "rss", label: "RSS" },
  ];

  // const filteredChannels = combinedData.filter((channel) => {
  //   if (selectedSource === "all") return true;
  //   if (selectedSource === "tg-channels" && channel.type === "tg") return true;
  //   if (selectedSource === "rss" && channel.type === "rss") return true;
  //   return false;
  // });

  if (loading) {
    return <div className={styles.loading}>Загрузка каналов...</div>;
  }

  if (error) {
    return <div className={styles.error}>Ошибка: {error}</div>;
  }

  return (
    <div className={styles.container}>
      {/* <div className={styles.header}>
        <div className={styles.sourceSelect}>
          <Select
            value={selectedSource}
            onChange={(e) => setSelectedSource(e.target.value)}
          >
            {sourceTypes.map((source) => (
              <option key={source.id} value={source.id}>
                {source.label}
              </option>
            ))}
          </Select>
        </div>
        <Button
          onClick={() => {
            console.log("button add listening channel is clicked");
            setIsdataSourceDialogOpen(true);
            setIsEditListeningChannel(false);
            setSelectedListeningChannel({});
          }}
          size="sm"
        >
          <Plus />
        </Button>
      </div>

      <div className={styles.channelsList}>
        {filteredChannels.map((channel) => (
          <div key={channel.id} className={styles.channelRow}>
            <div className={styles.channelInfo}>
              <div className={styles.typeIndicator}>{channel.type}</div>
              <div className={styles.channelLabel}>
                <span className={styles.channelName}>
                  {channel.title || channel.url}
                </span>
                <span className={styles.categoryLabel}>
                  {channel.post_category_title || "Без категории"}
                </span>
              </div>
            </div>
            <div className={styles.actions}>
              <button
                onClick={() => {
                  console.log("edit btn click");
                  setSelectedListeningChannel(channel);
                  setIsEditListeningChannel(true);
                  setIsdataSourceDialogOpen(true);
                }}
              >
                <Pencil />
              </button>
              <button onClick={() => handleDeleteListeningChannel(channel)}>
                <X />
              </button>
            </div>
          </div>
        ))}
      </div> */}
    </div>
  );
};

export default DataSourcesContent;
