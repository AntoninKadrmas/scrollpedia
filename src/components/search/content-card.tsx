import { getPrefix } from "@/lib/prefix";
import { Link } from "@tanstack/react-router";
import { FC, HTMLAttributes } from "react";
import {
  Button,
  Card,
  CardBody,
  CardText,
  CardTitle,
  Placeholder,
} from "react-bootstrap";
import { FavoriteButton } from "../favorite/favorite-button";
import { ResultSearch } from "@/types/search";
import { ResultFavorite } from "@/types/random";

type ContentCardProps = {
  className?: string;
  article: ResultSearch | ResultFavorite;
  handleShow?: (article: ResultSearch | ResultFavorite) => void;
} & HTMLAttributes<HTMLOrSVGElement>;

export const ContentCard: FC<ContentCardProps> = ({ article, handleShow }) => {
  return (
    <Card className="glass h-fit rounded-0">
      <CardBody>
        <CardTitle className="text-white line-clamp">{article.title}</CardTitle>
        <CardText className="line-clamp-2">{article.snippet}</CardText>
        <div className="d-flex align-items-stretch gap-2">
          <Link
            to="/$slug"
            style={{ flex: 1 }}
            params={{ slug: getPrefix(article.slug, "ARTICLE") }}
          >
            <Button className="w-100 glass">Read more...</Button>
          </Link>
          <FavoriteButton
            article={article}
            style={{
              height: 38,
              width: 38,
            }}
            className="glass d-flex align-items-center justify-content-center"
            slug={article?.slug}
            onClick={handleShow ? () => handleShow(article) : undefined}
          />
        </div>
      </CardBody>
    </Card>
  );
};

export const ContentCardPlaceholder: FC<HTMLAttributes<HTMLOrSVGElement>> = ({
  ...props
}) => {
  return (
    <Card {...props} className="glass h-fit rounded-0">
      <CardBody>
        <Placeholder as={CardTitle} animation="glow">
          <Placeholder xs={6} />
        </Placeholder>
        <Placeholder as={CardText} animation="glow">
          <Placeholder xs={12} />
          <Placeholder xs={8} />
        </Placeholder>
        <div className="d-flex gap-2">
          <Placeholder as={Button} animation="glow" className="w-100 glass">
            <Placeholder xs={6} />
          </Placeholder>
          <Placeholder
            as={Button}
            style={{ width: 38 }}
            animation="glow"
            className="w-fit glass d-flex align-items-center justify-content-center"
          >
            <Placeholder xs={12} />
          </Placeholder>
        </div>
      </CardBody>
    </Card>
  );
};
