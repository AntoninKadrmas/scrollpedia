import { ResponseSearch } from "@/types/search";
import { skipToken, useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { FC, HTMLAttributes, useRef } from "react";
import {
  Button,
  Card,
  CardBody,
  CardText,
  CardTitle,
  Placeholder,
} from "react-bootstrap";
import { Background } from "./background";
import { Link } from "@tanstack/react-router";
import { useVirtualizer } from "@tanstack/react-virtual";
import { ResponseTopic } from "@/types/topic";
import { getPrefix } from "@/lib/prefix";
import { Children, ResponseSubtopic } from "@/types/subtopic";

type SearchContentProps = {
  className?: string;
  slug: string;
  categoryId: string | null;
  onClose: () => void;
} & HTMLAttributes<HTMLOrSVGElement>;

const ARTICLE_HEIGHT = 166;

export const SearchContent: FC<SearchContentProps> = ({
  slug,
  categoryId,
  onClose,
  ...props
}) => {
  const { data: topicData } = useQuery<ResponseTopic>({
    queryKey: ["topic"],
    queryFn: async () => {
      const response = await fetch(`https://www.edgechat.ai/api/v1/topics`);
      return response.json();
    },
    enabled: categoryId == null,
  });

  const { data: subtopicData } = useQuery<ResponseSubtopic>({
    queryKey: ["topic", categoryId],
    queryFn: skipToken,
    enabled: !!categoryId,
  });

  const { data, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["search", slug],
      queryFn: async ({ pageParam = 1 }) => {
        const response = await fetch(
          `https://www.edgechat.ai/api/v1/search?q=${slug}&page=${pageParam}${categoryId ? `&topic=${categoryId}` : ""}`,
        );
        return response.json();
      },
      initialPageParam: 1,
      getNextPageParam: (lastPage: ResponseSearch) =>
        lastPage.page < lastPage.pages ? lastPage.page + 1 : undefined,
      enabled: !!slug,
    });

  const parentRef = useRef<HTMLDivElement>(null);

  const allRows = data ? data.pages.flatMap((d) => d.results) : [];

  const rowVirtualizer = useVirtualizer({
    count: hasNextPage ? allRows.length + 1 : allRows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: (index) => (index === allRows.length ? 74 : ARTICLE_HEIGHT),
    paddingEnd: 90,
    overscan: 5,
  });

  const isLoading = isFetching && !isFetchingNextPage;
  return (
    <div
      {...props}
      className="overflow-hidden position-relative rounded-bottom-5 search-content"
      onClick={(e) => e.stopPropagation()}
    >
      <div
        ref={parentRef}
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
        {!isLoading && !data && (
          <div
            className="overflow-auto px-2"
            style={{ paddingBottom: "100px" }}
          >
            <h2 className="text-center text-white mt-5">
              {categoryId
                ? `Choose a subtopic of (${subtopicData?.label}):`
                : "Choose a topic:"}
            </h2>
            <div className="d-flex flex-column justify-content-center align-items-center gap-3 mt-3">
              {(categoryId ? subtopicData?.children : topicData?.topics)?.map(
                (topic) => (
                  <Link
                    to="/$slug"
                    params={{ slug: getPrefix(topic.id, "TOPIC") }}
                    onClick={() => onClose()}
                    key={topic.id}
                  >
                    <Button className="glass">{topic.label}</Button>
                  </Link>
                ),
              )}
              {(categoryId ? subtopicData?.children : topicData?.topics)
                ?.length === 0 && (
                <p className="text-muted">No topics available.</p>
              )}
            </div>
          </div>
        )}
        {!isLoading && slug && (
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
                        <Link
                          to="/$slug"
                          params={{ slug: getPrefix(article.slug, "ARTICLE") }}
                        >
                          <Button className="w-100 glass">Read more...</Button>
                        </Link>
                      </CardBody>
                    </Card>
                  )}
                </div>
              );
            })}
          </div>
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

const SearchContentPlaceholder: FC<HTMLAttributes<HTMLOrSVGElement>> = ({
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
        <Placeholder as={Button} animation="glow" className="w-100 glass">
          <Placeholder xs={6} />
        </Placeholder>
      </CardBody>
    </Card>
  );
};
