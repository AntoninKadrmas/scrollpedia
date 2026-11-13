import { ResponseSearch } from "@/types/search";
import {
  FetchNextPageOptions,
  InfiniteData,
  InfiniteQueryObserverResult,
} from "@tanstack/react-query";
import { FC, HTMLAttributes, RefObject } from "react";
import { Button } from "react-bootstrap";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useSearchFavorite } from "@/store/use-search-favorite";
import { ContentCard, ContentCardPlaceholder } from "./content-card";

type SearchContentVirtualizerType = {
  scrollKey: string;
  data: InfiniteData<ResponseSearch, unknown> | undefined;
  fetchNextPage: (
    options?: FetchNextPageOptions,
  ) => Promise<
    InfiniteQueryObserverResult<InfiniteData<ResponseSearch, unknown>, Error>
  >;
  hasNextPage: boolean;
  isFetching: boolean;
  isFetchingNextPage: boolean;
  parentRef: RefObject<HTMLDivElement | null>;
};

const ARTICLE_HEIGHT = 166;

export const SearchContentVirtualizer: FC<SearchContentVirtualizerType> = ({
  scrollKey,
  data,
  fetchNextPage,
  hasNextPage,
  isFetching,
  isFetchingNextPage,
  parentRef,
}) => {
  const scrollOffsets = useSearchFavorite((state) => state.scrollOffsets);
  const allRows = data ? data.pages.flatMap((d) => d.results) : [];

  const rowVirtualizer = useVirtualizer({
    initialOffset: () => scrollOffsets[scrollKey] ?? 0,
    count: hasNextPage ? allRows.length + 1 : allRows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: (index) => (index === allRows.length ? 74 : ARTICLE_HEIGHT),
    overscan: 5,
  });
  return (
    <div
      style={{
        height: `${rowVirtualizer.getTotalSize()}px`,
        width: "100%",
        position: "relative",
        flexShrink: 0,
      }}
    >
      {rowVirtualizer.getVirtualItems().map((virtualRow) => {
        const isLoaderRow = virtualRow.index > allRows.length - 1;
        const article = allRows[virtualRow.index];
        return (
          <div
            key={virtualRow.key}
            data-index={virtualRow.index}
            ref={rowVirtualizer.measureElement}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              transform: `translateY(${virtualRow.start}px)`,
            }}
          >
            {isLoaderRow ? (
              isFetchingNextPage ? (
                <ContentCardPlaceholder />
              ) : (
                <SearchContentMore
                  onClick={() => fetchNextPage()}
                  disabled={!hasNextPage || isFetching}
                />
              )
            ) : (
              <ContentCard article={article} />
            )}
          </div>
        );
      })}
    </div>
  );
};

const SearchContentMore: FC<
  HTMLAttributes<HTMLButtonElement> & { onClick: () => void; disabled: boolean }
> = ({ onClick, ...props }) => {
  return (
    <Button
      {...props}
      onClick={onClick}
      className="glass rounded-0 py-4 w-100 h-fit"
    >
      Load More ...
    </Button>
  );
};
