import { IconButton, useColorMode, useBreakpointValue } from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

export default function ColorModeToggle() {
  const { colorMode, toggleColorMode } = useColorMode();
  const icon = colorMode === "light" ? <MoonIcon /> : <SunIcon />;
  const buttonSizes = useBreakpointValue({ base: "sm", sm: "md", md: "lg" });

  return (
    <IconButton
      aria-label="Toggle color mode"
      onClick={toggleColorMode}
      icon={icon}
      size={buttonSizes}
      variant={"ghost"}
    />
  );
}
