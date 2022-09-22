import Card from "@/src/components/common/Card";
import { prisma } from "@/src/lib/prisma";
import { Box, Container, SimpleGrid } from "@chakra-ui/react";
import { Surveys, User } from "@prisma/client";
import type { GetStaticProps } from "next";
import Head from "next/head";

type Props = {
  surveys: Surveys[];
  owners: User[];
};

export const getStaticProps: GetStaticProps = async () => {
  const surveyData = await prisma.surveys.findMany();
  const surveys = JSON.parse(JSON.stringify(surveyData));

  const ownerData = await prisma.user.findMany({
    where: {
      id: surveys.owner,
    },
  });
  const owners = JSON.parse(JSON.stringify(ownerData));

  return {
    props: {
      surveys,
      owners,
    },
  };
};

const Home: React.FC<Props> = ({ surveys, owners }) => {
  return (
    <Box py={5}>
      <Head>
        <title>ProtoSurvey</title>
        <meta name="description" content="ProtoSurvey" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container maxWidth={"container.xl"}>
        <SimpleGrid columns={{ base: 2, md: 3, lg: 4 }} spacing={4}>
          {surveys.map((survey) => {
            return (
              <Card
                key={survey.id}
                surveyId={survey.id}
                owner={survey.owner}
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
