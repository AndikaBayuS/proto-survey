import { Avatar, Box, Card, CardBody, HStack, Text } from "@chakra-ui/react";

import { ProfileCardProps } from "@/src/global/interfaces";

const ProfileCard = ({ name, image, surveyCount }: ProfileCardProps) => {
  return (
    <Card direction={"row"} bgColor={"white"} rounded={"sm"}>
      <HStack>
        <Avatar src={image} name={name} />
        <Box>
          <Text>{name}</Text>
          <Text>Lv. 100</Text>
        </Box>
        <CardBody>
          <HStack>
            <Text>{surveyCount}</Text>
            <Text>Survei</Text>
          </HStack>
        </CardBody>
      </HStack>
    </Card>
  );
};

export default ProfileCard;
