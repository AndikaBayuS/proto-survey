import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { Box, SimpleGrid } from "@chakra-ui/react";

import ProfileCard from "@/src/components/pages/Profile/ProfileCard";
import SurveyCard from "@/src/components/pages/Profile/SurveyCard";
import { getUserData, getUserId } from "@/src/utils/prisma/user";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  const userId = await getUserId(String(session?.user?.email));
  const userData = await getUserData(String(userId));
  const data = JSON.parse(JSON.stringify(userData));

  return {
    props: {
      userData: data,
    },
  };
};

const Profile = ({ userData }: any) => {
  console.log(userData);
  const surveyCount = userData.surveys.length;

  return (
    <Box>
      <ProfileCard
        image={userData.image}
        name={userData.name}
        surveyCount={surveyCount}
      />
      <SimpleGrid columns={4} spacing={4} mt={5}>
        {userData.surveys.map((survey: any) => (
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
