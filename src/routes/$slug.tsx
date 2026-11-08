import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { MockArticle, ResponseArticle } from "../types/article";
import { MdArticle } from "../components/md-article";
import { ArrowLeft } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { ResponseRandom } from "../types/random";
import { Button } from "react-bootstrap";

export const Route = createFileRoute("/$slug")({
  component: RouteComponent,
});

function RouteComponent() {
  const router = useRouter();

  // const { slug } = Route.useParams();
  // const { data } = useQuery<ResponseArticle>({
  //   queryKey: ["article", slug],
  //   queryFn: async () => {
  //     const response = await fetch(
  //       `https://www.edgechat.ai/api/v1/articles/${slug}`,
  //     );
  //     return response.json();
  //   },
  // });
  const data = MockArticle;
  const fullUrl = window.location.href.split("/");
  const replaceUrl = fullUrl.slice(0, -1).join("/");
  return (
    <div className="article-page" data-bs-theme="dark">
      <div className="article-header sticky-top mb-2">
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
      <MdArticle
        markdown={
          data?.markdown?.replaceAll("https://www.edgechat.ai", replaceUrl) ??
          ""
        }
      />
    </div>
  );
}
