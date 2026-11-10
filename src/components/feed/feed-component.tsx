import { useRandom } from "@/hooks/use-random";
import { Background } from "@/components/background";
import { SearchButton } from "@/components/search/search-button";
import { useArticleStore } from "@/store/use-article-store";
import { EmblaCarousel } from "@/components/feed/embla-carusel";
import { useQuery } from "@tanstack/react-query";
import { ResponseSubtopic } from "@/types/subtopic";
import { useEffect } from "react";
import { ErrorRefetch } from "../error-refetch";
import { API_PATH } from "@/lib/api";

export const FeedComponent = ({
  categoryId,
}: {
  categoryId: string | null;
}) => {
  const { data: topicData } = useQuery<ResponseSubtopic>({
    queryKey: ["topic", categoryId],
    queryFn: async () => {
      const response = await fetch(`${API_PATH}api/v1/topics/${categoryId}`);
      return response.json();
    },
    enabled: !!categoryId,
  });
  const { isLoading, refetch, isError } = useRandom({ categoryId });
  const articles = useArticleStore((state) => state.articles);
  const position = useArticleStore((state) => state.position);
  const category = useArticleStore((state) => state.category);
  const setCategory = useArticleStore((state) => state.setCategory);
  const clearArticles = useArticleStore((state) => state.clearArticles);
  const data = articles[position];

  useEffect(() => {
    if (categoryId !== category) {
      setCategory(categoryId);
      clearArticles();
      refetch();
    }
  }, [categoryId, category]);

  const slug = data?.result?.slug ?? "some random";

  return (
    <div className="position-relative overflow-hidden vw-100 vh-100 d-flex justify-content-center align-items-center flex-column">
      {isError && (
        <ErrorRefetch
          className="vh-100"
          refetch={refetch}
          disabled={isLoading}
        />
      )}
      {!isError && (
        <EmblaCarousel
          slides={articles}
          position={position}
          isLoading={isLoading}
          topicPath={topicData?.path}
        />
      )}
      <Background value={slug} />
      <SearchButton
        categoryId={categoryId}
      />
    </div>
  );
};
