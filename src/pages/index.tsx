import type { GetServerSideProps } from "next";
import Head from "next/head";
import { getSession } from "next-auth/react";
import { Box } from "@chakra-ui/react";

import Home from "@/src/components/pages/Survey/Home";
import { PagesProps } from "@/src/interfaces/pages.interface";
import { prisma } from "@/src/lib/prisma";
import {
  getGamification,
  getUserId,
  setGamification,
} from "@/src/utils/prisma/user";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  const userId = await getUserId(String(session?.user?.email));
  const userGamification = await getGamification(String(userId));
  const surveyData = await prisma.surveys.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

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

const SurveyPage: React.FC<PagesProps> = ({ surveys }) => {
  return (
    <Box>
      <Head>
        <title>ProtoSurvey</title>
        <meta name="description" content="ProtoSurvey" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Home surveys={surveys} />
    </Box>
  );
};

export default SurveyPage;
