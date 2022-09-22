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
import { signIn, signOut, useSession } from "next-auth/react";
import NextLink from "next/link";

const NavigationItem = [
  { name: "Surveys", href: "/" },
  { name: "Leaderboard", href: "/leaderboard" },
];

const Navbar = () => {
  const { data: session, status } = useSession();
  return (
    <Box bgColor={"white"}>
      <Container maxWidth={"container.xl"}>
        <Flex
          justifyContent={"space-between"}
          alignItems={"center"}
          height={16}
        >
          <NextLink href="/">
            <Text fontSize={"xl"} fontWeight={"semibold"} cursor={"pointer"}>
              <Text as={"span"} color="telegram.500">
                Proto
              </Text>
              Survey
            </Text>
          </NextLink>

          <HStack>
            {NavigationItem.map((item) => (
              <NextLink href={item.href} key={item.name}>
                <Link _hover={{ textDecoration: "none" }} p={2}>
                  {item.name}
                </Link>
              </NextLink>
            ))}

            {status === "authenticated" ? (
              <Menu>
                <MenuButton>
                  <Avatar size={"sm"} src={session?.user?.image!} />
                </MenuButton>
                <MenuList>
                  <MenuItem onClick={() => signOut()}>Keluar</MenuItem>
                </MenuList>
              </Menu>
            ) : (
              <Button
                colorScheme="telegram"
                size={"sm"}
                onClick={() =>
                  signIn("google", { callbackUrl: "http://localhost:3000" })
                }
              >
                Masuk
              </Button>
            )}
          </HStack>
        </Flex>
      </Container>
    </Box>
  );
};

export default Navbar;
