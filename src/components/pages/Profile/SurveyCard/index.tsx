import { useRouter } from "next/router";
import { EditIcon, InfoOutlineIcon } from "@chakra-ui/icons";
import {
  Card,
  CardBody,
  CardFooter,
  HStack,
  IconButton,
  Text,
} from "@chakra-ui/react";

const SurveyCard = ({ title, description, surveyId }: any) => {
  const router = useRouter();
  return (
    <Card bgColor={"white"} rounded={"xl"} cursor={"default"} shadow={"sm"}>
      <CardBody>
        <Text size={"sm"} fontWeight={"semibold"}>
          {title}
        </Text>
        <Text noOfLines={2}>{description}</Text>
      </CardBody>
      <CardFooter justifyContent={"flex-end"} pt={0}>
        <HStack>
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
  );
};

export default SurveyCard;
