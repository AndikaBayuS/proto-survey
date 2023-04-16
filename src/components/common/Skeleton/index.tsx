import { Center, Flex, Spinner, Text } from "@chakra-ui/react";

import PageBase from "../../layouts/PageBase";

const Skeleton = () => {
  return (
    <PageBase>
      <Center>
        <Flex
          flexDirection={"column"}
          justifyContent={"center"}
          alignItems={"center"}
          gap={5}
        >
          <Spinner color={"blue.500"} size={"lg"} justifyContent={"center"} />
          <Text textAlign={"center"}>Memuat Data</Text>
        </Flex>
      </Center>
    </PageBase>
  );
};

export default Skeleton;
