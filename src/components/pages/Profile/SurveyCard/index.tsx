import { useRouter } from "next/router";
import { DeleteIcon, EditIcon, InfoOutlineIcon } from "@chakra-ui/icons";
import {
  Card,
  CardBody,
  CardFooter,
  HStack,
  IconButton,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { Fragment } from "react";

import { SurveyCardProps } from "@/src/global/interfaces";
import { deleteSurvey } from "@/src/utils/fetch";

import DeleteAlert from "./DeleteAlert";

const SurveyCard = ({ title, description, surveyId }: SurveyCardProps) => {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleDeleteSurvey = async (id: string) => {
    await deleteSurvey(id);
    router.reload();
  };

  return (
    <Fragment>
      <Card
        bgColor={"white"}
        rounded={"xl"}
        cursor={"default"}
        shadow={"sm"}
        variant={"outline"}
      >
        <CardBody>
          <Text size={"sm"} fontWeight={"semibold"}>
            {title}
          </Text>
          <Text noOfLines={2}>{description}</Text>
        </CardBody>
        <CardFooter pt={0}>
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
              icon={<InfoOutlineIcon />}
              onClick={() => {
                router.push(`/survey/response/${surveyId}`);
              }}
            />
          </HStack>
        </CardFooter>
      </Card>

      <DeleteAlert
        isOpen={isOpen}
        onClose={onClose}
        handleDelete={() => handleDeleteSurvey(surveyId)}
      />
    </Fragment>
  );
};

export default SurveyCard;
