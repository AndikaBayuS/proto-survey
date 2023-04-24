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

const NavigationItem = [
  { name: "Survei", href: "/" },
  { name: "Peringkat", href: "/leaderboard" },
];

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
    if (router.pathname === "/") {
      setShowCreateButton(true);
    }
  }, [router.pathname]);

  return (
    <Box bgColor={"white"} width={"full"}>
      <Flex
        justifyContent={"space-between"}
        alignItems={"center"}
        height={20}
        px={{ base: 4, md: 8, lg: 16 }}
      >
        <HStack spacing={4} alignItems={"center"}>
          <NextLink href="/">
            <Box p={2} rounded="md" _hover={{ backgroundColor: "blue.50" }}>
              <Text fontSize={"xl"} fontWeight={"semibold"} cursor={"pointer"}>
                <Text as={"span"} color="telegram.500">
                  Proto
                </Text>
                Survey
              </Text>
            </Box>
          </NextLink>
          {NavigationItem.map((item) => (
            <Button
              key={item.name}
              _hover={{
                textDecoration: "none",
                color: "telegram.500",
                backgroundColor: "blue.50",
              }}
              p={2}
              fontSize={"md"}
              fontWeight={"semibold"}
              variant={"ghost"}
              display={{ base: "none", md: "inline-flex" }}
              onClick={() => router.push(item.href)}
            >
              {item.name}
            </Button>
          ))}
        </HStack>

        {status === "authenticated" ? (
          <HStack
            backgroundColor={"gray.100"}
            px={2}
            py={1.5}
            rounded={"md"}
            display={{ base: "none", md: "inline-flex" }}
            border={"1px solid #EDF2F7"}
            transition={"all 0.2s ease-in-out"}
            _hover={{
              borderColor: "blue.500",
            }}
          >
            {showCreateButton && (
              <Button
                colorScheme={"blue"}
                onClick={() => router.push("/survey/create")}
              >
                Buat Survei
              </Button>
            )}
            <Menu>
              <MenuButton>
                <HStack spacing={3}>
                  <Avatar size={"sm"} src={session?.user?.image!} />
                  <Stats
                    level={gamification.level}
                    experience={gamification.points}
                    isLoading={isLoading}
                    maxPoints={gamification.maxPoints}
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
            colorScheme="telegram"
            display={{ base: "none", md: "inline-flex" }}
            size={"md"}
            onClick={() =>
              signIn("google", { callbackUrl: "http://localhost:3000" })
            }
          >
            Masuk
          </Button>
        )}

        <IconButton
          display={{ base: "inline-flex", md: "none" }}
          icon={<HamburgerIcon />}
          aria-label="HamburgerIcon"
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
    <Drawer onClose={onClose} isOpen={isOpen} size={"full"}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Menu</DrawerHeader>
        <DrawerBody>
          {status === "authenticated" ? (
            <HStack rounded={"md"} bgColor={"gray.100"} p={2} spacing={3}>
              <Avatar
                src={session?.user?.image!}
                name={session?.user?.name!}
                size={"sm"}
              />
              <Stats
                level={gamification.level}
                isLoading={isLoading}
                experience={gamification?.points}
                maxPoints={gamification?.maxPoints}
              />
            </HStack>
          ) : (
            <Button
              colorScheme="telegram"
              size={"md"}
              width={"full"}
              onClick={() =>
                signIn("google", { callbackUrl: "http://localhost:3000" })
              }
            >
              Masuk
            </Button>
          )}

          <VStack alignItems={"flex-start"} mt={5}>
            {NavigationItem.map((item) => (
              <Button
                key={item.name}
                variant={"ghost"}
                width={"full"}
                justifyContent={"start"}
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
