import { Box, SimpleGrid, Text } from "@chakra-ui/react";
import { Gamification, Surveys } from "@prisma/client";
import { useRecoilValue } from "recoil";
import useSWR from "swr";

import { gamificationState } from "@/src/atoms/gamification";
import Skeleton from "@/src/components/common/Skeleton";
import fetcher from "@/src/lib/fetcher";

import ProfileCard from "../ProfileCard";
import SurveyCard from "../SurveyCard";

interface Profile {
  name: string;
  email: string;
  university: string;
  image: string;
  surveys: Surveys[];
  gamification: Gamification;
  badge: any;
}

const Profile = () => {
  const { gamification } = useRecoilValue(gamificationState);
  const { data, error, isLoading } = useSWR<Profile>("/api/profile", fetcher);

  if (isLoading) return <Skeleton />;
  if (error) return <div>Error</div>;

  return (
    <Box>
      <ProfileCard
        badges={data?.badge!}
        email={data?.email!}
        image={data?.image!}
        level={gamification?.level}
        name={data?.name!}
        university={data?.university!}
      />
      <Box bgColor="white" mt={5} p={5} rounded="md">
        <Text fontSize="xl" fontWeight="semibold">
          Daftar Survei
        </Text>
        <SimpleGrid columns={[1, 2, 4]} mt={5} spacing={4}>
          {data?.surveys.map((survey) => (
            <SurveyCard
              key={survey.id}
              description={survey.description}
              surveyId={survey.id}
              title={survey.title}
            />
          ))}
        </SimpleGrid>
      </Box>
    </Box>
  );
};

export default Profile;
