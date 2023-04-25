import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
} from "@chakra-ui/react";
import { useFormikContext } from "formik";
import { useRef } from "react";

interface SubmitAlert {
  isOpen: boolean;
  onClose: () => void;
}

const SubmitAlert = ({ isOpen, onClose }: SubmitAlert) => {
  const cancelRef = useRef(null);
  const { submitForm } = useFormikContext() ?? {};

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
          <AlertDialogHeader>Submit Jawaban</AlertDialogHeader>
          <AlertDialogBody>
            Anda hampir selesai! Apakah Anda ingin melihat kembali jawaban Anda
            sebelum submit?
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              Batal
            </Button>
            <Button colorScheme="blue" onClick={submitForm} ml={3}>
              Ya, Submit
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default SubmitAlert;
