import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { MockArticle, ResponseArticle } from "../types/article";
import { MdArticle } from "../components/md-article";
import { ArrowLeft } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { ResponseRandom } from "../types/random";
import { Button, Placeholder } from "react-bootstrap";
import { Background } from "../components/background";

export const Route = createFileRoute("/$slug")({
  component: RouteComponent,
});

function RouteComponent() {
  const router = useRouter();

  // const { slug } = Route.useParams();
  // const { data, isLoading } = useQuery<ResponseArticle>({
  //   queryKey: ["article", slug],
  //   queryFn: async () => {
  //     const response = await fetch(
  //       `https://www.edgechat.ai/api/v1/articles/${slug}`,
  //     );
  //     return response.json();
  //   },
  // });
  const data = MockArticle;
  const isLoading = false;
  const fullUrl = window.location.href.split("/");
  const replaceUrl = fullUrl.slice(0, -1).join("/");
  return (
    <>
      <div className="sticky-top mb-2">
        <div className="article-header overflow-hidden position-relative">
          <div className="d-flex justify-content-between align-items-center">
            <Button
              className="glass rounded-circle p-2"
              style={{ width: "fit-content" }}
              onClick={(e) => {
                e.preventDefault();
                router.history.back();
              }}
            >
              <ArrowLeft />
            </Button>
          </div>
          <Background value={data.slug} />
        </div>
      </div>
      <div className="article-page">
        {isLoading && <SlugPlaceholder />}
        {!isLoading && (
          <MdArticle
            markdown={
              data?.markdown?.replaceAll(
                "https://www.edgechat.ai",
                replaceUrl,
              ) ?? ""
            }
          />
        )}
      </div>
    </>
  );
}

const SlugPlaceholder = () => {
  return (
    <div>
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
