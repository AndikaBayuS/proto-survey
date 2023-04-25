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
  title: string;
  description: string;
  btnSubmitText: string;
  isOpen: boolean;
  onClose: () => void;
}

const SubmitAlert = ({
  isOpen,
  onClose,
  title,
  description,
  btnSubmitText,
}: SubmitAlert) => {
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
          <AlertDialogHeader>{title}</AlertDialogHeader>
          <AlertDialogBody>{description}</AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              Batal
            </Button>
            <Button colorScheme="blue" onClick={submitForm} ml={3}>
              {btnSubmitText}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default SubmitAlert;
