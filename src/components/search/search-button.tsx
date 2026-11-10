import { cn } from "cn";
import { BookMarked, Search, X } from "lucide-react";
import { FC, FormEvent, HTMLAttributes, useState } from "react";
import { Button } from "react-bootstrap";
import "./search-button.css";
import { SearchContent } from "./search-content";
import { FavoriteContent } from "@/components/favorite/favorite-content";

type SearchButtonProps = {
  className?: string;
  categoryId: string | null;
} & HTMLAttributes<HTMLOrSVGElement>;

export const SearchButton: FC<SearchButtonProps> = ({
  categoryId,
  ...props
}) => {
  const [startSearch, setStartSearch] = useState(false);
  const [startFavorite, setStartFavorite] = useState(false);
  const [searchSlug, setSearchSlug] = useState("");
  const onSubmit = (e: FormEvent<HTMLFormElement>, newData: string) => {
    e.preventDefault();
    setSearchSlug(newData);
  };
  return (
    <>
      {(startSearch || startFavorite) && (
        <div
          className="vh-100 vw-100 z-1 bg-black opacity-75 position-absolute"
          onClick={() => {
            setStartSearch(false);
            setStartFavorite(false);
          }}
        ></div>
      )}
      {startSearch && (
        <div className="max-width-50 vh-100 vw-100 z-2 position-absolute">
          <SearchContent
            slug={searchSlug}
            categoryId={categoryId}
            onClose={() => setStartSearch(false)}
          />
        </div>
      )}
      {startFavorite && (
        <div className="max-width-50 vh-100 top-0 vw-100 z-2 position-absolute">
          <FavoriteContent />
        </div>
      )}
      {(startSearch || startFavorite) && (
        <Button
          className="w-10 h-10 glass rounded-circle position-absolute top-0 end-0 m-3 d-flex align-items-center justify-content-center z-2 d-lg-none d-block"
          onClick={() => {
            setStartSearch(false);
            setStartFavorite(false);
          }}
        >
          <X />
        </Button>
      )}
      {!startFavorite && (
        <div className="max-width-50 w-100 justify-content-center position-absolute bottom-0 mb-md-5 mb-4 z-2 d-flex align-items-end gap-1">
          {!startSearch && <div style={{ width: "42px" }} />}
          <Button
            {...props}
            className={cn(
              "glass d-flex justify-content-center align-items-center p-4",
              startSearch ? "rounded-5 w-100 rounded-top-0" : "rounded-circle",
            )}
            onClick={() => setStartSearch(true)}
          >
            <Search />
            {startSearch && (
              <SearchButtonInput onSubmit={onSubmit} searchSlug={searchSlug} />
            )}
          </Button>
          {!startSearch && (
            <Button
              {...props}
              className={cn(
                "glass d-flex justify-content-center align-items-center p-2 rounded-circle",
              )}
              onClick={() => setStartFavorite(true)}
            >
              <BookMarked />
            </Button>
          )}
        </div>
      )}
    </>
  );
};

type SearchButtonInputProps = {
  onSubmit: (e: React.FormEvent<HTMLFormElement>, newData: string) => void;
  searchSlug: string;
};

const SearchButtonInput: FC<SearchButtonInputProps> = ({
  onSubmit,
  searchSlug,
}) => {
  const [inputSearch, setInputSearch] = useState(searchSlug);

  return (
    <form
      onSubmit={(e) => onSubmit(e, inputSearch)}
      className="search-input-form"
    >
      <input
        type="text"
        className="search-input"
        placeholder="Search..."
        autoFocus
        value={inputSearch}
        onChange={(e) => setInputSearch(e.target.value)}
        style={{ flex: 1 }}
      />
    </form>
  );
};
