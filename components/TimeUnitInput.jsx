import {
  VStack,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
} from "@chakra-ui/react";

export default function TimeUnitInput({ value, onChange, min, max }) {
  return (
    <VStack spacing={{ base: 2, sm: 3, md: 4 }}>
      <NumberInput
        min={min}
        max={max}
        minW="50px"
        maxW="100px"
        mb="1rem"
        value={value}
        onChange={onChange}
      >
        <NumberInputField p={{ base: 2, md: 4 }} />
        <NumberInputStepper display={{ base: "none", sm: "flex" }}>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
      <Slider
        flex="1"
        minH="32"
        focusThumbOnChange={false}
        value={value}
        onChange={onChange}
        orientation="vertical"
        min={min}
        max={max}
      >
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        <SliderThumb fontSize="sm" boxSize="32px">
          {value}
        </SliderThumb>
      </Slider>
    </VStack>
  );
}
