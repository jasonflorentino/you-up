import { useState, useCallback, useMemo } from "react";
import {
  Flex,
  Heading,
  Spacer,
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  useBreakpointValue,
} from "@chakra-ui/react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";

import { useAppContext } from "../appState/AppContext";
import { REMOVE_FRIEND } from "../appState/reducer";
import TimeStatus from "./TimeStatus";
import AlertDialogBox from "./AlertDialogBox";
import EditFriendForm from "./EditFriendForm";

export default function Friend({ friend }) {
  const { dispatch } = useAppContext();
  const { name, timezone, id } = friend;

  const [alert, setAlert] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const sizes = useBreakpointValue({ base: "sm", md: "md" });

  const handleDeleteClick = () => {
    setAlert(true);
  };

  const handleDeleteCancel = () => {
    setAlert(false);
  };

  const onConfirmDelete = () => {
    dispatch({
      type: REMOVE_FRIEND,
      payload: { id },
    });
  };

  const handleEditClick = () => {
    setShowEdit(true);
  };

  const handleEditCancel = useCallback(() => {
    setShowEdit(false);
  }, []);

  const memoizedFriendForm = useMemo(
    () => (
      <EditFriendForm
        id={id}
        name={name}
        timezone={timezone}
        handleCancel={handleEditCancel}
      />
    ),
    [id, name, timezone, handleEditCancel]
  );

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
          icon={<EditIcon />}
          colorScheme="blue"
          variant="ghost"
          aria-label="Edit Friend"
          onClick={handleEditClick}
        />
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

      {showEdit && (
        <Modal isOpen={showEdit} size={"2xl"} onClose={handleEditCancel}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Edit {name}</ModalHeader>
            <ModalCloseButton />
            {memoizedFriendForm}
          </ModalContent>
        </Modal>
      )}

      <AlertDialogBox
        isOpen={alert}
        onConfirm={onConfirmDelete}
        onClose={handleDeleteCancel}
        headerText="See ya!"
        bodyText="Are you sure you want to remove this friend? You can't undo this action."
        confirmText="Remove"
      />
    </li>
  );
}
