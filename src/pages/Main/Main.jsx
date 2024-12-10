import { useState, useEffect } from "react";
import ChannelSidebar from "../../components/ChannelSidebar/ChannelSidebar";
import SettingsMenu from "../../components/SettingsMenu/SettingsMenu";
import CategoriesContent from "../../components/CategoriesContent/CategoriesContent";
import CategoryDialog from "../../components/CategoryDialog/CategoryDialog";
import styles from "./Main.module.scss";
import DataSourcesContent from "../../components/DataSourcesContent/DataSourcesContent";
import DataSourcesDialog from "../../components/DataSourcesDialog/DataSourcesDialog";
const apiAdress = "http://62.109.20.50:3512";
const telegramUserId = "131067518";
const authToken =
  "10d5bb890e49f3475afa3bb422825ad01d4e3e9f3857a5dbf4984554a617a3b8";

const WEEKDAYS = [
  "Каждый день",
  "Понедельник",
  "Вторник",
  "Среда",
  "Четверг",
  "Пятница",
  "Суббота",
  "Воскресенье",
];

const MENU_ITEMS = [
  { id: "data", name: "получение данных" },
  { id: "categories", name: "категории" },
  { id: "prompts", name: "промты" },
  { id: "posts", name: "посты" },
];

const initialCategories = [
  {
    id: 1,
    name: "Категория 1",
    times: [],
    day: "Каждый день",
    isGenerative: false,
    isAutoGeneration: false,
    autoAccept: false,
  },
  // ... другие категории
];

