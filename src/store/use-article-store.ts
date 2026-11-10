import { create } from "zustand";
import type { ResponseRandom } from "../types/random";

type ArticleStore = {
  articles: ResponseRandom[];
  articlesMap: Map<string, ResponseRandom>;
  addArticle: (article: ResponseRandom) => void;
  setPosition: (position: number) => void;
  setCategory: (category: string | null) => void;
  clearArticles: () => void;
  position: number;
  category: string | null;
};

function clampPosition(position: number, count: number) {
  return Math.max(0, Math.min(Math.trunc(position), count - 1));
}

export const useArticleStore = create<ArticleStore>((set) => ({
  articles: [],
  articlesMap: new Map(),
  position: 0,
  category: null,
  addArticle: (article) =>
    set((state) => {
      if (state.articlesMap.has(article.result.slug)) {
        return state;
      }
      return {
        articles: [...state.articles, article],
        articlesMap: new Map(state.articlesMap).set(
          article.result.slug,
          article,
        ),
      };
    }),
  setPosition: (position) =>
    set((state) => ({
      position: Number.isFinite(position)
        ? clampPosition(position, state.articles.length)
        : state.position,
    })),
  setCategory: (category) =>
    set(() => ({
      category,
    })),
  clearArticles: () =>
    set(() => ({
      articles: [],
      position: 0,
    })),
}));
