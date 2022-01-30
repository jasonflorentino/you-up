import { useState, useRef } from 'react';
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
} from "@chakra-ui/react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";

import { useAppContext } from "../appState/AppContext";
import { REMOVE_FRIEND } from "../appState/reducer";
import TimeStatus from "./TimeStatus";

export default function Friend({ friend }) {
  const [alert, setAlert] = useState(false);
  const onCancelRef = useRef();
  const { dispatch } = useAppContext();
  const { name, timezone, id } = friend;

  const handleDeleteClick = () => {
    setAlert(true);
  };

  const handleClose = () => {
    setAlert(false);
  }

  const onConfirmDelete = () => {
    dispatch({
      type: REMOVE_FRIEND,
      payload: { id },
    });
  }

  return (
    <li>
      <Flex direction={"row"} alignItems={"center"}>
        <Checkbox size="lg">
          <Heading as="h4" size="md">
            {name}
          </Heading>
        </Checkbox>
        <Spacer />
          <TimeStatus timezone={timezone} />
        <IconButton
          ml={4}
          size={"md"}
          icon={<EditIcon />}
          colorScheme="blue"
          variant="ghost"
          aria-label="Edit Friend"
        />
        <IconButton
          ml={2}
          size={"md"}
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
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              See ya!
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure you want to remove this friend? You can&apos;t undo this action.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={onCancelRef} onClick={handleClose}>
                Cancel
              </Button>
              <Button colorScheme='red' onClick={onConfirmDelete} ml={3}>
                Remove
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </li>
  );
}
