import { cn } from "cn";
import { BookMarked, Search, X } from "lucide-react";
import { FC, FormEvent, HTMLAttributes, useState } from "react";
import { Button } from "react-bootstrap";
import "./search-component.css";
import { SearchContent } from "./search-content";
import { FavoriteContent } from "@/components/favorite/favorite-content";
import { useSearchFavorite } from "@/store/use-search-favorite";

type SearchComponentProps = {
  className?: string;
  categoryId: string | null;
} & HTMLAttributes<HTMLOrSVGElement>;

export const SearchComponent: FC<SearchComponentProps> = ({
  categoryId,
  ...props
}) => {
  const startSearch = useSearchFavorite((state) => state.startSearch);
  const setStartSearch = useSearchFavorite((state) => state.setStartSearch);
  const startFavorite = useSearchFavorite((state) => state.startFavorite);
  const setStartFavorite = useSearchFavorite((state) => state.setStartFavorite);
  const searchSlug = useSearchFavorite((state) => state.searchSlug);
  const setSearchSlug = useSearchFavorite((state) => state.setSearchSlug);

  const onSubmit = (e: FormEvent<HTMLFormElement>, newData: string) => {
    e.preventDefault();
    setSearchSlug(newData);
  };

  return (
    <>
      {(startSearch || startFavorite) && (
        <div
          className="search-backdrop z-1 bg-black"
          onClick={() => {
            setStartSearch(false);
            setStartFavorite(false);
          }}
        ></div>
      )}
      {startSearch && (
        <div className="search-panel search-panel--search z-2">
          <SearchContent
            slug={searchSlug}
            categoryId={categoryId}
            onClose={() => setStartSearch(false)}
          />
        </div>
      )}
      {startFavorite && (
        <div className="search-panel z-2">
          <FavoriteContent />
        </div>
      )}
      {(startSearch || startFavorite) && (
        <Button
          aria-label="Close panel"
          className="search-close glass rounded-circle d-flex align-items-center justify-content-center z-2"
          onClick={() => {
            setStartSearch(false);
            setStartFavorite(false);
          }}
        >
          <X aria-hidden="true" />
        </Button>
      )}
      {!startFavorite && (
        <div className="search-controls justify-content-center z-2 d-flex align-items-end gap-1">
          {!startSearch && <div style={{ width: "42px" }} />}
          <Button
            {...props}
            className={cn(
              "glass d-flex justify-content-center align-items-center p-4",
              startSearch ? "rounded-5 w-100 rounded-top-0" : "rounded-circle",
            )}
            aria-label="Search"
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
              aria-label="Favorites"
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
