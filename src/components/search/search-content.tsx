import { ResponseSearch } from "@/types/search";
import { useInfiniteQuery } from "@tanstack/react-query";
import { FC, HTMLAttributes, useRef } from "react";
import { Background } from "@/components/background";
import { API_PATH } from "@/lib/api";
import { ErrorRefetch } from "@/components/error-refetch";
import { SearchContentTopic } from "./search-content-topic";
import {
  searchScrollKey,
  useSearchFavorite,
} from "@/store/use-search-favorite";
import {
  SearchContentPlaceholder,
  SearchContentVirtualizer,
} from "./search-content-virtualizer";

type SearchContentProps = {
  className?: string;
  slug: string;
  categoryId: string | null;
  onClose: () => void;
} & HTMLAttributes<HTMLOrSVGElement>;

export const SearchContent: FC<SearchContentProps> = ({
  slug,
  categoryId,
  onClose,
  ...props
}) => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    isError,
    refetch,
  } = useInfiniteQuery({
    queryKey: ["search", slug, categoryId],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await fetch(
        `${API_PATH}api/v1/search?q=${encodeURIComponent(slug)}&page=${pageParam}${categoryId ? `&topic=${encodeURIComponent(categoryId)}` : ""}`,
      );
      if (!response.ok) {
        throw new Error(`Search failed (${response.status}).`);
      }
      return response.json();
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage: ResponseSearch) =>
      lastPage.page < lastPage.pages ? lastPage.page + 1 : undefined,
    enabled: !!slug,
  });

  const setScrollOffset = useSearchFavorite((state) => state.setScrollOffset);

  const parentRef = useRef<HTMLDivElement>(null);
  const scrollKey = searchScrollKey(slug, categoryId);

  const isLoading = isFetching && !isFetchingNextPage;
  return (
    <div
      {...props}
      className="overflow-hidden position-relative rounded-bottom-5 search-content"
      onClick={(e) => e.stopPropagation()}
    >
      <div
        ref={parentRef}
        onScroll={(event) => {
          if (slug && data) {
            setScrollOffset(scrollKey, event.currentTarget.scrollTop);
          }
        }}
        className="d-flex flex-column overflow-auto h-100"
        style={{
          scrollbarWidth: "none",
          width: "100%",
          position: "relative",
        }}
      >
        {!isLoading && data?.pages?.[0]?.results?.length === 0 && (
          <h2 className="text-center text-white mt-5">No data found.</h2>
        )}
        {isError && slug && (
          <ErrorRefetch
            refetch={refetch}
            disabled={isFetching}
            className="h-fit mt-5"
          />
        )}
        {!slug && (
          <SearchContentTopic categoryId={categoryId} onClose={onClose} />
        )}
        {slug && data && (
          <SearchContentVirtualizer
            key={scrollKey}
            scrollKey={scrollKey}
            parentRef={parentRef}
            data={data}
            fetchNextPage={fetchNextPage}
            hasNextPage={hasNextPage}
            isFetching={isFetching}
            isFetchingNextPage={isFetchingNextPage}
          />
        )}
        {isFetching &&
          !isFetchingNextPage &&
          Array.from({ length: 4 }).map((_, index) => (
            <SearchContentPlaceholder key={index} />
          ))}
      </div>
      <Background value={slug} />
    </div>
  );
};
