import type { GetServerSideProps } from "next";
import Head from "next/head";
import { getSession } from "next-auth/react";
import { Box } from "@chakra-ui/react";

import PageBase from "@/src/components/layouts/PageBase";
import Home from "@/src/components/pages/Survey/Home";
import { PagesProps } from "@/src/global/interfaces";
import { getSurveys } from "@/src/utils/prisma/survey";
import {
  getGamification,
  getUserId,
  setGamification,
} from "@/src/utils/prisma/user";
const SurveyPage: React.FC<PagesProps> = ({ surveys }) => {
  return (
    <Box>
      <Head>
        <title>ProtoSurvey</title>
        <meta name="description" content="ProtoSurvey" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PageBase>
        <Home surveys={surveys} />
      </PageBase>
    </Box>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  const userId = await getUserId(String(session?.user?.email));
  const userGamification = await getGamification(String(userId));
  const surveys = await getSurveys();

  if (userId && userGamification == null) {
    await setGamification(String(userId));
  }

  return {
    props: {
      surveys,
    },
  };
};

export default SurveyPage;
