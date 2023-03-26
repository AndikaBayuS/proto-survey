import { Box, SimpleGrid } from "@chakra-ui/react";

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
      <SimpleGrid columns={4} spacing={4} mt={5}>
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
  );
};

export default Profile;
