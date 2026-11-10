import { create } from "zustand";

type SearchFavoriteState = {
  startSearch: boolean;
  setStartSearch: (value: boolean) => void;
  startFavorite: boolean;
  setStartFavorite: (value: boolean) => void;
  searchSlug: string;
  setSearchSlug: (value: string) => void;
  scrollOffsets: Record<string, number>;
  setScrollOffset: (key: string, offset: number) => void;
};

export const useSearchFavorite = create<SearchFavoriteState>((set) => ({
  startSearch: false,
  setStartSearch: (value: boolean) => set({ startSearch: value }),
  startFavorite: false,
  setStartFavorite: (value: boolean) => set({ startFavorite: value }),
  searchSlug: "",
  setSearchSlug: (value: string) => set({ searchSlug: value }),
  scrollOffsets: {},
  setScrollOffset: (key, offset) =>
    set((state) =>
      state.scrollOffsets[key] === offset
        ? state
        : { scrollOffsets: { ...state.scrollOffsets, [key]: offset } },
    ),
}));

export const searchScrollKey = (slug: string, categoryId: string | null) =>
  `search-${slug}-${categoryId}`;
