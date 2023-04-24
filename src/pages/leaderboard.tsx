import Head from "next/head";
import { Box } from "@chakra-ui/react";

import PageBase from "@/src/components/layouts/PageBase";
import Home from "@/src/components/pages/Leaderboard/Home";

const LeaderboardPage = () => {
  return (
    <Box>
      <Head>
        <title>ProtoSurvey - Peringkat</title>
        <meta name="description" content="ProtoSurvey" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PageBase>
        <Home />
      </PageBase>
    </Box>
  );
};

export default LeaderboardPage;
