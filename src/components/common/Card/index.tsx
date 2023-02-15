import Link from "next/link";
import { Avatar, Box, HStack, Text, VStack } from "@chakra-ui/react";

import { CardProps } from "./card.interface";

const Card: React.FC<CardProps> = ({
  surveyId,
  ownerName,
  ownerImage,
  title,
  description,
}) => {
  return (
    <Link href={`/survey/${surveyId}`}>
      <Box
        maxWidth={"sm"}
        rounded={"xl"}
        bgColor={"white"}
        shadow={"sm"}
        p={4}
        cursor={"pointer"}
      >
        <VStack spacing={3} alignItems={"start"}>
          <Text size={"sm"} fontWeight={"semibold"} noOfLines={1}>
            {title}
          </Text>
          <HStack>
            <Avatar size={"xs"} src={String(ownerImage)} />
            <Text fontSize={"xs"} color={"gray.600"}>
              {String(ownerName)}
            </Text>
          </HStack>
          <Text noOfLines={2}>{description}</Text>
        </VStack>
      </Box>
    </Link>
  );
};

export default Card;
