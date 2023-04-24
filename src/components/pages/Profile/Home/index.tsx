import { Box, SimpleGrid, Text } from "@chakra-ui/react";
import { Gamification, Surveys } from "@prisma/client";
import useSWR from "swr";

import fetcher from "@/src/lib/fetcher";

import ProfileCard from "../ProfileCard";
import SurveyCard from "../SurveyCard";

interface Profile {
  name: string;
  image: string;
  surveys: Surveys[];
  gamification: Gamification;
}

const Profile = () => {
  const { data, error, isLoading } = useSWR<Profile>("/api/profile", fetcher);
  const surveyCount = data?.surveys.length;

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;

  return (
    <Box>
      <ProfileCard
        image={data?.image!}
        name={data?.name!}
        surveyCount={surveyCount!}
      />
      <Box mt={5} p={5} bgColor={"white"} rounded={"md"}>
        <Text fontWeight={"semibold"} fontSize={"xl"}>
          Daftar Survei
        </Text>
        <SimpleGrid columns={[1, 2, 4]} spacing={4} mt={5}>
          {data?.surveys.map((survey) => (
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
