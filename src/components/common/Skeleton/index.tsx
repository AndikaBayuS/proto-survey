import { Center, Flex, Spinner, Text } from "@chakra-ui/react";

const Skeleton = () => {
  return (
    <Center>
      <Flex
        alignItems={"center"}
        flexDirection={"column"}
        gap={5}
        justifyContent={"center"}
      >
        <Spinner
          color={"messenger.500"}
          justifyContent={"center"}
          size={"lg"}
        />
        <Text textAlign={"center"}>Memuat Data</Text>
      </Flex>
    </Center>
  );
};

export default Skeleton;
