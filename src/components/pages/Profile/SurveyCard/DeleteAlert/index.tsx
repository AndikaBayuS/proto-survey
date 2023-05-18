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
      isCentered
      closeOnOverlayClick={false}
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
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
            <Button colorScheme="red" ml={3} onClick={handleDelete}>
              Ya, Hapus
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default DeleteAlert;
