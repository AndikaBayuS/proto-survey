import NextLink from "next/link";
import { useRouter } from "next/router";
import { signIn, signOut, useSession } from "next-auth/react";
import {
  Avatar,
  Box,
  Button,
  Container,
  Flex,
  HStack,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";

import Stats from "@/src/components/common/Stats";

const NavigationItem = [
  { name: "Surveys", href: "/" },
  { name: "Leaderboard", href: "/leaderboard" },
];

const Navbar = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  return (
    <Box bgColor={"white"}>
      <Container maxWidth={"container.xl"}>
        <Flex
          justifyContent={"space-between"}
          alignItems={"center"}
          height={16}
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
                    <Stats level={1} experience={80} />
                  </HStack>
                </MenuButton>
                <MenuList>
                  <MenuItem onClick={() => router.push("/survey/create")}>
                    Buat Survey
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
      </Container>
    </Box>
  );
};

export default Navbar;
