import { useState, useEffect, useContext } from "react";
import { HStack, Text, Heading } from "@chakra-ui/react";

import { TimezoneContext, useAppContext } from "../appState/AppContext";

export default function TimeStatus({ timezone }) {
  const timezones = useContext(TimezoneContext);
  const [now, setNow] = useState(Date.now())
  const { state } = useAppContext();

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(Date.now());
    }, 2000);

    return () => clearInterval(interval);
  }, [])

  const getOffsetFromTimezome = (timezone) => {
    const [_name, offset] =
      Object.entries(timezones).find(([name]) => name === timezone) || [];
    return offset;
  };

  const offset = getOffsetFromTimezome(timezone);
  const localDate = new Date(now + offset + state.localOffset);
  const hours = localDate.getHours();
  const minutes = localDate.getMinutes();

  const isAwake = hours > 7 && hours < 23;
  const offsetHours = msToHours(offset + state.localOffset);

  return (
    <HStack spacing={{ base: 2, sm: 3, md: 4, lg: 6 }} mr={{ base: 1, md: 2 }}>
      <Heading
        color={isAwake ? "yellow.400" : "gray.600"}
        fontSize={{ base: "sm", sm: "md", md: "lg", lg: "xl" }}
      >
        {isAwake ? "👋 Awake" : "💤 Asleep"}
      </Heading>
      <Text as='kbd' fontSize={{ base: "sm", md: "md", lg: "lg" }}>
        {hours < 10 ? "0" + hours : hours}:
        {minutes < 10 ? "0" + minutes : minutes}
      </Text>
      <Text as='kbd' fontSize={{ base: "xs", sm: "sm", md: "md", lg: "lg" }}>
        {offsetHours >= 0 ? `+${offsetHours}` : offsetHours}h
      </Text>
    </HStack>
  );
}

function msToHours(ms) {
  return Math.round(ms / 1000 / 60 / 60);
}
