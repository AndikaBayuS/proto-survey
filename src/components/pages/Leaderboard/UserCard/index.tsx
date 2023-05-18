import { Avatar, Flex, Text } from "@chakra-ui/react";

import { UserCardProps } from "@/src/global/interfaces";

export default function UserCard({ user, points, index }: UserCardProps) {
  const bgClass = index % 2 === 0 ? "blue.50" : "white";

  return (
    <Flex
      alignItems="center"
      bgColor={bgClass}
      gap={3}
      p={3}
      rounded={"md"}
      w={"full"}
    >
      <Text fontSize={"lg"} fontWeight={"semibold"}>
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
