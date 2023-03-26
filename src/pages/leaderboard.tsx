import { GetServerSideProps } from "next";
import Head from "next/head";
import { Box } from "@chakra-ui/react";

import PageBase from "@/src/components/layouts/PageBase";
import Home from "@/src/components/pages/Leaderboard/Home";
import { LeaderboardProps } from "@/src/global/interfaces";
import { getLeaderboard } from "@/src/utils/prisma/gamification";

const LeaderboardPage: React.FC<LeaderboardProps> = ({ leaderboard }) => {
  return (
    <Box>
      <Head>
        <title>ProtoSurvey - Peringkat</title>
        <meta name="description" content="ProtoSurvey" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PageBase>
        <Home leaderboard={leaderboard} />
      </PageBase>
    </Box>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const leaderboards = await getLeaderboard();
  return {
    props: {
      leaderboard: JSON.parse(JSON.stringify(leaderboards)),
    },
  };
};

export default LeaderboardPage;
