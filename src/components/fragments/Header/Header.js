import { HamburgerIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { signIn, signOut, useSession } from "next-auth/react";
import { Fragment, useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";

import { gamificationState } from "@/atoms/gamification";
import { getGamificationData } from "@/utils/fetch";

import GameStats from "../GameStats";
import { NAVIGATION_ITEMS, VALID_PATHNAMES } from "./constants";

export default function Header() {
  const router = useRouter();
  const [showCreateButton, setShowCreateButton] = useState(false);
  const { isLoading, gamification } = useRecoilValue(gamificationState);
  const setGamificationState = useSetRecoilState(gamificationState);

  const { data: session, status } = useSession();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isModalOpen,
    onOpen: onModalOpen,
    onClose: onModalClose,
  } = useDisclosure();

  useEffect(() => {
    if (session) {
      getGamificationData()
        .then((res) => {
          setGamificationState((prev) => ({
            ...prev,
            gamification: res.data,
          }));
        })
        .then(() => {
          setGamificationState((prev) => ({
            ...prev,
            isLoading: false,
          }));
        });
    }
  }, [session, setGamificationState]);

  useEffect(() => {
    setShowCreateButton(VALID_PATHNAMES.includes(router.pathname));
  }, [router.pathname]);

  return (
    <Box bgColor="white" width="full">
      <Flex
        alignItems="center"
        height={20}
        justifyContent="space-between"
        px={{ base: 4, md: 8, lg: 16 }}
      >
        <HStack alignItems="center" spacing={4}>
          <NextLink href="/">
            <Box _hover={{ backgroundColor: "blue.50" }} p={2} rounded="md">
              <Text cursor="pointer" fontSize="xl" fontWeight="semibold">
                <Text as="span" color="messenger.500">
                  Proto
                </Text>
                Survey
              </Text>
            </Box>
          </NextLink>
          {NAVIGATION_ITEMS.map((item) => (
            <Button
              _hover={{
                textDecoration: "none",
                color: "messenger.500",
                backgroundColor: "blue.50",
              }}
              display={{ base: "none", md: "inline-flex" }}
              fontSize="md"
              fontWeight="semibold"
              key={item.name}
              onClick={() => router.push(item.href)}
              p={2}
              variant="ghost"
            >
              {item.name}
            </Button>
          ))}
        </HStack>

        {status === "authenticated" ? (
          <HStack
            _hover={{
              borderColor: "messenger.500",
            }}
            backgroundColor="gray.100"
            border="1px solid #EDF2F7"
            display={{ base: "none", md: "inline-flex" }}
            px={2}
            py={1.5}
            rounded="md"
            transition="all 0.2s ease-in-out"
          >
            {showCreateButton && (
              <Button
                colorScheme="messenger"
                onClick={() => router.push("/survey/create")}
              >
                Buat Survei
              </Button>
            )}
            <Menu>
              <MenuButton>
                <HStack spacing={3}>
                  <Avatar size="sm" src={session?.user?.image} />
                  <GameStats
                    experience={gamification?.points}
                    isLoading={isLoading}
                    level={gamification?.level}
                    maxPoints={gamification?.maxPoints}
                    minPoints={gamification?.minPoints}
                  />
                </HStack>
              </MenuButton>
              <MenuList>
                <MenuItem onClick={() => router.push("/profile")}>
                  Profil
                </MenuItem>
                <MenuItem color="red.500" onClick={onModalOpen}>
                  Keluar
                </MenuItem>
              </MenuList>
            </Menu>
          </HStack>
        ) : (
          <Button
            colorScheme="messenger"
            display={{ base: "none", md: "inline-flex" }}
            onClick={(e) => {
              e.preventDefault();
              signIn("google", { callbackUrl: "/" });
            }}
            size="md"
          >
            Masuk
          </Button>
        )}

        <IconButton
          aria-label="HamburgerIcon"
          display={{ base: "inline-flex", md: "none" }}
          icon={<HamburgerIcon />}
          onClick={onOpen}
        />

        <MobileNavbar isOpen={isOpen} onClose={onClose} />
      </Flex>

      <ModalLogout isOpen={isModalOpen} onClose={onModalClose} />
    </Box>
  );
}

function MobileNavbar({ isOpen, onClose }) {
  const { isLoading, gamification } = useRecoilValue(gamificationState);
  const { data: session, status } = useSession();
  const router = useRouter();
  const {
    isOpen: isModalOpen,
    onOpen: onModalOpen,
    onClose: onModalClose,
  } = useDisclosure();

  return (
    <Fragment>
      <Drawer isOpen={isOpen} onClose={onClose} size="full">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Menu</DrawerHeader>
          <DrawerBody>
            {status === "authenticated" ? (
              <HStack bgColor="gray.100" p={2} rounded="md" spacing={3}>
                <Avatar
                  name={session?.user?.name}
                  size="sm"
                  src={session?.user?.image}
                />
                <GameStats
                  experience={gamification?.points}
                  isLoading={isLoading}
                  level={gamification?.level}
                  maxPoints={gamification?.maxPoints}
                  minPoints={gamification?.minPoints}
                />
              </HStack>
            ) : (
              <Button
                colorScheme="messenger"
                onClick={(e) => {
                  e.preventDefault();
                  signIn("google", { callbackUrl: "/" });
                }}
                size="md"
                width="full"
              >
                Masuk
              </Button>
            )}

            <VStack alignItems="flex-start" mt={5}>
              {NAVIGATION_ITEMS.map((item) => (
                <Button
                  justifyContent="start"
                  key={item.name}
                  onClick={() => {
                    router.push(item.href);
                    onClose();
                  }}
                  variant="ghost"
                  width="full"
                >
                  {item.name}
                </Button>
              ))}
              {status === "authenticated" && (
                <Fragment>
                  <Button
                    color="red.500"
                    justifyContent="start"
                    onClick={onModalOpen}
                    variant="ghost"
                    width="full"
                  >
                    Keluar
                  </Button>
                  <Button
                    colorScheme="messenger"
                    onClick={() => {
                      router.push("/survey/create");
                      onClose();
                    }}
                    size="md"
                    width="full"
                  >
                    Buat Survei
                  </Button>
                </Fragment>
              )}
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
      <ModalLogout isOpen={isModalOpen} onClose={onModalClose} />
    </Fragment>
  );
}

function ModalLogout({ isOpen, onClose }) {
  return (
    <Modal isCentered isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Keluar</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>Apakah anda yakin ingin keluar?</Text>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="gray" onClick={onClose} variant="outline">
            Batal
          </Button>
          <Button colorScheme="red" ml={3} onClick={() => signOut()}>
            Keluar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
