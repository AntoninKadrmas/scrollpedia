import { ResultFavorite } from "@/types/random";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type FavoriteStore = {
  favorites: ResultFavorite[];
  favoriteSlug: Set<string>;
  toggleFavorite: (item: ResultFavorite) => void;
  isFavorite: (slug: string) => boolean;
};

export const useFavorite = create<FavoriteStore>()(
  persist(
    (set, get) => ({
      favorites: [],
      toggleFavorite: (item: ResultFavorite) =>
        set((state: FavoriteStore) => {
          const newFavorites = [...state.favorites];
          const newFavoriteSlug = new Set(state.favoriteSlug);
          if (state.favoriteSlug.has(item.slug)) {
            const index = newFavorites.findIndex(
              (fav) => fav.slug === item.slug,
            );
            newFavorites.splice(index, 1);
            newFavoriteSlug.delete(item.slug);
          } else {
            newFavorites.push(item);
            newFavoriteSlug.add(item.slug);
          }
          return { favorites: newFavorites, favoriteSlug: newFavoriteSlug };
        }),
      isFavorite: (slug: string) => {
        const state = get();
        return state.favoriteSlug.has(slug);
      },
      favoriteSlug: new Set(),
    }),
    {
      name: "favorite-storage",
      partialize: (state) => ({ favorites: state.favorites }),
      merge: (persistedState, currentState) => {
        const persisted = persistedState as Partial<FavoriteStore> | undefined;

        const favorites = persisted?.favorites ?? [];

        return {
          ...currentState,
          ...persisted,
          favorites,
          favoriteSlug: new Set(favorites.map((fav) => fav.slug)),
        };
      },
    },
  ),
);
