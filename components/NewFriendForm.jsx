import { useState, useMemo, useContext } from "react";
import { VStack, HStack, Button } from "@chakra-ui/react";

import NameInput from "./NameInput";
import TimeZonePicker from "./TimeZonePicker";
import { TimezoneContext } from '../appState/AppContext';

export default function NewFriendForm({ handleAddNewFriend, handleCancel }) {
  const timezones = useContext(TimezoneContext)
  const [nameInput, setNameInput] = useState("");
  const [timezoneInput, setTimezoneInput] = useState("");
  const [validName, setValidName] = useState(false);
  const [validTimezone, setValidTimezone] = useState(false);

  const handleSubmit = () => {
    handleAddNewFriend(nameInput, timezoneInput);
  }

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
  
  return (
    <VStack p={4} spacing={4} align="stretch">
      <NameInput input={nameInput} setInput={setNameInput} setValid={setValidName} />
      {memoizedTimeZonePicker}
      <HStack spacing={4}>
        <Button w={"100%"} size="lg" colorScheme="blue" variant="outline" onClick={handleCancel}>
          Cancel
        </Button>
        <Button w={"100%"} size="lg" colorScheme="green" onClick={handleSubmit} disabled={!valid}>
          Submit
        </Button>
      </HStack>
    </VStack>
  );
}
