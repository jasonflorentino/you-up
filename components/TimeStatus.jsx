import { useContext } from "react";
import { HStack, Text, Heading } from "@chakra-ui/react";

import { TimezoneContext, useAppContext } from "../appState/AppContext";

export default function TimeStatus({ timezone }) {
  const timezones = useContext(TimezoneContext);
  const { state } = useAppContext();
  
  const getOffsetFromTimezome = (timezone) => {
    const [_name, offset] = Object.entries(timezones).find(([name]) => name === timezone) || [];
    return offset;
  }

  const offset = getOffsetFromTimezome(timezone);
  const localDate = new Date(Date.now() + offset + state.localOffset)
  const hours = localDate.getHours();
  const minutes = localDate.getMinutes();

  const isAwake = hours > 7 && hours < 23;
  const offsetHours = msToHours(offset + state.localOffset);

  return (
    <HStack spacing={4}>
      <Heading color={isAwake ? 'yellow.400' : 'gray.600'} size='md'>{isAwake? '👋 Awake' : '💤 Asleep'}</Heading>;
      <Text>{hours < 10 ? '0' + hours : hours}:{minutes < 10 ? '0' + minutes : minutes}</Text>;
      <Text>{offsetHours >= 0 ? `+${offsetHours}` : offsetHours}h</Text>;
    </HStack>
  )
}

function msToHours(ms) {
  return Math.round(ms / 1000 / 60 / 60);
}