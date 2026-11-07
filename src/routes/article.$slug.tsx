import { createFileRoute } from "@tanstack/react-router";
import { MockArticle } from "../types/article";
import { MdArticle } from "../components/md-article";

export const Route = createFileRoute("/article/$slug")({
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
  return (
    <div className="article-page" data-bs-theme="dark">
      
      <MdArticle
        markdown={data.markdown}
      />
    </div>
  );
}
