import { cn } from "cn";
import { Search, X } from "lucide-react";
import { FC, HTMLAttributes, useState } from "react";
import { Button } from "react-bootstrap";
import "./search-button.css";
import { SearchContent } from "./search-content";
import { Children } from "@/types/subtopic";

type SearchButtonProps = {
  className?: string;
  subcategories?: Children[];
  categoryId: string | null;
} & HTMLAttributes<HTMLOrSVGElement>;

export const SearchButton: FC<SearchButtonProps> = ({
  subcategories = [],
  categoryId,
  ...props
}) => {
  const [startSearch, setStartSearch] = useState(false);
  const [searchSlug, setSearchSlug] = useState("");
  const onSubmit = (e: React.FormEvent<HTMLFormElement>, newData: string) => {
    e.preventDefault();
    setSearchSlug(newData);
  };
  return (
    <>
      {startSearch && (
        <div
          className="vh-100 vw-100 z-1 bg-black opacity-75 position-absolute"
          onClick={() => setStartSearch(false)}
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
      {startSearch && (
        <Button
          className="w-10 h-10 glass rounded-circle position-absolute top-0 end-0 m-3 d-flex align-items-center justify-content-center z-2 d-lg-none d-block"
          onClick={() => setStartSearch(false)}
        >
          <X />
        </Button>
      )}
      <Button
        {...props}
        className={cn(
          "search-button max-width-50 glass d-flex justify-content-center align-items-center p-4 position-absolute bottom-0 mb-md-5 mb-4 z-2",
          startSearch ? "rounded-5 w-100 rounded-top-0" : "rounded-circle",
        )}
        onClick={() => setStartSearch(true)}
      >
        <Search />
        {startSearch && (
          <SearchButtonInput onSubmit={onSubmit} searchSlug={searchSlug} />
        )}
      </Button>
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
        // onBlur={() => setStartSearch(false)}
        onChange={(e) => setInputSearch(e.target.value)}
        style={{ flex: 1 }}
      />
    </form>
  );
};
