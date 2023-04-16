import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import { Box } from "@chakra-ui/react";

import Skeleton from "@/src/components/common/Skeleton";
import PageBase from "@/src/components/layouts/PageBase";
import AnswerSurvey from "@/src/components/pages/Survey/AnswerSurvey";
import { SurveyProps } from "@/src/global/interfaces";
import { getSurveyData } from "@/src/utils/prisma/survey";

const AnswerSurveyPage = ({ questions }: SurveyProps) => {
  if (!questions) return <Skeleton />;

  return (
    <Box>
      <Head>
        <title>ProtoSurvey - Jawab Survei</title>
      </Head>
      <PageBase>
        <AnswerSurvey questions={questions} />
      </PageBase>
    </Box>
  );
};

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

export default AnswerSurveyPage;
