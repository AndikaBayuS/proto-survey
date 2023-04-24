import Link from "next/link";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { Avatar, Box, HStack, Text, VStack } from "@chakra-ui/react";

import { CardProps } from "@/src/global/interfaces";

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
        border={"1px solid #E2E8F0"}
        transition={"all 0.2s ease-in-out"}
        _hover={{
          borderColor: "blue.500",
        }}
      >
        <VStack spacing={3.5} alignItems={"start"}>
          <Text size={"sm"} fontWeight={"semibold"} noOfLines={1}>
            {title}
          </Text>
          <Text noOfLines={2}>{description}</Text>
          <HStack>
            <Avatar size={"xs"} src={String(ownerImage)} />
            <Text fontSize={"xs"} color={"gray.600"} noOfLines={1}>
              {String(ownerName)}
            </Text>
          </HStack>

          <HStack spacing={0.1}>
            <Text color={"blue.500"} fontWeight={"semibold"}>
              Lihat Survei
            </Text>
            <ChevronRightIcon
              pt={1}
              color={"blue.500"}
              fontWeight={"semibold"}
              fontSize={"xl"}
            />
          </HStack>
        </VStack>
      </Box>
    </Link>
  );
};

export default Card;
