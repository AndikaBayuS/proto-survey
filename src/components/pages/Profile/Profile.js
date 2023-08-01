import { Box, SimpleGrid, Text } from "@chakra-ui/react";
import { useRecoilValue } from "recoil";
import useSWR from "swr";

import { gamificationState } from "@/atoms/gamification";
import Loading from "@/components/fragments/Loading";
import SurveyCard from "@/components/fragments/SurveyCard";
import fetcher from "@/lib/fetcher";

import ProfileCard from "./fragments/ProfileCard";

export default function Profile() {
  const { gamification } = useRecoilValue(gamificationState);
  const { data, error, isLoading } = useSWR("/api/profile", fetcher);

  if (isLoading) return <Loading />;
  if (error) return <div>Error</div>;

  return (
    <Box>
      <ProfileCard
        badges={data?.badge}
        email={data?.email}
        image={data?.image}
        level={gamification?.level}
        name={data?.name}
        university={data?.university}
      />
      <Box bgColor="white" mt={5} p={5} rounded="md">
        <Text fontSize="xl" fontWeight="semibold">
          Daftar Survei
        </Text>
        <SimpleGrid columns={[1, 2, 4]} mt={5} spacing={4}>
          {data?.surveys.map((survey) => {
            const owner = survey.owner;
            return (
              <SurveyCard
                category={survey.category}
                description={survey.description}
                isProfilePage
                key={survey.id}
                ownerImage={owner.image}
                ownerName={owner.name}
                subCategory={survey.subCategory}
                surveyId={survey.id}
                surveyMode={survey.surveyMode}
                title={survey.title}
              />
            );
          })}
        </SimpleGrid>
      </Box>
    </Box>
  );
}
