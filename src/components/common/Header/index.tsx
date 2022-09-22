import { Box, Button, Container, HStack, Text } from "@chakra-ui/react";
import Link from "next/link";

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
          <Text>Survei</Text>
          <Link href="/survey/create">
            <Button colorScheme={"telegram"} size={"sm"}>
              Buat Survei
            </Button>
          </Link>
        </HStack>
      </Container>
    </Box>
  );
};

export default Header;
