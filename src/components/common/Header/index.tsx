import Link from "next/link";
import { Box, Button, Container, HStack, Text } from "@chakra-ui/react";

const Header = () => {
  return (
    <Box
      bgColor={"white"}
      border={2}
      borderStyle={"dashed"}
      borderColor={"gray.300"}
      shadow={"sm"}
      p={3}
    >
      <Container maxWidth={"container.xl"}>
        <HStack justifyContent={"space-between"}>
          <Text fontSize={"xl"} fontWeight={"semibold"}>
            Survei
          </Text>
          <Link href="/survey/create">
            <Button colorScheme={"telegram"} size={"md"}>
              Buat Survei
            </Button>
          </Link>
        </HStack>
      </Container>
    </Box>
  );
};

export default Header;
