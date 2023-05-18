import { SimpleGrid } from "@chakra-ui/react";
import { Prisma } from "@prisma/client";
import useSWR from "swr";

import Card from "@/src/components/common/Card";
import Skeleton from "@/src/components/common/Skeleton";
import fetcher from "@/src/lib/fetcher";

interface Survey {
  id: string;
  title: string;
  description: string;
  surveyMode: string;
  owner: {
    name: string;
    image: string;
  };
}

const Home = () => {
  const { data, error, isLoading } = useSWR<Survey[]>("/api/survey", fetcher, {
    revalidateOnMount: true,
  });

  if (isLoading) return <Skeleton />;
  if (error) return <div>Error</div>;

  return (
    <SimpleGrid columns={{ base: 2, md: 3, lg: 4 }} spacing={4}>
      {data?.map((survey) => {
        const owner = survey.owner as Prisma.JsonObject;
        return (
          <Card
            key={survey.id}
            description={survey.description}
            ownerImage={owner.image}
            ownerName={owner.name}
            surveyId={survey.id}
            surveyMode={survey.surveyMode}
            title={survey.title}
          />
        );
      })}
    </SimpleGrid>
  );
};

export default Home;
