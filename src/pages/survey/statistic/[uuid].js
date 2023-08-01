import { Box } from "@chakra-ui/react";
import Head from "next/head";

import StatisticSurvey from "@/components/pages/Survey/StatisticSurvey";

const ResponseSurveyPage = () => {
  return (
    <Box>
      <Head>
        <title>ProtoSurvey - Statistik Survei</title>
      </Head>
      <StatisticSurvey />
    </Box>
  );
};

export default ResponseSurveyPage;
