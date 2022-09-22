import { Box, Button, Heading, Text, VStack } from "@chakra-ui/react";
import Link from "next/link";

interface Props {
  surveyId: string;
  owner: string;
  title: string;
  description: string;
}

const Card: React.FC<Props> = ({ surveyId, owner, title, description }) => {
  return (
    <Link href={`/survey/${surveyId}`}>
      <Box
        maxWidth={"sm"}
        rounded={"xl"}
        border={1}
        borderStyle={"solid"}
        borderColor={"gray.300"}
        bgColor={"white"}
        shadow={"sm"}
        p={4}
      >
        <VStack spacing={3} alignItems={"start"}>
          <Heading size={"sm"}>{title}</Heading>
          <Text fontSize={"xs"} color={"gray.600"}>
            {owner}
          </Text>
          <Text>{description}</Text>
          <Button colorScheme={"telegram"}>Mulai Survei</Button>
        </VStack>
      </Box>
    </Link>
  );
};

export default Card;
