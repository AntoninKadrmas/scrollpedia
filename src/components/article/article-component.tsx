import { useRouter } from "@tanstack/react-router";
import { ResponseArticle } from "@/types/article";
import { MdArticle } from "@/components/md-article";
import { ArrowLeft } from "lucide-react";
import { Button, Placeholder } from "react-bootstrap";
import { Background } from "@/components/background";
import { useQuery } from "@tanstack/react-query";
import { PREFIX } from "@/lib/prefix";

export const ArticleComponent = ({ slug }: { slug: string }) => {
  const { data: article, isLoading } = useQuery<ResponseArticle>({
    queryKey: ["article", slug],
    queryFn: async () => {
      const response = await fetch(
        `https://www.edgechat.ai/api/v1/articles/${slug}`,
      );
      return response.json();
    },
  });
  const router = useRouter();
  const fullUrl = window.location.href.split("/");
  const replaceUrl = `${fullUrl.slice(0, -1).join("/")}/${PREFIX["ARTICLE"]}`;

  const originalUrl = "https://www.edgechat.ai/";
  const markdown = article?.markdown ?? "";

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
                {article ? (
                  <div
                    className="d-flex flex-column lh-1 text-white flex-grow-1"
                    style={{ minWidth: 0 }}
                  >
                    <span className="line-clamp">{article?.title}</span>
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
};

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
      {/* <Placeholder as="small" className="d-block" animation="glow">
        <Placeholder xs={4} />
      </Placeholder> */}
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
