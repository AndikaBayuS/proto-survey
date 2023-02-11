import type { GetServerSideProps } from "next";
import Head from "next/head";
import { getSession } from "next-auth/react";
import { Box, Container, SimpleGrid } from "@chakra-ui/react";

import Card from "@/src/components/common/Card";
import { prisma } from "@/src/lib/prisma";
import {
  getGamification,
  getUserId,
  setGamification,
} from "@/src/utils/prisma/user";

import { Props } from "./pages.interface";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  const userId = await getUserId(String(session?.user?.email));
  const userGamification = await getGamification(String(userId));
  const surveyData = await prisma.surveys.findMany();
  const surveys = JSON.parse(JSON.stringify(surveyData));

  if (userId && userGamification == null) {
    await setGamification(String(userId));
  }

  return {
    props: {
      surveys,
    },
  };
};

const Home: React.FC<Props> = ({ surveys }) => {
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
            return (
              <Card
                key={survey.id}
                surveyId={survey.id}
                owner={survey.ownerName}
                ownerImage={survey.ownerImage}
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
