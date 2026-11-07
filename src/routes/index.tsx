import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

const Home = () => {
  const { data } = useQuery({
    queryKey: ["random"],
    queryFn: async () => {
      const response = await fetch("https://www.edgechat.ai/api/v1/random");
      return response.json();
    },
  });
  console.log(data);
  ``;
  return (
    <div className="position-relative overflow-hidden vw-100 vh-100">
      <div
        className="position-absolute top-0 start-0 vw-100 vh-100"
        style={{
          filter: "blur(150px)",
          backgroundImage: "linear-gradient(#6e20ff, #ef7be9)",
          animation: "rotate 30s linear infinite",
          opacity: "0.75",
          borderRadius: "30% 70% 70% 30%/30% 30% 70% 70%",
        }}
      />
    </div>
  );
};


export const Route = createFileRoute("/")({
  component: Home,
});

