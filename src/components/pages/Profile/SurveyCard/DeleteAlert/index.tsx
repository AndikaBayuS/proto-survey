import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
} from "@chakra-ui/react";
import { useRef } from "react";

interface DeleteAlert {
  isOpen: boolean;
  onClose: () => void;
  handleDelete: () => void;
}

const DeleteAlert = ({ isOpen, onClose, handleDelete }: DeleteAlert) => {
  const cancelRef = useRef(null);

  return (
    <AlertDialog
      isOpen={isOpen}
      onClose={onClose}
      leastDestructiveRef={cancelRef}
      isCentered
      closeOnOverlayClick={false}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader>Konfirmasi</AlertDialogHeader>
          <AlertDialogBody>
            Apakah anda yakin ingin menghapus survei ini ?
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              Batal
            </Button>
            <Button colorScheme="red" onClick={handleDelete} ml={3}>
              Ya, Hapus
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default DeleteAlert;
