import { Avatar, Box, Flex, HStack, Image, SimpleGrid, Text } from "@chakra-ui/react";

import CrownIcon from "@/components/icons/CrownIcon";

export default function LeaderboardCard({ user, points, index, level }) {
  const bgClass = index % 2 === 0 ? "blue.50" : "white";
  const crownColor = () => {
    switch (index) {
      case 0:
        return "yellow.500";
      case 1:
        return "gray.500";
      case 2:
        return "orange.800";
      default:
        return "gray.400";
    }
  };

  return (
    <Flex
      alignItems="center"
      bgColor={bgClass}
      gap={3}
      p={3}
      rounded="md"
      w="full"
    >
      <HStack>
        <Text fontSize="lg" fontWeight="semibold">
          {index + 1}.
        </Text>
        <Box position="relative">
          <Avatar src={String(user.image)} />
          <Box
            color={crownColor}
            fontSize="5xl"
            left={0}
            position={"absolute"}
            top={-8}
          >
            {index < 3 && <CrownIcon />}
          </Box>
        </Box>
        <Text>{user.name}</Text>
        <HStack>
          {user.badge.teknologi.map((badge, idx) => {
            const isAchieved = badge.achieved ? "block" : "none";
            return (
              <Image
                alt={badge.image}
                boxSize="30"
                display={isAchieved}
                key={idx}
                src={badge.image}
              />
            );
          })}
        </HStack>
      </HStack>
      <Box flex={1} />
      <SimpleGrid alignItems="center" columns={2} width="9.25rem">
        <Text align="left" fontSize="lg" fontWeight="semibold">
          Level {level}
        </Text>
        <Text align="right" fontSize="sm">
          {points} Poin
        </Text>
      </SimpleGrid>
    </Flex>
  );
}
