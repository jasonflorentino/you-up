import { Heading, useColorMode } from "@chakra-ui/react";

export default function Logo() {
  const { colorMode } = useColorMode();
  const isLight = colorMode === "light";
  return (
    <Heading color={isLight ? "blue.700" : "yellow.200"} size="lg">
      ⏰ You Up?
    </Heading>
  );
}
