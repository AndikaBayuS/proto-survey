import { Avatar, Box, Flex, Text } from "@chakra-ui/react";

import CrownIcon from "@/components/icons/CrownIcon";

export default function LeaderboardCard({ user, points, index }) {
  const bgClass = index % 2 === 0 ? "blue.50" : "white";
  const crownColor = (() => {
    switch (index) {
      case 0:
        return "yellow.500";
      case 1:
        return "gray.500";
      case 2:
        return "orange.800";
      default:
        return "gray.400";
    };
  })
  return (
    <Flex
      alignItems="center"
      bgColor={bgClass}
      gap={3}
      p={3}
      rounded="md"
      w="full"
    >
      <Text fontSize="lg" fontWeight="semibold">
        {index + 1}.
      </Text>
      <Box position="relative">
        <Avatar src={String(user.image)} />
        <Box color={crownColor} fontSize="5xl" left={0} position={"absolute"} top={-8}>
        {index < 3 && <CrownIcon />}
        </Box>
      </Box>
      <Text>{user.name}</Text>
      <Text align="right" flex={1} fontSize="lg" fontWeight="semibold">
        {points}
      </Text>
      <Text>Poin</Text>
    </Flex>
  );
}
