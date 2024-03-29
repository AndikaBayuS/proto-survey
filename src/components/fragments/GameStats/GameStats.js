import { Box, Center, Progress, Spinner, Text, VStack } from "@chakra-ui/react";

export default function GameStats({
  experience,
  level,
  maxPoints,
  minPoints,
  isLoading,
}) {
  if (isLoading) {
    return (
      <Center>
        <Spinner />
      </Center>
    );
  }

  return (
    <Box width="5rem">
      <VStack alignItems="flex-start">
        <Text fontWeight="semibold">Lv. {level}</Text>
        <Progress
          backgroundColor="gray.300"
          max={maxPoints}
          min={minPoints}
          rounded="md"
          size="sm"
          value={experience}
          width="full"
        />
      </VStack>
    </Box>
  );
}
