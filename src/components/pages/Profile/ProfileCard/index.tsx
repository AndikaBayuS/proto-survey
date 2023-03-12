import { Avatar, Box, Card, CardBody, HStack, Text } from "@chakra-ui/react";

const ProfileCard = ({ name, email, image, surveyCount }: any) => {
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
