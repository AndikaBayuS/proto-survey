import Link from "next/link";
import { ChevronRightIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  Circle,
  Divider,
  Flex,
  HStack,
  Tag,
  Text,
  VStack,
} from "@chakra-ui/react";

import IncognitoIcon from "@/src/components/icons/IncognitoIcon";
import { CardProps } from "@/src/global/interfaces";
import { toTitleCase } from "@/src/utils/helper";

const Card: React.FC<CardProps> = ({
  surveyId,
  ownerName,
  ownerImage,
  title,
  description,
  surveyMode,
  category,
  subCategory,
}) => {
  return (
    <Link href={`/survey/${surveyId}`}>
      <Box
        bgColor="white"
        border="1px solid #E2E8F0"
        cursor="pointer"
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        maxWidth="sm"
        p={4}
        position="relative"
        rounded="xl"
        shadow="sm"
        transition="all 0.2s ease-in-out"
        _hover={{
          borderColor: "messenger.500",
        }}
      >
        <VStack alignItems="start" spacing={2}>
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
          <Text noOfLines={1}>{description}</Text>
        </VStack>
        <Divider my={2} />
        <VStack alignItems="start" spacing={2}>
          {category && (
            <HStack spacing={1}>
              {category.map((item) => (
                <Tag
                  key={item}
                  colorScheme="messenger"
                  fontSize="xs"
                  fontWeight="semibold"
                >
                  # {toTitleCase(item)}
                </Tag>
              ))}
              {subCategory.map((item) => (
                <Tag
                  key={item}
                  fontSize="xs"
                  fontWeight="semibold"
                >
                  # {toTitleCase(item)}
                </Tag>
              ))}
            </HStack>
          )}
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
