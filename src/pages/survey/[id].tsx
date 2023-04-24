import Head from "next/head";
import { Box } from "@chakra-ui/react";

import PageBase from "@/src/components/layouts/PageBase";
import AnswerSurvey from "@/src/components/pages/Survey/AnswerSurvey";

const AnswerSurveyPage = () => {
  return (
    <Box>
      <Head>
        <title>ProtoSurvey - Jawab Survei</title>
      </Head>
      <PageBase>
        <AnswerSurvey />
      </PageBase>
    </Box>
  );
};

export default AnswerSurveyPage;
