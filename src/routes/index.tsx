import { createFileRoute, Link } from "@tanstack/react-router";
import { Card, CardBody, CardLink, CardText, CardTitle } from "react-bootstrap";
import { MockRandom } from "../types/random";

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
  const data = MockRandom;
  console.log(data);
  return (
    <div className="position-relative overflow-hidden vw-100 vh-100 d-flex justify-content-center align-items-center">
      <Link
        to="/$slug"
        params={{ slug: data.result.slug }}
        className="text-decoration-none"
      >
        <Card className="glass">
          <CardBody>
            <CardTitle>{data?.result?.title}</CardTitle>
            <CardText>{data?.result?.excerpt}</CardText>
            <div className="d-flex justify-content-end text-muted">
              <CardText>Read more...</CardText>
            </div>
          </CardBody>
        </Card>
      </Link>
      {/* <div
        className="position-absolute top-0 start-0 vw-100 vh-100 z-n1"
        style={{
          filter: "blur(150px)",
          backgroundImage: "linear-gradient(#6e20ff, #ef7be9)",
          animation: "rotate 30s linear infinite",
          opacity: "0.75",
          borderRadius: "30% 70% 70% 30%/30% 30% 70% 70%",
        }}
      /> */}
    </div>
  );
}
