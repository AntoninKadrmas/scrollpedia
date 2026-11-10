import { create } from "zustand";

type SearchFavoriteState = {
  startSearch: boolean;
  setStartSearch: (value: boolean) => void;
  startFavorite: boolean;
  setStartFavorite: (value: boolean) => void;
  searchSlug: string;
  setSearchSlug: (value: string) => void;
};

export const useSearchFavorite = create<SearchFavoriteState>((set) => ({
  startSearch: false,
  setStartSearch: (value: boolean) => set({ startSearch: value }),
  startFavorite: false,
  setStartFavorite: (value: boolean) => set({ startFavorite: value }),
  searchSlug: "",
  setSearchSlug: (value: string) => set({ searchSlug: value }),
}));
