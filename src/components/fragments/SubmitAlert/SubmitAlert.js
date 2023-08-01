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

export default function SubmitAlert({
  isOpen,
  onClose,
  title,
  description,
  btnSubmitText,
}) {
  const cancelRef = useRef(null);
  const { submitForm } = useFormikContext() ?? {};

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
          <AlertDialogHeader>{title}</AlertDialogHeader>
          <AlertDialogBody>{description}</AlertDialogBody>
          <AlertDialogFooter>
            <Button onClick={onClose} ref={cancelRef}>
              Batal
            </Button>
            <Button colorScheme="messenger" ml={3} onClick={submitForm}>
              {btnSubmitText}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
}
