import React, { createContext, useContext, useState } from "react";

const FavoriteContext = createContext();

export function FavoriteProvider({ children }) {
  const [favorites, setFavorites] = useState([]);

  function addFavorite(movie) {
    setFavorites((prev) => {
      if (prev.find((m) => m.id === movie.id)) return prev;
      return [...prev, movie];
    });
  }

  function removeFavorite(movieId) {
    setFavorites((prev) => prev.filter((m) => m.id !== movieId));
  }

  function isFavorite(movieId) {
    return favorites.some((m) => m.id === movieId);
  }

  return (
    <FavoriteContext.Provider
      value={{ favorites, addFavorite, removeFavorite, isFavorite }}
    >
      {children}
    </FavoriteContext.Provider>
  );
}

export function useFavorites() {
  return useContext(FavoriteContext);
}
