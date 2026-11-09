import { useFavorite } from "@/store/use-favorite";
import { ResultFavorite } from "@/types/random";
import { cn } from "cn";
import { AArrowDown, Bookmark } from "lucide-react";
import { FC, HTMLAttributes } from "react";
import { Button, Placeholder } from "react-bootstrap";

type FavoriteButtonProps = {
  className?: string;
  article?: ResultFavorite;
  slug: string;
  rounded?: boolean;
} & HTMLAttributes<HTMLOrSVGElement>;

export const FavoriteButton: FC<FavoriteButtonProps> = ({
  article,
  rounded,
  slug,
  ...props
}) => {
  const toggleFavorite = useFavorite((state) => state.toggleFavorite);
  const isFavorite = useFavorite((state) => state.isFavorite(slug));
  if (!article) return <FavoriteButtonPlaceholder rounded={rounded} />;
  return (
    <Button
      {...props}
      onClick={() => toggleFavorite(article)}
      className={cn(
        rounded ? "rounded-circle" : "rounded-5",
        "glass p-2",
        props.className,
      )}
    >
      <Bookmark fill={isFavorite ? "currentColor" : "none"} />
    </Button>
  );
};

export const FavoriteButtonPlaceholder = ({
  rounded,
}: {
  rounded?: boolean;
}) => {
  return (
    <Placeholder
      animation="glow"
      as={Button}
      className={cn(
        "glass p-2 d-flex",
        rounded ? "rounded-circle" : "rounded-5",
      )}
    >
      <Placeholder
        className="rounded-circle"
        style={{ width: "24px", height: "24px" }}
      />
    </Placeholder>
  );
};
