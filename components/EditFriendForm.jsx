import { useState, useMemo, useContext } from "react";
import { VStack, HStack, Button, useBreakpointValue } from "@chakra-ui/react";

import NameInput from "./NameInput";
import TimeZonePicker from "./TimeZonePicker";
import { TimezoneContext, useAppContext } from "../appState/AppContext";
import { EDIT_FRIEND } from "../appState/reducer";

export default function NewFriendForm({ id, name, timezone, handleCancel }) {
  const timezones = useContext(TimezoneContext);
  const { dispatch } = useAppContext();

  const [nameInput, setNameInput] = useState(name);
  const [timezoneInput, setTimezoneInput] = useState(timezone);
  const [validName, setValidName] = useState(true);
  const [validTimezone, setValidTimezone] = useState(true);

  const handleSubmit = () => {
    dispatch({
      type: EDIT_FRIEND,
      payload: {
        id,
        name: nameInput,
        timezone: timezoneInput
      }
    })
    handleCancel();
  };

  const memoizedTimeZonePicker = useMemo(
    () => (
      <TimeZonePicker
        timezones={timezones}
        input={timezoneInput}
        setInput={setTimezoneInput}
        setValid={setValidTimezone}
      />
    ),
    [timezones, timezoneInput, setTimezoneInput, setValidTimezone]
  );

  const valid = validName && validTimezone;
  const buttonSizes = useBreakpointValue({ base: "md", sm: "lg" });

  return (
    <VStack p={4} spacing={4} align="stretch">
      <NameInput
        input={nameInput}
        setInput={setNameInput}
        setValid={setValidName}
      />
      {memoizedTimeZonePicker}
      <HStack spacing={4}>
        <Button
          w={"100%"}
          size={buttonSizes}
          colorScheme="blue"
          variant="outline"
          onClick={handleCancel}
        >
          Cancel
        </Button>
        <Button
          w={"100%"}
          size={buttonSizes}
          colorScheme="green"
          onClick={handleSubmit}
          disabled={!valid}
        >
          Submit
        </Button>
      </HStack>
    </VStack>
  );
}
