import { skipToken, useQuery } from "@tanstack/react-query";
import { FC } from "react";
import { Button, Placeholder } from "react-bootstrap";
import { Link } from "@tanstack/react-router";
import { ResponseTopic } from "@/types/topic";
import { getPrefix } from "@/lib/prefix";
import { ResponseSubtopic } from "@/types/subtopic";
import { ErrorRefetch } from "@/components/error-refetch";
import { API_PATH } from "@/lib/api";

type SearchContentTopicType = {
  categoryId: string | null;
  onClose: () => void;
};

export const SearchContentTopic: FC<SearchContentTopicType> = ({
  categoryId,
  onClose,
}) => {
  const {
    data: topicData,
    isLoading: isLoadingTopic,
    isError,
    refetch,
  } = useQuery<ResponseTopic>({
    queryKey: ["topic"],
    queryFn: async () => {
      const response = await fetch(`${API_PATH}api/v1/topics`);
      return response.json();
    },
    enabled: !categoryId,
  });
  const { data: subtopicData } = useQuery<ResponseSubtopic>({
    queryKey: ["topic", categoryId],
    queryFn: skipToken,
    enabled: !!categoryId,
  });
  return (
    <>
      {isError && (
        <ErrorRefetch
          className="h-fit mt-5"
          refetch={refetch}
          disabled={isLoadingTopic}
        />
      )}
      {!isError && (
        <div className="overflow-auto px-2" style={{ paddingBottom: "100px" }}>
          <h2 className="text-center text-white mt-5">
            {categoryId
              ? `Choose a subtopic of (${subtopicData?.label}):`
              : "Choose a topic:"}
          </h2>
          {isLoadingTopic ? (
            <SearchContentTopicPlaceholder />
          ) : (
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
          )}
        </div>
      )}
    </>
  );
};

const SearchContentTopicPlaceholder: FC = () => {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center gap-3 mt-3">
      <Placeholder as={Button} animation="glow" className="glass">
        <Placeholder style={{ width: "10rem" }} />
      </Placeholder>
      <Placeholder as={Button} animation="glow" className="glass">
        <Placeholder style={{ width: "8rem" }} />
      </Placeholder>
      <Placeholder as={Button} animation="glow" className="glass">
        <Placeholder style={{ width: "9rem" }} />
      </Placeholder>
      <Placeholder as={Button} animation="glow" className="glass">
        <Placeholder style={{ width: "6rem" }} />
      </Placeholder>
    </div>
  );
};
