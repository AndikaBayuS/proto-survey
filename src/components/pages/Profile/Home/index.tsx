import { Box, SimpleGrid, Text } from "@chakra-ui/react";

import { ProfileProps } from "@/src/global/interfaces";

import ProfileCard from "../ProfileCard";
import SurveyCard from "../SurveyCard";

const Profile = ({ userData }: ProfileProps) => {
  const surveyCount = userData.surveys.length;
  return (
    <Box>
      <ProfileCard
        image={userData.image}
        name={userData.name}
        surveyCount={surveyCount}
      />
      <Box mt={5} p={5} bgColor={"white"} rounded={"md"}>
        <Text fontWeight={"semibold"} fontSize={"xl"}>
          Daftar Survei
        </Text>
        <SimpleGrid columns={[1, 2, 4]} spacing={4} mt={5}>
          {userData.surveys.map((survey) => (
            <SurveyCard
              key={survey.id}
              title={survey.title}
              description={survey.description}
              surveyId={survey.id}
            />
          ))}
        </SimpleGrid>
      </Box>
    </Box>
  );
};

export default Profile;
