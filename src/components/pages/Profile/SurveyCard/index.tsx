import { useRouter } from "next/router";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
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

import ChartIcon from "@/src/components/icons/ChartIcon/ChartIcon";
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
        cursor={"default"}
        rounded={"xl"}
        shadow={"sm"}
        variant={"outline"}
      >
        <CardBody>
          <Text fontWeight={"semibold"} size={"sm"}>
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
              icon={<ChartIcon />}
              onClick={() => {
                router.push(`/survey/response/${surveyId}`);
              }}
            />
          </HStack>
        </CardFooter>
      </Card>

      <DeleteAlert
        handleDelete={() => handleDeleteSurvey(surveyId)}
        isOpen={isOpen}
        onClose={onClose}
      />
    </Fragment>
  );
};

export default SurveyCard;
