import { useRef } from "react";
import {
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogContent,
  Button,
  useBreakpointValue,
} from "@chakra-ui/react";

export default function AlertDialogBox({
  isOpen,
  onClose,
  onConfirm,
  headerText,
  bodyText,
  cancelText = "Cancel",
  confirmText,
}) {
  const onCancelRef = useRef();

  const handleClose = () => {
    onClose();
  };

  const handleConfirm = () => {
    onConfirm();
  };

  const dialogSizes = useBreakpointValue({ base: "xs", md: "sm", lg: "lg" });
  const buttonSizes = useBreakpointValue({ base: "sm", md: "md", lg: "lg" });
  const modalCentering = useBreakpointValue({ base: true, lg: false });

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={onCancelRef}
      onClose={handleClose}
      size={dialogSizes}
      isCentered={modalCentering}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          
          <AlertDialogHeader
            fontSize={{ base: "lg", md: "xl", lg: "2xl" }}
            fontWeight="bold"
          >
            {headerText}
          </AlertDialogHeader>

          <AlertDialogBody>
            {bodyText}
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button size={buttonSizes} ref={onCancelRef} onClick={handleClose}>
              {cancelText}
            </Button>
            <Button
              size={buttonSizes}
              colorScheme="red"
              onClick={handleConfirm}
              ml={3}
            >
              {confirmText}
            </Button>
          </AlertDialogFooter>

        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
}
