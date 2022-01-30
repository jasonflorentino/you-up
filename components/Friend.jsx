import { useState, useRef } from "react";
import {
  Flex,
  Checkbox,
  Heading,
  Spacer,
  IconButton,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
  useBreakpointValue,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";

import { useAppContext } from "../appState/AppContext";
import { REMOVE_FRIEND } from "../appState/reducer";
import TimeStatus from "./TimeStatus";

export default function Friend({ friend }) {
  const [alert, setAlert] = useState(false);
  const onCancelRef = useRef();
  const { dispatch } = useAppContext();
  const { name, timezone, id } = friend;
  const sizes = useBreakpointValue({ base: "sm", md: "md" });

  const handleDeleteClick = () => {
    setAlert(true);
  };

  const handleClose = () => {
    setAlert(false);
  };

  const onConfirmDelete = () => {
    dispatch({
      type: REMOVE_FRIEND,
      payload: { id },
    });
  };

  const dialogSizes = useBreakpointValue({ base: "xs", md: "sm", lg: "lg" });
  const buttonSizes = useBreakpointValue({ base: "sm", md: "md", lg: "lg" });
  const modalCentering = useBreakpointValue({ base: true, lg: false })

  return (
    <li>
      <Flex direction={"row"} alignItems={"center"}>
        <Heading as="h4" fontSize={{ base: "md", md: "lg", lg: "xl" }}>
          {name}
        </Heading>
        <Spacer />
        <TimeStatus timezone={timezone} />
        <IconButton
          ml={{ base: 1, md: 2 }}
          size={sizes}
          icon={<DeleteIcon />}
          colorScheme="red"
          variant="ghost"
          aria-label="Remove Friend"
          onClick={handleDeleteClick}
        />
      </Flex>

      <AlertDialog
        isOpen={alert}
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
              See ya!
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure you want to remove this friend? You can&apos;t undo
              this action.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button
                size={buttonSizes}
                ref={onCancelRef}
                onClick={handleClose}
              >
                Cancel
              </Button>
              <Button
                size={buttonSizes}
                colorScheme="red"
                onClick={onConfirmDelete}
                ml={3}
              >
                Remove
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </li>
  );
}
