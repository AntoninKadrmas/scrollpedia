import { createFileRoute } from "@tanstack/react-router";
import { ResponseArticle } from "../types/article";
import { useQuery } from "@tanstack/react-query";
import { getCleanedPRefix, getPRefixTYpe } from "@/lib/prefix";
import { ArticleComponent } from "@/components/article/article-component";
import { FeedComponent } from "@/components/feed/feed-component";
export const Route = createFileRoute("/$slug")({
  component: RouteComponent,
});

function RouteComponent() {
  const { slug } = Route.useParams();

  const cleanSlug = getCleanedPRefix(slug);
  const prefixType = getPRefixTYpe(slug);

  return (
    <>
      {prefixType === "TOPIC" && <FeedComponent categoryId={cleanSlug} />}
      {prefixType === "ARTICLE" && (
        <ArticleComponent
          slug={cleanSlug}
        />
      )}
    </>
  );
}
