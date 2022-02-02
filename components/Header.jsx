import { useState } from "react";
import { HStack, IconButton, useBreakpointValue } from "@chakra-ui/react";
import { QuestionOutlineIcon } from "@chakra-ui/icons";

import AboutDrawer from "./AboutDrawer";
import ColorModeToggle from "./ColorModeToggle";
import Logo from "./Logo";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const buttonSizes = useBreakpointValue({ base: "sm", sm: "md", md: "lg" });

  return (
    <>
      <AboutDrawer isOpen={isOpen} setIsOpen={setIsOpen} />
      <HStack p={4} justifyContent="space-between">
        <Logo />
        <HStack spacing={2} justifyContent="flex-end">
          <IconButton
            aria-label="Information this app"
            onClick={() => setIsOpen(true)}
            icon={<QuestionOutlineIcon />}
            size={buttonSizes}
            variant={"ghost"}
          />
          <ColorModeToggle />
        </HStack>
      </HStack>
    </>
  );
}
