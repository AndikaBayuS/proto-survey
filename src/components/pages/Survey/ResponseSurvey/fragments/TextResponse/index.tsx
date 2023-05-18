import { Box, Text, VStack } from "@chakra-ui/react";

interface ChartProps {
  labels: string[];
  title: string;
}
const TextResponse: React.FC<ChartProps> = ({ labels, title }) => {
  return (
    <Box backgroundColor="white" p={5} rounded="md" w="full">
      <Text fontWeight="semibold" mb={5}>
        {title}
      </Text>
      <VStack alignItems="start">
        {labels.map((item, index) => (
          <Box
            key={index}
            backgroundColor="blue.50"
            p={3}
            rounded="md"
            w="full"
          >
            <Text fontWeight="semibold">{item}</Text>
          </Box>
        ))}
      </VStack>
    </Box>
  );
};

export default TextResponse;
