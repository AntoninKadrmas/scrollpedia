import { createFileRoute, useRouter } from "@tanstack/react-router";
import { ResponseArticle } from "../types/article";
import { MdArticle } from "../components/md-article";
import { ArrowLeft } from "lucide-react";
import { Button, Placeholder } from "react-bootstrap";
import { Background } from "../components/background";
import { DateTime } from "luxon";
import { useQuery } from "@tanstack/react-query";
export const Route = createFileRoute("/$slug")({
  component: RouteComponent,
});

function RouteComponent() {
  const router = useRouter();

  const { slug } = Route.useParams();
  const { data, isLoading } = useQuery<ResponseArticle>({
    queryKey: ["article", slug],
    queryFn: async () => {
      const response = await fetch(
        `https://www.edgechat.ai/api/v1/articles/${slug}`,
      );
      return response.json();
    },
  });
  // const data = MockArticle;
  // const isLoading = false;
  const fullUrl = window.location.href.split("/");
  const replaceUrl = fullUrl.slice(0, -1).join("/");

  const originalUrl = "https://www.edgechat.ai";
  const markdown = data?.markdown ?? "";

  const lastIndex = markdown.lastIndexOf(originalUrl);

  const result =
    lastIndex === -1
      ? markdown
      : markdown.slice(0, lastIndex).replaceAll(originalUrl, replaceUrl) +
        markdown.slice(lastIndex);

  return (
    <>
      <div className="sticky-top mb-2">
        <div className="article-header">
          <div className="position-relative overflow-hidden rounded-5">
            <div className="glass d-flex justify-content-between align-items-center">
              <div
                className="d-flex w-100 align-items-center gap-2"
                style={{ minWidth: 0 }}
              >
                <Button
                  className="glass rounded-circle p-2 flex-shrink-0"
                  style={{ width: "fit-content" }}
                  onClick={(e) => {
                    e.preventDefault();
                    router.history.back();
                  }}
                >
                  <ArrowLeft />
                </Button>
                {data ? (
                  <div
                    className="d-flex flex-column lh-1 text-white flex-grow-1"
                    style={{ minWidth: 0 }}
                  >
                    <span className="line-clamp">{data?.title}</span>
                    <small>
                      {DateTime.fromSQL(data?.updated).toLocaleString(
                        DateTime.DATETIME_MED_WITH_WEEKDAY,
                      )}
                    </small>
                  </div>
                ) : (
                  <SlugHeaderPlaceholder />
                )}
              </div>
            </div>
            <Background value={slug} />
          </div>
        </div>
      </div>
      <div className="article-page">
        {isLoading && <SlugPlaceholder />}
        {!isLoading && <MdArticle markdown={result} />}
      </div>
    </>
  );
}

const SlugHeaderPlaceholder = () => {
  return (
    <div
      className="d-flex flex-column lh-1"
      style={{ width: "clamp(8rem, 40vw, 20rem)" }}
    >
      <Placeholder
        as="span"
        className="d-block"
        style={{ marginBottom: "0.15rem" }}
        animation="glow"
      >
        <Placeholder xs={6} />
      </Placeholder>
      <Placeholder as="small" className="d-block" animation="glow">
        <Placeholder xs={4} />
      </Placeholder>
    </div>
  );
};

const SlugPlaceholder = () => {
  return (
    <div className="markdown-content mx-auto">
      <Placeholder as="h1" animation="glow">
        <Placeholder xs={6} />
      </Placeholder>
      <Placeholder as="p" animation="glow">
        <Placeholder xs={12} />
        <Placeholder xs={11} />
        <Placeholder xs={10} />
        <Placeholder xs={11} />
        <Placeholder xs={12} />
        <Placeholder xs={11} />
      </Placeholder>
      <Placeholder as="small" animation="glow">
        <Placeholder xs={8} />
        <Placeholder xs={10} />
      </Placeholder>
    </div>
  );
};
