import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import { Box } from "@chakra-ui/react";

import AnswerSurvey from "@/src/components/pages/Survey/AnswerSurvey";
import { SurveyProps } from "@/src/interfaces/survey.interface";
import { prisma } from "@/src/lib/prisma";

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{ params: { id: "cuid" } }],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  let surveyId = null;
  let questionData = null;
  try {
    surveyId = String(params?.id);
    questionData = await prisma.questions.findMany({
      where: {
        surveyId,
      },
    });
  } catch (err) {}

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
