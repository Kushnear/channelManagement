import React, { useState } from "react";
import { Plus } from "lucide-react";
import Input from "../ui/Input/Input";
import Button from "../ui/Button/Button";
import styles from "./ChannelSidebar.module.scss";

function ChannelSidebar({
  channels,
  selectedChannel,
  setSelectedChannel,
  isAddingChannel,
  setIsAddingChannel,
  newChannelLink,
  setNewChannelLink,
  handleAddChannel,
}) {
  const [hoveredChannel, setHoveredChannel] = useState(null); // Track the hovered channel

  return (
    <div className={styles.sidebar}>
      <div className={styles.channelList}>
        {channels.map((channel) => (
          <div
            key={channel.id}
            className={`${styles.channelItem} ${
              selectedChannel?.id === channel.id ? styles.selected : ""
            }`}
            onMouseEnter={() => setHoveredChannel(channel.id)}
            onMouseLeave={() => setHoveredChannel(null)}
            onClick={() => setSelectedChannel(channel)}
          >
            <div className={styles.circle}>
              {channel.title.charAt(0).toLowerCase()}
            </div>{" "}
            {/* First letter of title */}
            {hoveredChannel === channel.id && (
              <div className={styles.channelTitle}>{channel.title}</div>
            )}
          </div>
        ))}
        {isAddingChannel ? (
          <div className={styles.newChannelForm}>
            <Input
              value={newChannelLink}
              onChange={(e) => setNewChannelLink(e.target.value)}
              placeholder="Ссылка на канал"
              size="sm"
            />
            <div className={styles.formActions}>
              <Button
                onClick={() => setIsAddingChannel(false)}
                variant="outline"
                size="sm"
              >
                Отмена
              </Button>
              <Button onClick={handleAddChannel} size="sm">
                OK
              </Button>
            </div>
          </div>
        ) : (
          <button
            className={styles.addChannelButton}
            onClick={() => setIsAddingChannel(true)}
          >
            <Plus />
          </button>
        )}
      </div>
    </div>
  );
}

export default ChannelSidebar;
