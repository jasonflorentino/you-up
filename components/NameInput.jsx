import { useState } from "react";
import {
  InputGroup,
  InputLeftElement,
  Input,
  InputRightElement,
  FormLabel,
  VStack,
  FormControl,
  FormHelperText,
  FormErrorMessage,
} from "@chakra-ui/react";
import { CheckIcon, NotAllowedIcon } from "@chakra-ui/icons";

export default function NameInput({ input, setInput, setValid }) {
  const [checkForError, setCheckForError] = useState(false);

  const inputIsValid = (input) => {
    return input !== '';
  }

  const handleChange = (e) => {
    if (!checkForError) {
      setCheckForError(true);
    }
    const newVal = e.target.value;

    if (inputIsValid(newVal)) {
      setValid(true);
    } else {
      setValid(false);
    }

    setInput(newVal);
  };

  const hasError = !inputIsValid(input);

  return (
    <VStack p={4} spacing={4} align="stretch">
      <FormControl isInvalid={checkForError && hasError} isRequired={true}>
        <FormLabel htmlFor="name">Name</FormLabel>
        <InputGroup>
          <InputLeftElement
            pointerEvents="none"
            color="gray.300"
            fontSize="1.2em"
          >
            👋
          </InputLeftElement>
          <Input
            id="name"
            placeholder="Tom Bombadil"
            value={input}
            onChange={handleChange}
          />
          <InputRightElement>
            {!checkForError ? null : hasError ? (
              <NotAllowedIcon color="red.500" />
            ) : (
              <CheckIcon color="green.500" />
            )}
          </InputRightElement>
        </InputGroup>
        {checkForError && hasError ? (
          <FormErrorMessage>
            A name is required.
          </FormErrorMessage>
        ) : (
          <FormHelperText>What&apos;s their name?</FormHelperText>
        )}
      </FormControl>
    </VStack>
  );
}
