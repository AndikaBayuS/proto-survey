import { Center, Flex, Spinner, Text } from "@chakra-ui/react";

const Skeleton = () => {
  return (
    <Center>
      <Flex
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        gap={5}
      >
        <Spinner
          color={"messenger.500"}
          size={"lg"}
          justifyContent={"center"}
        />
        <Text textAlign={"center"}>Memuat Data</Text>
      </Flex>
    </Center>
  );
};

export default Skeleton;
