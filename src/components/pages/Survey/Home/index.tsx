import { SimpleGrid } from "@chakra-ui/react";
import { Prisma } from "@prisma/client";

import Card from "@/src/components/common/Card";
import { PagesProps } from "@/src/global/interfaces";

const Home: React.FC<PagesProps> = ({ surveys }) => {
  return (
    <SimpleGrid columns={{ base: 2, md: 3, lg: 4 }} spacing={4}>
      {surveys.map((survey) => {
        const owner = survey.owner as Prisma.JsonObject;
        return (
          <Card
            key={survey.id}
            surveyId={survey.id}
            ownerName={owner.name}
            ownerImage={owner.image}
            title={survey.title}
            description={survey.description}
          />
        );
      })}
    </SimpleGrid>
  );
};

export default Home;
