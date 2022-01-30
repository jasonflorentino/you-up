import { useState } from "react";
import {
  Flex,
  Heading,
  Spacer,
  IconButton,
  Button,
  useBreakpointValue,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";

import { useAppContext } from "../appState/AppContext";
import { REMOVE_FRIEND } from "../appState/reducer";
import TimeStatus from "./TimeStatus";
import AlertDialogBox from "./AlertDialogBox";

export default function Friend({ friend }) {
  const [alert, setAlert] = useState(false);
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

      <AlertDialogBox
        isOpen={alert}
        onConfirm={onConfirmDelete}
        onClose={handleClose}
        headerText="See ya!"
        bodyText="Are you sure you want to remove this friend? You can&apos;t undo this action."
        confirmText="Remove"
      />
    </li>
  );
}
