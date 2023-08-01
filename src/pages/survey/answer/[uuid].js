import { Box } from "@chakra-ui/react";
import Head from "next/head";

import AnswerSurvey from "@/components/pages/Survey/AnswerSurvey";

export default function AnswerSurveyPage() {
  return (
    <Box>
      <Head>
        <title>ProtoSurvey - Jawab Survei</title>
      </Head>
      <AnswerSurvey />
    </Box>
  );
}
