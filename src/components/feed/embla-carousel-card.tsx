import { FC } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Card,
  CardBody,
  CardHeader,
  CardSubtitle,
  CardText,
  CardTitle,
  Placeholder,
} from "react-bootstrap";
import { AsciiAvatar } from "@/components/ascii/ascii-avatar";
import { Link } from "@tanstack/react-router";
import { getPrefix } from "@/lib/prefix";
import { FavoriteButton } from "@/components/favorite/favorite-button";
import { ResponseRandom, ResultFavorite } from "@/types/random";
import { Path } from "@/types/article";

type EmblacarouselCard = {
  data: ResponseRandom;
  index: number;
  topicPath: Path[];
};

export const EmblacarouselCard: FC<EmblacarouselCard> = ({
  data,
  index,
  topicPath,
}) => {
  return (
    <div className="embla__slide" key={data.result.id}>
      <Card className="glass h-100 rounded-0">
        {topicPath && topicPath.length > 0 && (
          <CardHeader>
            <Breadcrumb className="d-flex flex-wrap align-items-center w-100 breadcrumb">
              <BreadcrumbItem
                key="home"
                linkAs={Link}
                linkProps={{ to: "/" }}
                className="text-muted me-2"
              >
                Home
              </BreadcrumbItem>
              {topicPath.map((path, index) => (
                <BreadcrumbItem
                  key={path.id}
                  linkAs={Link}
                  linkProps={{ to: `/${getPrefix(path.id, "TOPIC")}` }}
                  className={"text-muted me-2 lh-1"}
                  active={index === topicPath.length - 1}
                >
                  {path.label}
                </BreadcrumbItem>
              ))}
            </Breadcrumb>
          </CardHeader>
        )}
        <CardBody className="d-flex flex-column">
          <CardTitle>
            <small style={{ fontSize: 15 }} className="text-muted">
              {index}.{" "}
            </small>
            {data?.result?.title}
          </CardTitle>
          <AsciiAvatar
            name={data?.result?.slug}
            colored={false}
            width="auto"
            height={10}
            className="w-50 align-self-center mb-3 mt-2 text-center"
          />
          <CardSubtitle>{data?.result?.topic}</CardSubtitle>
          <br />
          <CardText>{data?.result?.snippet}</CardText>
          <br />
          <div className="d-flex gap-2">
            <Link
              to="/$slug"
              style={{ flex: 1 }}
              params={{ slug: getPrefix(data?.result?.slug, "ARTICLE") }}
              className="text-decoration-none"
            >
              <Button variant="secondary" className="w-100 mt-auto glass py-4">
                Read more...
              </Button>
            </Link>
            <FavoriteButton
              article={{
                ...(data?.result as ResultFavorite),
              }}
              style={{ aspectRatio: "1 / 1" }}
              className="h-100 mt-auto glass py-4 d-flex align-items-center justify-content-center"
              slug={data?.result?.slug}
            />
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export const EmblacarouselCardPlaceholder = () => {
  return (
    <div className="embla__slide w-100">
      <Card className="glass h-100 rounded-0 w-100">
        <CardBody>
          <Placeholder as={CardTitle} animation="glow">
            <Placeholder xs={8} />
          </Placeholder>
          <Placeholder as={"div"} animation="glow" className="text-center">
            <Placeholder xs={6} className="mb-3 mt-2 h-40 align-self-center" />
          </Placeholder>
          <Placeholder as={CardSubtitle} animation="glow">
            <Placeholder xs={4} />
          </Placeholder>
          <br />
          <Placeholder as={CardText} animation="glow">
            <Placeholder xs={12} />
            <Placeholder xs={8} />
            <Placeholder xs={10} />
            <Placeholder xs={6} />
          </Placeholder>
          <br />
          <Placeholder
            as={Button}
            className="w-100 bg-secondary border-secondary py-4"
            animation="glow"
          >
            <Placeholder xs={3} />
          </Placeholder>
        </CardBody>
      </Card>
    </div>
  );
};
