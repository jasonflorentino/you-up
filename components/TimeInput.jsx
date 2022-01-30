import {
  HStack,
} from "@chakra-ui/react";

import TimeUnitInput from "./TimeUnitInput";

export default function TimeInput({ hours, minutes, handleChange }) {
  const handleHoursChange = (val) => {
    handleChange(val, minutes);
  };

  const handleMinutesChange = (val) => {
    handleChange(hours, val);
  };

  return (
    <HStack spacing={{base: 2,  md: 4}} p={{base: 0, sm: 1, md: 2}}>
      <TimeUnitInput min={0} max={23} value={hours} onChange={handleHoursChange} />
      <TimeUnitInput min={0} max={59} value={minutes} onChange={handleMinutesChange} />
    </HStack>
  );
}
