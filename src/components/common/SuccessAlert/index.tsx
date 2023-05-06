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
  description: string;
  isOpen: boolean;
  onClose: () => void;
  points: number;
}

const SuccessAlert = ({ isOpen, onClose, points, description }: SuccessAlert) => {
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
            {description} Anda mendapatkan{" "}
            <b>{points}</b> Poin!.
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
};

export default SuccessAlert;
