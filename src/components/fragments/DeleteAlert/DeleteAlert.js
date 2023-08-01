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

export default function DeleteAlert({ isOpen, onClose, handleDelete }) {
  const cancelRef = useRef(null);

  return (
    <AlertDialog
      closeOnOverlayClick={false}
      isCentered
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
            <Button onClick={onClose} ref={cancelRef}>
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
}
