import { useFavorite } from "@/store/use-favorite";
import { ResultFavorite } from "@/types/random";
import { cn } from "cn";
import { Bookmark } from "lucide-react";
import { FC, HTMLAttributes } from "react";
import { Button, Placeholder } from "react-bootstrap";

type FavoriteButtonProps = {
  className?: string;
  classBookmark?: string;
  article?: ResultFavorite;
  slug: string;
  rounded?: boolean;
  onClick?: () => void;
} & HTMLAttributes<HTMLOrSVGElement>;

export const FavoriteButton: FC<FavoriteButtonProps> = ({
  article,
  rounded,
  classBookmark,
  slug,
  onClick,
  ...props
}) => {
  const toggleFavorite = useFavorite((state) => state.toggleFavorite);
  const isFavorite = useFavorite((state) => state.isFavorite(slug));
  if (!article) return <RoundedButtonPlaceholder rounded={rounded} />;
  return (
    <Button
      {...props}
      onClick={() => (onClick ? onClick() : toggleFavorite(article))}
      className={cn(
        rounded ? "rounded-circle" : "rounded-5",
        "glass p-2",
        props.className,
      )}
    >
      <Bookmark
        fill={isFavorite ? "currentColor" : "none"}
        className={classBookmark}
      />
    </Button>
  );
};

export const RoundedButtonPlaceholder = ({
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
