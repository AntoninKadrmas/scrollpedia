import { createFileRoute, Link } from "@tanstack/react-router";
import { MockArticle } from "../types/article";
import { MdArticle } from "../components/md-article";
import { ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/$slug")({
  component: RouteComponent,
});

function RouteComponent() {
  // const { slug } = Route.useParams();
  // const { data } = useQuery<ResponseRandom>({
  //   queryKey: ["article", slug],
  //   queryFn: async () => {
  //     const response = await fetch(`https://www.edgechat.ai/api/v1/articles/${slug}`);
  //     return response.json();
  //   },
  // });
  const data = MockArticle;
  const fullUrl = window.location.href.split("/");
  const replaceUrl = fullUrl.slice(0, -1).join("/");
  return (
    <div className="article-page" data-bs-theme="dark">
      <div className="article-header sticky-top mb-2">
        <Link to={".."} className="text-white">
          <div
            className="glass rounded-circle p-2"
            style={{ width: "fit-content" }}
          >
            <ArrowLeft />
          </div>
        </Link>
      </div>
      <MdArticle
        markdown={data.markdown.replaceAll(
          "https://www.edgechat.ai",
          replaceUrl,
        )}
      />
    </div>
  );
}
