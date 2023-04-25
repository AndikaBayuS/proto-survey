import { useRouter } from "next/router";
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

interface SuccessAlert {
  isOpen: boolean;
  onClose: () => void;
  points: number;
}

const SuccessAlert = ({ isOpen, onClose, points }: SuccessAlert) => {
  const router = useRouter();
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
          <AlertDialogHeader>Berhasil!</AlertDialogHeader>
          <AlertDialogBody>
            Terimakasih telah mengisi survey ini. Anda mendapatkan{" "}
            <b>{points}</b> Poin!.
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button colorScheme={"blue"} onClick={() => router.push("/")}>
              Kembali
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default SuccessAlert;
