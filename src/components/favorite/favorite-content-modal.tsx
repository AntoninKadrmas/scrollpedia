import { FC, HTMLAttributes } from "react";
import {
  Button,
  Modal,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from "react-bootstrap";
import { useFavorite } from "@/store/use-favorite";
import { ResultFavorite } from "@/types/random";
import { BookmarkOff } from "lucide-react";

type FavoriteContentModalProps = {
  className?: string;
  show: ResultFavorite | null;
  handleClose: () => void;
} & HTMLAttributes<HTMLOrSVGElement>;

export const FavoriteContentModal: FC<FavoriteContentModalProps> = ({
  show,
  handleClose,
}) => {
  const toggleFavorite = useFavorite((state) => state.toggleFavorite);

  return (
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
  );
};
