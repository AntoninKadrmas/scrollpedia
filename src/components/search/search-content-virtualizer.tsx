import { ResponseSearch } from "@/types/search";
import {
  FetchNextPageOptions,
  InfiniteData,
  InfiniteQueryObserverResult,
} from "@tanstack/react-query";
import { FC, HTMLAttributes, RefObject } from "react";
import {
  Button,
  Card,
  CardBody,
  CardText,
  CardTitle,
  Placeholder,
} from "react-bootstrap";
import { Link } from "@tanstack/react-router";
import { useVirtualizer } from "@tanstack/react-virtual";
import { getPrefix } from "@/lib/prefix";
import { FavoriteButton } from "@/components/favorite/favorite-button";
import { useSearchFavorite } from "@/store/use-search-favorite";

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
                <SearchContentPlaceholder />
              ) : (
                <SearchContentMore
                  onClick={() => fetchNextPage()}
                  disabled={!hasNextPage || isFetching}
                />
              )
            ) : (
              <Card className="glass h-fit rounded-0">
                <CardBody>
                  <CardTitle className="text-white line-clamp">
                    {article.title}
                  </CardTitle>
                  <CardText className="line-clamp-2">
                    {article.snippet}
                  </CardText>
                  <div className="d-flex align-items-stretch gap-2">
                    <Link
                      to="/$slug"
                      style={{ flex: 1 }}
                      params={{
                        slug: getPrefix(article.slug, "ARTICLE"),
                      }}
                    >
                      <Button className="w-100 glass">Read more...</Button>
                    </Link>
                    <FavoriteButton
                      article={article}
                      style={{
                        height: 38,
                        width: 38,
                      }}
                      className="glass d-flex align-items-center justify-content-center"
                      slug={article?.slug}
                    />
                  </div>
                </CardBody>
              </Card>
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

export const SearchContentPlaceholder: FC<HTMLAttributes<HTMLOrSVGElement>> = ({
  ...props
}) => {
  return (
    <Card {...props} className="glass h-fit rounded-0">
      <CardBody>
        <Placeholder as={CardTitle} animation="glow">
          <Placeholder xs={6} />
        </Placeholder>
        <Placeholder as={CardText} animation="glow">
          <Placeholder xs={12} />
          <Placeholder xs={8} />
        </Placeholder>
        <div className="d-flex gap-2">
          <Placeholder as={Button} animation="glow" className="w-100 glass">
            <Placeholder xs={6} />
          </Placeholder>
          <Placeholder
            as={Button}
            style={{ width: 38 }}
            animation="glow"
            className="w-fit glass d-flex align-items-center justify-content-center"
          >
            <Placeholder xs={12} />
          </Placeholder>
        </div>
      </CardBody>
    </Card>
  );
};
