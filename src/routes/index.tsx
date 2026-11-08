import { createFileRoute } from "@tanstack/react-router";
import { FeedComponent } from "@/components/feed/feed-component";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return <FeedComponent categoryId={null} />;
}
