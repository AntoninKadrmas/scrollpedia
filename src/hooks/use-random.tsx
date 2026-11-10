import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useArticleStore } from "../store/use-article-store";
import type { ResponseRandom } from "../types/random";
import { API_PATH } from "@/main";

const FETCH_AMOUNT = 5;
const REFETCH_BEFORE = 2;
const TRIES = 3;

async function fetchRandomBatch({
  signal,
  categoryId,
}: {
  signal: AbortSignal;
  categoryId: string | null;
}) {
  let added = 0;

  // Each round requests only the number of articles still missing.
  for (let attempt = 0; attempt < TRIES && added < FETCH_AMOUNT; attempt++) {
    const batch = await Promise.all(
      Array.from({ length: FETCH_AMOUNT - added }, async () => {
        const response = await fetch(
          `${API_PATH}api/v1/random${categoryId ? `?topic=${categoryId}` : ""}`,
          {
            signal,
          },
        );
        if (!response.ok) {
          throw new Error(
            `Error while loading the article (${response.status}).`,
          );
        }
        const article = (await response.json()) as ResponseRandom;
        if (!article?.result?.slug) {
          throw new Error(
            "There is no slug in the article returned by the API.",
          );
        }
        return article;
      }),
    );
    for (const article of batch) {
      const state = useArticleStore.getState();
      if (!state.articlesMap.has(article.result.slug)) {
        state.addArticle(article);
        added++;
      }
    }
  }

  if (added === 0) {
    throw new Error("Could not find any new unique articles.");
  }
  return added;
}

export const useRandom = ({ categoryId }: { categoryId: string | null }) => {
  const position = useArticleStore((state) => state.position);
  const count = useArticleStore((state) => state.articles.length);
  const { isFetching, isError, error, refetch } = useQuery({
    queryKey: ["random", categoryId],
    queryFn: ({ signal }) => fetchRandomBatch({ signal, categoryId }),
    enabled: false,
    retry: false,
  });

  useEffect(() => {
    if (position + REFETCH_BEFORE >= count && !isFetching && !isError) {
      void refetch();
    }
  }, [position, count, isFetching, isError, refetch]);

  return {
    isLoading: isFetching || (count === 0 && !isError),
    isError,
    errors: error ? [error] : [],
    refetch,
  };
};