function Main() {
  const [channels, setChannels] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newChannelLink, setNewChannelLink] = useState("");
  const [isAddingChannel, setIsAddingChannel] = useState(null);
  const [categories, setCategories] = useState([]);
  const [selectedChannel, setSelectedChannel] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState("categories");
  const [listeningChannels, setListeningChannels] = useState([]);
  const [loadingListeningChannels, setLoadingListeningChannels] =
    useState(true);
  const [errorListeningChannels, setErrorListeningChannels] = useState(null);
  const [selectedListeningChannel, setSelectedListeningChannel] = useState({});
  const [isDataSourceDialogOpen, setIsDataSourceDialogOpen] = useState(true);
  const [isEditListeningChannel, setIsEditListeningChannel] = useState(false);

  // State for category form
  const [editingCategory, setEditingCategory] = useState(null);
  const [categoryForm, setCategoryForm] = useState({
    name: "",
    times: [],
    day: "Каждый день",
    isGenerative: false,
    isAutoGeneration: false,
    autoAccept: false,
  });

  useEffect(() => {
    const fetchChannels = async () => {
      try {
        const response = await fetch(
          `${apiAdress}/api/v1/channel/channels/${telegramUserId}/10/0`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "x-auth-token": `${authToken}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error(`Ошибка запроса: ${response.status}`);
        }
        const data = await response.json();
        setChannels(data.channels); // предполагается, что каналы в поле `channels`
        // console.log("channels", data.channels);
        setSelectedChannel(data.channels[0]); // по умолчанию выбираем первый канал
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchChannels();
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      if (!selectedChannel) return;

      try {
        const response = await fetch(
          `${apiAdress}/api/v1/channel/${selectedChannel.id}/categories/10/0`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "x-auth-token": `${authToken}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Ошибка запроса: ${response.status}`);
        }

        const { post_categories } = await response.json();
        // console.log("this is post_categories", post_categories);
        setCategories(post_categories || []); // Set fetched categories
      } catch (err) {
        console.error(err.message);
      }
    };

    fetchCategories();
  }, [selectedChannel]); // Fetch categories when a new channel is selected

  useEffect(() => {
    if (selectedMenuItem === "data") {
      fetchListeningChannels();
    }
  }, [selectedMenuItem]);

  const handleAddChannel = async () => {
    if (!isAddingChannel) {
      // console.log("i am about to add channel");
      setIsAddingChannel(true);
      return;
    }

    if (newChannelLink) {
      try {
        const response = await fetch(`${apiAdress}/api/v1/channel`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": `${authToken}`,
          },
          body: JSON.stringify({
            bot_user: { chat_id: telegramUserId },
            url: newChannelLink,
            is_own: true,
          }),
        });

        if (!response.ok) {
          throw new Error("Не удалось добавить канал");
        }

        const newChannel = await response.json();
        setChannels((prev) => [...prev, { ...newChannel, id: newChannel.id }]);
        setNewChannelLink("");
        setIsAddingChannel(false);
      } catch (err) {
        console.error(err.message);
      }
    }
  };

  const fetchListeningChannels = async () => {
    try {
      // setLoadingListeningChannels(true);
      const response = await fetch(
        `${apiAdress}/api/v1/resource/resources_by_channel`,
        {
          method: "POST",
          headers: {
            "x-auth-token": `${authToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            channel_id: selectedChannel.id,
            limit: 10,
            offset: 0,
          }),
        }
      );

      if (!response.ok) {
        console.log("response ne ok v listened", response);
        throw new Error(
          `Ошибка запроса в fetchListeningChannels: ${response.status} `
        );
      }

      const data = await response.json();

      setListeningChannels(data);
    } catch (err) {
      setErrorListeningChannels(err.message);
    } finally {
      setLoadingListeningChannels(false);
    }
  };

  const handleEditListeningChannel = (channelData) => {
    console.log("handleEditListeningChannel is working");
    console.log("and this channel is being edited", channelData);
  };

  const handleDeleteListeningChannel = async (channelData) => {
    try {
      const response = await fetch(
        `${apiAdress}/api/v1/channel/${channelData.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": `${authToken}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Не удалось удалить канал");
      }

      await fetchListeningChannels();
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleAddListeningChannel = async (channelData) => {
    try {
      const response = await fetch(`${apiAdress}/api/v1/channel`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": `${authToken}`,
        },
        body: JSON.stringify({
          bot_user: { chat_id: telegramUserId },
          url: channelData.url,
          is_own: false,
          bugged: true,
          post_category_id: channelData.categoryId,
          parent_channel_id: selectedChannel.id,
        }),
      });

      if (!response.ok) {
        throw new Error("Не удалось добавить прослушиваемый канал");
      }

      const newChannel = await response.json();
      await fetchListeningChannels();
    } catch (err) {
      console.error(err.message);
    }
    // console.log("handleAddListeningChannel is working", channelData);
  };

  // Обработчики для категорий
  const handleAddCategory = () => {
    setEditingCategory(null);
    setCategoryForm({
      name: "",
      times: [],
      day: "Каждый день",
      isGenerative: false,
      isAutoGeneration: false,
      autoAccept: false,
    });
    setIsDialogOpen(true);
  };

  const handleDeleteCategory = (id) => {
    setCategories(categories.filter((cat) => cat.id !== id));
  };

  const handleEditCategory = (category) => {
    setEditingCategory(category);
    setCategoryForm({
      name: category.name,
      times: [...category.times],
      day: category.day,
      isGenerative: category.isGenerative,
      isAutoGeneration: category.isAutoGeneration,
      autoAccept: category.autoAccept,
    });
    setIsDialogOpen(true);
  };

  const handleAddTime = () => {
    setCategoryForm((prev) => ({
      ...prev,
      times: [...prev.times, { hours: "00", minutes: "00" }],
    }));
  };

  const handleRemoveTime = (index) => {
    setCategoryForm((prev) => ({
      ...prev,
      times: prev.times.filter((_, i) => i !== index),
    }));
  };

  const handleTimeChange = (index, value) => {
    const [hours, minutes] = value.split(":");
    setCategoryForm((prev) => ({
      ...prev,
      times: prev.times.map((time, i) =>
        i === index ? { hours, minutes } : time
      ),
    }));
  };

  const handleSaveCategory = () => {
    if (editingCategory) {
      setCategories((prev) =>
        prev.map((cat) =>
          cat.id === editingCategory.id ? { ...categoryForm, id: cat.id } : cat
        )
      );
    } else {
      const newCategory = {
        ...categoryForm,
        id: categories.length + 1,
      };
      setCategories((prev) => [...prev, newCategory]);
    }
    setIsDialogOpen(false);
  };

  const handleToggleRadio = (value) => {
    if (value === "generative") {
      setCategoryForm((prev) => ({
        ...prev,
        isGenerative: !prev.isGenerative,
        isAutoGeneration: false,
      }));
    } else if (value === "auto-generation") {
      setCategoryForm((prev) => ({
        ...prev,
        isAutoGeneration: !prev.isAutoGeneration,
        isGenerative: false,
      }));
    }
  };

  if (loading) {
    return <div>Загрузка каналов...</div>;
  }

  if (error) {
    return <div>Ошибка: {error}</div>;
  }

  return (
    <div className={styles.main}>
      <ChannelSidebar
        channels={channels}
        selectedChannel={selectedChannel}
        setSelectedChannel={setSelectedChannel}
        isAddingChannel={isAddingChannel} // Передаем состояние
        setIsAddingChannel={setIsAddingChannel} // Передаем функцию для обновления состояния
        handleAddChannel={handleAddChannel}
        setNewChannelLink={setNewChannelLink}
        newChannelLink={newChannelLink}
      />
      <SettingsMenu
        menuItems={MENU_ITEMS}
        selectedMenuItem={selectedMenuItem}
        setSelectedMenuItem={setSelectedMenuItem}
      />
      <div className={styles.mainContent}>
        {selectedMenuItem === "data" && !loadingListeningChannels && (
          <DataSourcesContent
            listeningChannels={listeningChannels}
            handleEditListeningChannel={handleEditListeningChannel}
            handleDeleteListeningChannel={handleDeleteListeningChannel}
            handleAddListeningChannel={handleAddListeningChannel}
            setIsdataSourceDialogOpen={setIsDataSourceDialogOpen}
            loading={loadingListeningChannels}
            error={errorListeningChannels}
            setSelectedListeningChannel={setSelectedListeningChannel}
            setIsEditListeningChannel={setIsEditListeningChannel}
          />
        )}
        {selectedMenuItem === "categories" && (
          <>
            {loading ? (
              <div>Загрузка категорий...</div>
            ) : (
              <CategoriesContent
                categories={categories}
                handleAddCategory={handleAddCategory}
                handleEditCategory={handleEditCategory}
                handleDeleteCategory={handleDeleteCategory}
              />
            )}
          </>
        )}
      </div>
      <DataSourcesDialog
        isDataSourceDialogOpen={isDataSourceDialogOpen}
        setIsdataSourceDialogOpen={setIsDataSourceDialogOpen}
        onSubmit={(channelData) => {
          console.log("Channel data submitted:", channelData);
          // Handle data submission here, e.g., making an API request
        }}
        channelData={selectedListeningChannel}
        categories={categories}
        isEditListeningChannel={isEditListeningChannel}
        handleEditListeningChannel={handleEditListeningChannel}
        handleAddListeningChannel={handleAddListeningChannel}
        handleDeleteListeningChannel={handleDeleteListeningChannel}
      />
      <CategoryDialog
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
        categoryForm={categoryForm}
        setCategoryForm={setCategoryForm}
        handleSaveCategory={handleSaveCategory}
        editingCategory={editingCategory}
        WEEKDAYS={WEEKDAYS}
        handleAddTime={handleAddTime}
        handleRemoveTime={handleRemoveTime}
        handleTimeChange={handleTimeChange}
        handleToggleRadio={handleToggleRadio}
        categories={categories}
      />
    </div>
  );
}

export default Main;
