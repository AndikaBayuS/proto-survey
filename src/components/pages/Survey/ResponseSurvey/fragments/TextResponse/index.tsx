import { Box, Text, VStack } from "@chakra-ui/react";

interface ChartProps {
  labels: string[];
  title: string;
}
const TextResponse: React.FC<ChartProps> = ({ labels, title }) => {
  return (
    <Box backgroundColor={"white"} rounded={"md"} p={5} w={"full"}>
      <Text mb={5} fontWeight={"semibold"}>
        {title}
      </Text>
      <VStack alignItems={"start"}>
        {labels.map((item, index) => (
          <Box
            backgroundColor={"blue.100"}
            w={"full"}
            p={3}
            rounded={"md"}
            key={index}
          >
            <Text fontWeight={"semibold"}>{item}</Text>
          </Box>
        ))}
      </VStack>
    </Box>
  );
};

export default TextResponse;
