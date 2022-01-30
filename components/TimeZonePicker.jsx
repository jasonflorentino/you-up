import { useState, useMemo, useCallback } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  FormErrorMessage,
  Button,
  Flex,
  VStack,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Box,
  useBreakpointValue,
} from "@chakra-ui/react";
import { NotAllowedIcon, CheckIcon } from "@chakra-ui/icons";

import { useAppContext } from "../appState/AppContext";

export default function TimeZonePicker({
  timezones,
  input,
  setInput,
  setValid,
}) {
  const { state } = useAppContext();
  const buttonSizes = useBreakpointValue({base: 'xs', md: 'sm'});
  const [checkForError, setCheckForError] = useState(false);
  const localOffset = state.localOffset;

  const inputIsValid = useCallback(
    (input) => {
      return input !== "" && timezones[input] !== undefined;
    },
    [timezones]
  );

  const handleInputChange = useCallback(
    (e) => {
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
    },
    [checkForError, setInput, setCheckForError, inputIsValid, setValid]
  );

  const hasError = !inputIsValid(input);

  const optionsComponents = useMemo(
    () =>
      Object.entries(timezones).map(([name, offsetms]) => {
        const hours = msToHours(offsetms + localOffset);
        return (
          <Button
            size={buttonSizes}
            mr={3}
            mb={3}
            key={name}
            onClick={() => handleInputChange({ target: { value: name } })}
          >
            {name.replace(/_/g, " ")} ({hours > 0 ? "+" : ""}
            {hours})
          </Button>
        );
      }),
    [timezones, localOffset, handleInputChange, buttonSizes]
  );

  const options = optionsComponents.filter(({ key }) => {
    return key.toLowerCase().includes(input.toLowerCase().replace(/ /g, "_"));
  });

  return (
    <VStack p={4} spacing={4} align="stretch">
      <FormControl isInvalid={checkForError && hasError} isRequired={true}>
        <FormLabel htmlFor="timezone">Timezone</FormLabel>
        <InputGroup>
          <InputLeftElement
            pointerEvents="none"
            color="gray.300"
            fontSize="1.2em"
          >
            📍
          </InputLeftElement>
          <Input
            id="timezone"
            type="text"
            value={input}
            onChange={handleInputChange}
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
            Please select an option from the list.
          </FormErrorMessage>
        ) : (
          <FormHelperText>What timezone are they in?</FormHelperText>
        )}
      </FormControl>
      <Box maxH={"xs"} overflow={"auto"}>
        <Flex wrap="wrap">{options}</Flex>
      </Box>
    </VStack>
  );
}

function msToHours(ms) {
  return ms / 1000 / 60 / 60;
}
