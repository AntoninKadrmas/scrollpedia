import { ResponseArticle } from "@/types/article";
import { MdArticle } from "@/components/article/md-article";
import { Placeholder } from "react-bootstrap";
import { useQuery } from "@tanstack/react-query";
import { PREFIX } from "@/lib/prefix";
import { ErrorRefetch } from "@/components/error-refetch";
import { ArticleHeader } from "./article-header";
import { API_PATH } from "@/lib/api";

export const ArticleComponent = ({ slug }: { slug: string }) => {
  const {
    data: article,
    isLoading,
    isError,
    refetch,
  } = useQuery<ResponseArticle>({
    queryKey: ["article", slug],
    queryFn: async () => {
      const response = await fetch(`${API_PATH}api/v1/articles/${slug}`);
      return response.json();
    },
  });
  const fullUrl = window.location.href.split("/");
  const replaceUrl = `${fullUrl.slice(0, -1).join("/")}/${PREFIX["ARTICLE"]}`;
  const markdown = article?.markdown ?? "";

  let result = markdown.replaceAll(`](${API_PATH}`, `](${replaceUrl}`);

  return (
    <>
      <div className="sticky-top mb-2">
        <div className="article-header">
          <ArticleHeader article={article} slug={slug} />
        </div>
      </div>
      {isError && (
        <ErrorRefetch
          className="h-fit mt-5"
          refetch={refetch}
          disabled={isLoading}
        />
      )}
      {!isError && (
        <div className="article-page">
          {isLoading && <SlugPlaceholder />}
          {!isLoading && <MdArticle markdown={result} />}
        </div>
      )}
    </>
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
