import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Heading,
  HStack,
  IconButton,
  Link,
  Spacer,
  Text,
  useBreakpointValue,
  useColorMode,
  VStack,
} from "@chakra-ui/react";
import { CloseIcon, ExternalLinkIcon } from "@chakra-ui/icons";

export default function AboutDrawer({ isOpen, setIsOpen }) {
  const buttonSizes = useBreakpointValue({ base: "sm", sm: "md", md: "lg" });
  const drawerSizes = useBreakpointValue({ base: "full", lg: "xl" });
  const { colorMode } = useColorMode();
  const isLight = colorMode === "light";

  return (
    <Drawer onClose={() => setIsOpen(false)} isOpen={isOpen} size={drawerSizes}>
      <DrawerOverlay />
      <DrawerContent background={isLight ? "gray.50" : "gray.700"}>
        <DrawerHeader>
          <HStack alignItems={"flex-start"} justifyContent={"flex-end"}>
            <IconButton
              aria-label="Close the drawer"
              onClick={() => setIsOpen(false)}
              icon={<CloseIcon />}
              size={buttonSizes}
              variant={"ghost"}
            />
          </HStack>
        </DrawerHeader>
        <DrawerBody
          color={isLight ? "gray.700" : "gray.200"}
          pb={{ base: 10, lg: 0 }}
          p={{ lg: 12 }}
          overflowY={"auto"}
        >
          <VStack
            h={{ base: "120%", lg: "100%" }}
            py={{ base: 4, lg: 0 }}
            justifyContent={"flex-start"}
            alignItems={"flex-start"}
            maxW={{ base: "auto", lg: "66%" }}
          >
            <Heading
              mt={{ lg: 44 }}
              lineHeight={1.1}
              color={isLight ? "blue.600" : "yellow.200"}
            >
              Quickly check if you can ring your remote friends
            </Heading>
            <HStack w={"100%"} justifyContent={"space-between"}>
              <Text
                as="i"
                fontSize="sm"
                pb={0.5}
                borderBottom={`1px solid`}
                borderBottomColor={isLight ? "blue.600" : "yellow.200"}
              >
                Made for Steve by Jason
              </Text>
              <Link
                fontSize="sm"
                href={"https://github.com/jasonflorentino/you-up"}
                isExternal
              >
                View on GitHub <ExternalLinkIcon mx="2px" />
              </Link>
            </HStack>
            <Spacer />
            <Text pb={{ base: 10, lg: 0 }}>
              This app runs entirely in your browser and stores your list of
              friends in the browser&apos;s <Text as="samp">localstorage</Text>.
              This is great because no data is being sent anywhere, and yet your
              list can persist across reloads and revists. However,{" "}
              <Text display="inline" fontWeight={700}>
                <Text as="kbd">localstorage</Text> is not a secure store
              </Text>
              . While the storage the browser gives us is specific to this URL,
              it&apos;s unencrypted and freely accessible to anyone with
              physical access to the device — Don&apos;t store any sensitive
              information in here. This also means that if you clear your
              browser&apos;s data/cache, you may lose your list! Perhaps an
              import/export feature should be next.
            </Text>
          </VStack>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}
