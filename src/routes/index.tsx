import { createFileRoute } from "@tanstack/react-router";
import { useRandom } from "../hooks/use-random";
import { useArticleStore } from "../store/use-article-store";
import { EmblaCarousel } from "../components/carusel";
import { Background } from "../components/background";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  // const { data } = useQuery<ResponseRandom>({
  //   queryKey: ["random"],
  //   queryFn: async () => {
  //     const response = await fetch("https://www.edgechat.ai/api/v1/random");
  //     return response.json();
  //   },
  // });
  const { isLoading } = useRandom();
  const articles = useArticleStore((state) => state.articles);
  const position = useArticleStore((state) => state.position);
  const data = articles[position];
  return (
    <div className="position-relative overflow-hidden vw-100 vh-100 d-flex justify-content-center align-items-center flex-column">
      <EmblaCarousel
        slides={articles}
        position={position}
        isLoading={isLoading}
      />
      <Background value={data?.result?.slug} />
    </div>
  );
}
