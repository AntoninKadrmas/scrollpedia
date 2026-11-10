import { useRouter } from "@tanstack/react-router";
import { ResponseArticle } from "@/types/article";
import { ArrowLeft } from "lucide-react";
import { Button, Placeholder } from "react-bootstrap";
import { Background } from "@/components/background";
import { FavoriteButton } from "@/components/favorite/favorite-button";
import { ResultFavorite } from "@/types/random";
import { FC } from "react";

type ArticleHeaderType = {
  article?: ResponseArticle;
  slug: string;
};

export const ArticleHeader: FC<ArticleHeaderType> = ({ article, slug }) => {
  const router = useRouter();

  return (
    <div className="position-relative overflow-hidden rounded-5">
      <div className="glass d-flex justify-content-between align-items-center">
        <div
          className="d-flex w-100 align-items-center justify-content-between gap-2"
          style={{ minWidth: 0 }}
        >
          <div className="d-flex gap-2 flex-row align-items-center">
            <Button
              className="glass rounded-circle p-2 flex-shrink-0"
              style={{ width: "fit-content" }}
              onClick={(e) => {
                e.preventDefault();
                router.history.back();
              }}
            >
              <ArrowLeft />
            </Button>
            {article ? (
              <div
                className="d-flex flex-column lh-1 text-white flex-grow-1"
                style={{ minWidth: 0 }}
              >
                <span className="line-clamp">{article?.title}</span>
              </div>
            ) : (
              <SlugHeaderPlaceholder />
            )}
          </div>
          <FavoriteButton
            article={{
              ...(article as ResultFavorite),
            }}
            slug={slug}
            rounded
          />
        </div>
      </div>
      <Background value={slug} />
    </div>
  );
};

const SlugHeaderPlaceholder = () => {
  return (
    <div
      className="d-flex flex-column lh-1"
      style={{ width: "clamp(8rem, 40vw, 20rem)" }}
    >
      <Placeholder
        as="span"
        className="d-block"
        style={{ marginBottom: "0.15rem" }}
        animation="glow"
      >
        <Placeholder xs={6} />
      </Placeholder>
    </div>
  );
};
