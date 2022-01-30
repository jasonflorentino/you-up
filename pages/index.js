import { useState, useEffect, useMemo, useCallback } from "react";
import Head from "next/head";
import {
  Flex,
  Button,
  VStack,
  StackDivider,
  Heading,
  HStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  useBreakpointValue,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";

import NewFriendForm from "../components/NewFriendForm";
import Friend from "../components/Friend";
import ColorModeToggle from "../components/ColorModeToggle";
import { useAppContext, TimezoneContext } from "../appState/AppContext";
import {
  SET_LOCAL_OFFSET,
  LOAD_STATE,
  ADD_NEW_FRIEND,
} from "../appState/reducer";

const STORAGE_NAME = "youUp";

/**
 * @param {{ timeZones: { ZoneName: GMTOffsetMs }}} props
 */
export default function Home({ timeZones }) {
  const { state, dispatch } = useAppContext();
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const localOffsetMs = new Date().getTimezoneOffset() * 60 * 1000;
    const storedState = JSON.parse(localStorage.getItem(STORAGE_NAME));
    if (storedState) {
      dispatch({
        type: LOAD_STATE,
        payload: storedState,
      });
    }
    dispatch({
      type: SET_LOCAL_OFFSET,
      payload: { localOffset: localOffsetMs },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_NAME, JSON.stringify(state));
  }, [state]);

  const handleAddNewFriend = useCallback(
    (name, timezone) => {
      dispatch({
        type: ADD_NEW_FRIEND,
        payload: { name, timezone },
      });
      setShowForm(false);
    },
    [dispatch, setShowForm]
  );

  const handleCancel = useCallback(() => {
    setShowForm(false);
  }, [setShowForm]);

  const memoizedFriendForm = useMemo(
    () => (
      <NewFriendForm
        handleAddNewFriend={handleAddNewFriend}
        handleCancel={handleCancel}
      />
    ),
    [handleAddNewFriend, handleCancel]
  );

  const addButtonSizes = useBreakpointValue({ base: "sm", sm: 'md', md: "lg" });

  return (
    <TimezoneContext.Provider value={timeZones}>
      <Flex justifyContent={"center"}>
        <Flex flexDirection="column" w={"100%"} maxW={"1080px"}>
          <Head>
            <title>You Up?</title>
            <meta name="description" content="Check if your friends in different timezones are up." />
            <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>⏰</text></svg>" />
          </Head>
          <main>
            <HStack p={4} justifyContent='space-between'>
              <Heading size="lg">⏰ You Up?</Heading>
              <ColorModeToggle />
            </HStack>
            <HStack p={4} justifyContent={"flex-end"}>
              <Button
                size={addButtonSizes}
                onClick={() => setShowForm(true)}
                leftIcon={<AddIcon />}
              >
                New Friend
              </Button>
            </HStack>
            <ul>
              <VStack
                p={4}
                divider={<StackDivider borderColor="gray.200" />}
                spacing={4}
                align="stretch"
              >
                {state.friends.map((friend) => (
                  <Friend key={friend.id} friend={friend} />
                ))}
              </VStack>
            </ul>

            <Modal isOpen={showForm} size={"2xl"} onClose={handleCancel}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Add A New Friend</ModalHeader>
                <ModalCloseButton />
                {memoizedFriendForm}
              </ModalContent>
            </Modal>
          </main>
        </Flex>
      </Flex>
    </TimezoneContext.Provider>
  );
}

export async function getStaticProps() {
  /* API REFERENCE: https://timezonedb.com/references/list-time-zone */
  const key = process.env.TIMEZONE_API_KEY;
  const url = process.env.TIMEZONE_API_URL;
  const fields = "zoneName,gmtOffset";
  const req = await fetch(
    `https://${url}?format=json&fields=${fields}&key=${key}`
  );
  const data = await req.json();

  if (!data) {
    throw new Error("No data");
  }

  if (data && data.status === "FAILED") {
    return {
      props: {
        error: "Could not fetch timezone data",
      },
    };
  }

  const timeZones = new Map();
  data.zones.forEach((zone) => {
    const { zoneName, gmtOffset } = zone;
    // gmtOffset from API is current offset in seconds - convert it to ms.
    timeZones.set(zoneName, gmtOffset * 1000);
  });

  return {
    props: {
      timeZones: Object.fromEntries(timeZones),
    },
  };
}
