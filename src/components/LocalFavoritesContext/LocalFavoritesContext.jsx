import { createContext, useContext, useEffect, useState } from "react";

export const LocalFavoritesContext = createContext();
export const useLocalFavorites = () => useContext(LocalFavoritesContext);

const LocalFavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  // ✅ تحميل المفضلة من localStorage عند أول تحميل
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("localFavorites")) || [];
    setFavorites(saved);
  }, []);

  // ✅ تحديث localStorage كل ما تتغير المفضلة
  useEffect(() => {
    localStorage.setItem("localFavorites", JSON.stringify(favorites));
  }, [favorites]);

const toggleFavorite = (item) => {
  const exists = favorites.find((fav) => fav.id === item.id);
  if (exists) {
    setFavorites(favorites.filter((fav) => fav.id !== item.id));
  } else {
    // ضيفي media_type لو مش موجود
    const itemWithType = {
      ...item,
      media_type: item.media_type || (item.title ? "movie" : "tv"),
    };
    setFavorites([...favorites, itemWithType]);
  }
};

  const isFavorite = (id) => favorites.some((fav) => fav.id === id);

  return (
    <LocalFavoritesContext.Provider
      value={{ favorites, toggleFavorite, isFavorite }}
    >
      {children}
    </LocalFavoritesContext.Provider>
  );
};

export default LocalFavoritesProvider;
