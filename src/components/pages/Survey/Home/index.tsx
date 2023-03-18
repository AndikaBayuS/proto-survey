import Head from "next/head";
import { Box, Container, SimpleGrid } from "@chakra-ui/react";
import { Prisma } from "@prisma/client";

import Card from "@/src/components/common/Card";
import { PagesProps } from "@/src/interfaces/pages.interface";

const Home: React.FC<PagesProps> = ({ surveys }) => {
  return (
    <Box py={5}>
      <Head>
        <title>ProtoSurvey</title>
        <meta name="description" content="ProtoSurvey" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container maxWidth={"container.xl"} position={"relative"}>
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
      </Container>
    </Box>
  );
};

export default Home;
