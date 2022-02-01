import { Box, Alert, AlertTitle, AlertDescription } from "@chakra-ui/react";

export default function EmptyList() {
  return (
    <Box mt={{ base: 10, sm: 20, md: 28, lg: 32 }} p={10}>
      <Alert
        status="info"
        variant="subtle"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
        rounded={{ base: "md", lg: "lg" }}
        p={{ base: 6, sm: 7, md: 8, lg: 10 }}
        maxW={{ base: "sm", sm: "md", md: "lg" }}
        marginX="auto"
      >
        <AlertTitle mb={1} fontSize="lg">
          Nothing to show!
        </AlertTitle>
        <AlertDescription maxWidth="sm">
          Try adding a new New Friend ☝️
        </AlertDescription>
      </Alert>
    </Box>
  );
}
