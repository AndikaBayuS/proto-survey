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

import Stats from "@/src/components/common/Stats";
import { getGamificationData } from "@/src/utils/fetch";

const NavigationItem = [
  { name: "Survei", href: "/" },
  { name: "Peringkat", href: "/leaderboard" },
];

const Navbar = () => {
  const [gamification, setGamification] = useState({
    level: 0,
    points: 0,
  });
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    getGamificationData().then((res) => {
      setGamification(res.data);
    });
  }, []);

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box bgColor={"white"} width={"full"}>
      <Flex
        justifyContent={"space-between"}
        alignItems={"center"}
        height={20}
        px={16}
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
          >
            <Menu>
              <MenuButton>
                <HStack spacing={3}>
                  <Avatar size={"sm"} src={session?.user?.image!} />
                  <Stats
                    level={gamification?.level}
                    experience={gamification.points}
                  />
                </HStack>
              </MenuButton>
              <MenuList>
                <MenuItem onClick={() => router.push("/survey/create")}>
                  Buat Survey
                </MenuItem>
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
  const { data: session, status } = useSession();
  const router = useRouter();
  const [gamification, setGamification] = useState({
    level: 0,
    points: 0,
  });

  useEffect(() => {
    getGamificationData().then((res) => {
      setGamification(res.data);
    });
  }, []);

  return (
    <Drawer onClose={onClose} isOpen={isOpen} size={"full"}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Menu</DrawerHeader>
        <DrawerBody>
          <HStack rounded={"md"} bgColor={"gray.100"} p={2} spacing={3}>
            <Avatar
              src={session?.user?.image!}
              name={session?.user?.name!}
              size={"sm"}
            />
            <Stats
              level={gamification.level}
              experience={gamification.points}
            />
          </HStack>

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
