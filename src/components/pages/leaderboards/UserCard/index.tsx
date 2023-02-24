import { Avatar, Flex, Text } from "@chakra-ui/react";

import { UserCardProps } from "@/src/interfaces/usercard.interface";

export default function UserCard({ user, points, index }: UserCardProps) {
  const bgClass = index % 2 === 0 ? "blue.50" : "white";

  return (
    <Flex
      alignItems="center"
      p={3}
      bgColor={bgClass}
      rounded={"md"}
      w={"full"}
      gap={3}
    >
      <Text fontWeight={"semibold"} fontSize={"lg"}>
        {index + 1}.
      </Text>
      <Avatar src={String(user.image)} />
      <Text>{user.name}</Text>
      <Text align={"right"} flex={1} fontSize={"lg"} fontWeight={"semibold"}>
        {points}
      </Text>
      <Text>Poin</Text>
    </Flex>
  );
}
