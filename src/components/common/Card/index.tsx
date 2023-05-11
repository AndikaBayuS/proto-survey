import Link from "next/link";
import { ChevronRightIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  Circle,
  Flex,
  HStack,
  Text,
  VStack,
} from "@chakra-ui/react";

import IncognitoIcon from "@/src/components/icons/IncognitoIcon";
import { CardProps } from "@/src/global/interfaces";

const Card: React.FC<CardProps> = ({
  surveyId,
  ownerName,
  ownerImage,
  title,
  description,
  surveyMode,
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
          borderColor: "messenger.500",
        }}
      >
        <VStack spacing={3.5} alignItems={"start"}>
          <Flex justifyContent={"space-between"} w={"full"}>
            <Text size={"sm"} fontWeight={"semibold"} noOfLines={1}>
              {title}
            </Text>
            {surveyMode === "anonim" && (
              <Circle size={"25px"} bg={"messenger.50"} p={1}>
                <IncognitoIcon />
              </Circle>
            )}
          </Flex>
          <Text noOfLines={2}>{description}</Text>
          <HStack>
            <Avatar size={"xs"} src={String(ownerImage)} />
            <Text fontSize={"xs"} color={"gray.600"} noOfLines={1}>
              {String(ownerName)}
            </Text>
          </HStack>

          <HStack spacing={0.1}>
            <Text color={"messenger.500"} fontWeight={"semibold"}>
              Lihat Survei
            </Text>
            <ChevronRightIcon
              pt={1}
              color={"messenger.500"}
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
