import { FC, HTMLAttributes, useRef, useState } from "react";
import {
  Button,
  Modal,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from "react-bootstrap";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useFavorite } from "@/store/use-favorite";
import { Background } from "@/components/background";
import { Bookmark, BookmarkOff } from "lucide-react";
import { ResultFavorite } from "@/types/random";
import { useSearchFavorite } from "@/store/use-search-favorite";
import { ContentCard } from "../search/content-card";

type FavoriteContentProps = {
  className?: string;
} & HTMLAttributes<HTMLOrSVGElement>;

const ARTICLE_HEIGHT = 166;

export const FavoriteContent: FC<FavoriteContentProps> = ({ ...props }) => {
  const favorites = useFavorite((state) => state.favorites);
  const toggleFavorite = useFavorite((state) => state.toggleFavorite);
  const scrollOffsets = useSearchFavorite((state) => state.scrollOffsets);
  const setScrollOffset = useSearchFavorite((state) => state.setScrollOffset);

  const parentRef = useRef<HTMLDivElement>(null);

  const rowVirtualizer = useVirtualizer({
    initialOffset: () => scrollOffsets.favorites ?? 0,
    count: favorites.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => ARTICLE_HEIGHT,
    paddingEnd: 0,
    overscan: 5,
  });

  const [show, setShow] = useState<ResultFavorite | null>(null);

  const handleClose = () => setShow(null);
  const handleShow = (article: ResultFavorite) => setShow(article);

  return (
    <div
      {...props}
      className="overflow-hidden h-100 w-100 position-relative search-content"
      onClick={(e) => e.stopPropagation()}
    >
      <div
        ref={parentRef}
        onScroll={(event) => {
          setScrollOffset("favorites", event.currentTarget.scrollTop);
        }}
        className="d-flex flex-column overflow-auto h-100"
        style={{
          scrollbarWidth: "none",
          width: "100%",
          position: "relative",
        }}
      >
        {favorites.length === 0 && (
          <div className="text-center text-white mt-5 text-center d-flex flex-column align-items-center gap-2">
            <span>No favorites yet. Add a favorite by clicking on</span>
            <Bookmark />
          </div>
        )}
        <div
          style={{
            height: `${rowVirtualizer.getTotalSize()}px`,
            width: "100%",
            position: "relative",
            flexShrink: 0,
          }}
        >
          {rowVirtualizer.getVirtualItems().map((virtualRow) => {
            const article = favorites[virtualRow.index];
            return (
              <div
                key={virtualRow.key}
                data-index={virtualRow.index}
                ref={rowVirtualizer.measureElement}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  transform: `translateY(${virtualRow.start}px)`,
                }}
              >
                <ContentCard article={article} handleShow={handleShow} />
              </div>
            );
          })}
        </div>
      </div>
      <Background value={favorites.length.toString()} />
      <Modal show={!!show} onHide={handleClose} centered>
        <ModalHeader closeButton>
          <ModalTitle>Remove Favorite</ModalTitle>
        </ModalHeader>
        <Modal.Body>
          <p>Are you sure you want to remove this favorite?</p>
          <strong>{show?.title}</strong>
        </Modal.Body>
        <ModalFooter>
          <Button variant="outline-secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            variant="danger"
            className="d-flex gap-1 align-items-center"
            onClick={() => {
              if (show) toggleFavorite(show);
              handleClose();
            }}
          >
            Remove <BookmarkOff />
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};
