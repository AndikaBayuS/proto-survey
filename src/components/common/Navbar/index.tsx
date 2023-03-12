import NextLink from "next/link";
import { useRouter } from "next/router";
import { signIn, signOut, useSession } from "next-auth/react";
import {
  Avatar,
  Box,
  Button,
  Flex,
  HStack,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
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

  return (
    <Box bgColor={"white"} width={"full"}>
      <Flex
        justifyContent={"space-between"}
        alignItems={"center"}
        height={16}
        px={16}
      >
        <HStack spacing={4}>
          <NextLink href="/">
            <Text
              fontSize={"xl"}
              fontWeight={"semibold"}
              cursor={"pointer"}
              _hover={{ color: "telegram.500" }}
            >
              <Text as={"span"} color="telegram.500">
                Proto
              </Text>
              Survey
            </Text>
          </NextLink>
          {NavigationItem.map((item) => (
            <NextLink href={item.href} key={item.name}>
              <Link
                _hover={{ textDecoration: "none", color: "telegram.500" }}
                p={2}
                fontSize={"md"}
                fontWeight={"semibold"}
              >
                {item.name}
              </Link>
            </NextLink>
          ))}
        </HStack>

        {status === "authenticated" ? (
          <HStack backgroundColor={"gray.200"} px={2} py={1} rounded={"md"}>
            <Menu>
              <MenuButton>
                <HStack>
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
      </Flex>
    </Box>
  );
};

export default Navbar;
