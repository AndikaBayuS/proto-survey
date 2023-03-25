import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import { Box } from "@chakra-ui/react";

import AnswerSurvey from "@/src/components/pages/Survey/AnswerSurvey";
import { SurveyProps } from "@/src/global/interfaces";
import { getSurveyData } from "@/src/utils/prisma/survey";

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{ params: { id: "cuid" } }],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  let surveyId = String(params?.id);
  let { questionData } = await getSurveyData(surveyId);

  return {
    props: {
      questions: questionData,
    },
  };
};

const AnswerSurveyPage = ({ questions }: SurveyProps) => {
  if (questions) {
    return (
      <Box>
        <Head>
          <title>ProtoSurvey - Jawab Survei</title>
        </Head>
        <AnswerSurvey questions={questions} />
      </Box>
    );
  }
};

export default AnswerSurveyPage;
