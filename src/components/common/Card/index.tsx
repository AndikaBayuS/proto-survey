import Link from "next/link";
import { Box, Button, Text, VStack } from "@chakra-ui/react";

import { CardProps } from "./card.interface";

const Card: React.FC<CardProps> = ({ surveyId, owner, title, description }) => {
  return (
    <Link href={`/survey/${surveyId}`}>
      <Box
        maxWidth={"sm"}
        rounded={"xl"}
        bgColor={"white"}
        shadow={"sm"}
        p={4}
      >
        <VStack spacing={3} alignItems={"start"}>
          <Text size={"sm"} fontWeight={"semibold"}>
            {title}
          </Text>
          <Text fontSize={"xs"} color={"gray.600"}>
            {owner}
          </Text>
          <Text>{description}</Text>
          <Button colorScheme={"telegram"} variant={"outline"}>Mulai Survei</Button>
        </VStack>
      </Box>
    </Link>
  );
};

export default Card;
