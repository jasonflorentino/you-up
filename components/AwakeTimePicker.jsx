import { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  Flex,
  VStack,
  HStack,
  Button,
  Heading,
  useBreakpointValue
} from "@chakra-ui/react";

import { useAppContext } from "../appState/AppContext";
import { SET_AWAKETIMES } from "../appState/reducer";
import TimeInput from "./TimeInput";

export default function AwakeTimePicker({ isOpen, onClose }) {
  const { state, dispatch } = useAppContext();
  const { wakeTime, sleepTime } = state;

  /**
   * [
   *   hours: number between 0 and 23,
   *   minutes: number between 0 and 59
   * ]
   */
  const [newWakeTime, setNewWakeTime] = useState([...wakeTime]);
  const [newSleepTime, setNewSleepTime] = useState([...sleepTime]);

  const handleSubmit = () => {
    dispatch({
      type: SET_AWAKETIMES,
      payload: {
        wakeTime: [...newWakeTime],
        sleepTime: [...newSleepTime],
      },
    });
    onClose();
  };

  const handleWakeTimeChange = (hours, minutes) => {
    setNewWakeTime([Number(hours), Number(minutes)]);
  };

  const handleSleepTimeChange = (hours, minutes) => {
    setNewSleepTime([Number(hours), Number(minutes)]);
  };

  const handleCanel = () => {
    setNewWakeTime([...wakeTime]);
    setNewSleepTime([...sleepTime]);
    onClose();
  };

  const isValid = isAwakeTimeValid(newWakeTime, newSleepTime);
  const headingStyles = { as: "h4", fontSize: {base: "sm", sm: 'md', md: 'lg' } };
  const modalSizes = useBreakpointValue({base: 'xs', sm:'sm', md: "2xl"})

  return (
    <Modal isOpen={isOpen} size={modalSizes} onClose={handleCanel}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader color="blue.500">Edit Awake Time</ModalHeader>
        <ModalCloseButton />

        <VStack p={{ base: 2, sm: 4 }} spacing={8}>
          <HStack spacing={4} p={{ base: 2, sm: 4 }}>
            <VStack>
              <Heading {...headingStyles}>Wake Time</Heading>
              <TimeInput
                hours={newWakeTime[0]}
                minutes={newWakeTime[1]}
                handleChange={handleWakeTimeChange}
              />
            </VStack>

            <VStack>
              <Heading {...headingStyles}>Sleep Time</Heading>
              <TimeInput
                hours={newSleepTime[0]}
                minutes={newSleepTime[1]}
                handleChange={handleSleepTimeChange}
              />
            </VStack>
          </HStack>

          <HStack spacing={4} w={"100%"}>
            <Button w={"100%"} onClick={handleCanel}>
              Cancel
            </Button>

            <Button w={"100%"} colorScheme={'blue'} onClick={handleSubmit} disabled={!isValid}>
              Submit
            </Button>
          </HStack>
        </VStack>

      </ModalContent>
    </Modal>
  );
}

function isAwakeTimeValid(waketime, sleeptime) {
  const [wakeH, wakeM] = waketime;
  const [sleepH, sleepM] = sleeptime;

  if (wakeH > sleepH) {
    return false;
  }
  if (wakeH === sleepH) {
    return wakeM < sleepM;
  }
  return true;
}
