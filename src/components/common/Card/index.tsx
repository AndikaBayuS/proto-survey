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
        bgColor="white"
        border="1px solid #E2E8F0"
        cursor="pointer"
        maxWidth="sm"
        p={4}
        rounded="xl"
        shadow="sm"
        transition="all 0.2s ease-in-out"
        _hover={{
          borderColor: "messenger.500",
        }}
      >
        <VStack alignItems="start" spacing={3.5}>
          <Flex justifyContent="space-between" w="full">
            <Text fontWeight="semibold" noOfLines={1} size="sm">
              {title}
            </Text>
            {surveyMode === "anonim" && (
              <Circle bg="messenger.50" p={1} size="25px">
                <IncognitoIcon />
              </Circle>
            )}
          </Flex>
          <Text noOfLines={2}>{description}</Text>
          <HStack>
            <Avatar size="xs" src={String(ownerImage)} />
            <Text color="gray.600" fontSize="xs" noOfLines={1}>
              {String(ownerName)}
            </Text>
          </HStack>

          <HStack spacing={0.1}>
            <Text color="messenger.500" fontWeight="semibold">
              Lihat Survei
            </Text>
            <ChevronRightIcon
              color="messenger.500"
              fontSize="xl"
              fontWeight="semibold"
              pt={1}
            />
          </HStack>
        </VStack>
      </Box>
    </Link>
  );
};

export default Card;
