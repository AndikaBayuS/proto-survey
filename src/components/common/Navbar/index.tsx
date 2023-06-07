import NextLink from "next/link";
import { useRouter } from "next/router";
import { signIn, signOut, useSession } from "next-auth/react";
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
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";

import { gamificationState } from "@/src/atoms/gamification";
import Stats from "@/src/components/common/Stats";
import { getGamificationData } from "@/src/utils/fetch";

import { navigationItem, validPathnames } from "./constants";

const Navbar = () => {
  const router = useRouter();
  const [showCreateButton, setShowCreateButton] = useState(false);
  const { isLoading, gamification } = useRecoilValue(gamificationState);
  const setGamificationState = useSetRecoilState(gamificationState);

  const { data: session, status } = useSession();

  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
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
  }, [setGamificationState]);

  useEffect(() => {
    setShowCreateButton(validPathnames.includes(router.pathname));
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
          {navigationItem.map((item) => (
            <Button
              key={item.name}
              display={{ base: "none", md: "inline-flex" }}
              fontSize="md"
              fontWeight="semibold"
              p={2}
              variant="ghost"
              _hover={{
                textDecoration: "none",
                color: "messenger.500",
                backgroundColor: "blue.50",
              }}
              onClick={() => router.push(item.href)}
            >
              {item.name}
            </Button>
          ))}
        </HStack>

        {status === "authenticated" ? (
          <HStack
            backgroundColor="gray.100"
            border="1px solid #EDF2F7"
            display={{ base: "none", md: "inline-flex" }}
            px={2}
            py={1.5}
            rounded="md"
            transition="all 0.2s ease-in-out"
            _hover={{
              borderColor: "messenger.500",
            }}
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
                  <Avatar size="sm" src={session?.user?.image!} />
                  <Stats
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
                <MenuItem onClick={() => signOut()}>Keluar</MenuItem>
              </MenuList>
            </Menu>
          </HStack>
        ) : (
          <Button
            colorScheme="messenger"
            display={{ base: "none", md: "inline-flex" }}
            size="md"
            onClick={(e) => {
              e.preventDefault();
              signIn("google", {
                callbackUrl: "/",
              });
            }}
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
    </Box>
  );
};

const MobileNavbar = ({ isOpen, onClose }: any) => {
  const { isLoading, gamification } = useRecoilValue(gamificationState);
  const { data: session, status } = useSession();
  const router = useRouter();

  return (
    <Drawer isOpen={isOpen} size="full" onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Menu</DrawerHeader>
        <DrawerBody>
          {status === "authenticated" ? (
            <HStack bgColor="gray.100" p={2} rounded="md" spacing={3}>
              <Avatar
                name={session?.user?.name!}
                size="sm"
                src={session?.user?.image!}
              />
              <Stats
                experience={gamification?.points}
                isLoading={isLoading}
                level={gamification.level}
                maxPoints={gamification?.maxPoints}
                minPoints={gamification?.minPoints}
              />
            </HStack>
          ) : (
            <Button
              colorScheme="messenger"
              size="md"
              width="full"
              onClick={(e) => {
                e.preventDefault();
                signIn("google", {
                  callbackUrl: "/",
                });
              }}
            >
              Masuk
            </Button>
          )}

          <VStack alignItems="flex-start" mt={5}>
            {navigationItem.map((item) => (
              <Button
                key={item.name}
                justifyContent="start"
                variant="ghost"
                width="full"
                onClick={() => {
                  router.push(item.href);
                  onClose();
                }}
              >
                {item.name}
              </Button>
            ))}
          </VStack>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default Navbar;
