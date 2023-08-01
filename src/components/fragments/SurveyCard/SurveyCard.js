import { ChevronRightIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Card,
  CardBody,
  CardFooter,
  Circle,
  Divider,
  Flex,
  HStack,
  IconButton,
  Tag,
  Text,
  useDisclosure,
  VStack,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment } from "react";

import DeleteAlert from "@/components/fragments/DeleteAlert";
import ChartIcon from "@/components/icons/ChartIcon";
import IncognitoIcon from "@/components/icons/IncognitoIcon";
import { deleteSurvey } from "@/utils/fetch";
import { toTitleCase } from "@/utils/helper";

export default function SurveyCard({
  surveyId,
  ownerName,
  ownerImage,
  title,
  description,
  surveyMode,
  category,
  subCategory,
  isProfilePage = false,
}) {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const renderOwner = (() => {
    if (!isProfilePage) {
      return (
        <HStack>
          <Avatar size="xs" src={ownerImage} />
          <Text color="gray.600" fontSize="xs" noOfLines={1}>
            {ownerName}
          </Text>
        </HStack>
      );
    } else {
      return null;
    }
  })();
  const renderCardFooter = (() => {
    if (!isProfilePage) {
      return (
        <HStack spacing={0.1}>
          <Text color="messenger.500" fontWeight="semibold">
            Lakukan Survei
          </Text>
          <ChevronRightIcon
            color="messenger.500"
            fontSize="xl"
            fontWeight="semibold"
            pt={1}
          />
        </HStack>
      );
    } else {
      return (
        <HStack>
          <IconButton
            aria-label="Delete"
            icon={<DeleteIcon />}
            onClick={onOpen}
          />
          <IconButton
            aria-label="Edit"
            icon={<EditIcon />}
            onClick={() => {
              router.push(`/survey/edit/${surveyId}`);
            }}
          />
          <IconButton
            aria-label="Info"
            icon={<ChartIcon />}
            onClick={() => {
              router.push(`/survey/statistic/${surveyId}`);
            }}
          />
        </HStack>
      );
    }
  })();

  const handleDeleteSurvey = async (id) => {
    await deleteSurvey(id);
    router.reload();
  };

  return (
    <Fragment>
      <CardWrapper
        isProfilePage={isProfilePage}
        wrapper={(children) => (
          <Link href={`/survey/answer/${surveyId}`}>{children}</Link>
        )}
      >
        <Card
          _hover={{
            borderColor: "messenger.500",
          }}
          border="1px solid #E2E8F0"
          cursor="pointer"
          display="flex"
          maxWidth="sm"
          rounded="xl"
          shadow="sm"
          transition="all 0.2s ease-in-out"
        >
          <CardBody>
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
              <Wrap>
                <WrapItem>
                  <Tag
                    colorScheme="messenger"
                    fontSize="xs"
                    fontWeight="semibold"
                  >
                    {toTitleCase(category)}
                  </Tag>
                </WrapItem>
                {subCategory.map((item) => (
                  <WrapItem key={item}>
                    <Tag fontSize="xs" fontWeight="semibold">
                      {toTitleCase(item)}
                    </Tag>
                  </WrapItem>
                ))}
              </Wrap>
            </VStack>
          </CardBody>
          <Divider />
          <CardFooter>
            <VStack alignItems="start" spacing={3}>
              {renderOwner}
              {renderCardFooter}
            </VStack>
          </CardFooter>
        </Card>
      </CardWrapper>

      <DeleteAlert
        handleDelete={() => handleDeleteSurvey(surveyId)}
        isOpen={isOpen}
        onClose={onClose}
      />
    </Fragment>
  );
}

const CardWrapper = ({ children, isProfilePage, wrapper }) =>
  isProfilePage ? children : wrapper(children);
