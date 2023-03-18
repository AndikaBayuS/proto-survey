import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import { Box } from "@chakra-ui/react";

import EditSurvey from "@/src/components/pages/Survey/EditSurvey";
import { prisma } from "@/src/lib/prisma";

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{ params: { id: "cuid" } }],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  let surveyId = String(params?.id);
  let questionData = null;
  let surveyData = null;

  try {
    questionData = await prisma.questions.findMany({
      where: {
        surveyId,
      },
    });
  } catch (err) {}

  try {
    surveyData = await prisma.surveys.findUnique({
      where: {
        id: surveyId,
      },
    });
  } catch (err) {}

  const surveys = JSON.parse(JSON.stringify(surveyData));

  return {
    props: {
      questions: questionData,
      survey: surveys,
    },
  };
};

const EditSurveyPage = ({ questions, survey }: any) => {
  if (questions) {
    return (
      <Box>
        <Head>
          <title>ProtoSurvey - Edit Survei</title>
        </Head>
        <EditSurvey questions={questions} survey={survey} />
      </Box>
    );
  }
};

export default EditSurveyPage;
