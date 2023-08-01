import { Box } from "@chakra-ui/react";
import Head from "next/head";

import Leaderboard from "@/components/pages/Leaderboard";

const LeaderboardPage = () => {
  return (
    <Box>
      <Head>
        <title>ProtoSurvey - Peringkat</title>
        <meta content="ProtoSurvey" name="description" />
        <link href="/favicon.ico" rel="icon" />
      </Head>
      <Leaderboard />
    </Box>
  );
};

export default LeaderboardPage;
