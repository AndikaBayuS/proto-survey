import { Box, Text, VStack } from "@chakra-ui/react";

export default function TextCard({ labels, title }) {
  return (
    <Box backgroundColor="white" p={5} rounded="md" w="full">
      <Text fontWeight="semibold" mb={5}>
        {title}
      </Text>
      <VStack alignItems="start" maxHeight="12.75rem" overflowX="auto">
        {labels.map((item, index) => (
          <Box
            backgroundColor="blue.50"
            key={index}
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
}
