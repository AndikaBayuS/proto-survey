import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useRef } from "react";

export default function SuccessAlert({ isOpen, onClose, points, description }) {
  const router = useRouter();
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
          <AlertDialogHeader>Berhasil!</AlertDialogHeader>
          <AlertDialogBody>
            {description} Anda mendapatkan <b>{points}</b> Poin!.
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button colorScheme="messenger" onClick={() => router.push("/")}>
              Kembali
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
}
