import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import { Box } from "@chakra-ui/react";

import EditSurvey from "@/src/components/pages/Survey/EditSurvey";
import { getSurveyData } from "@/src/utils/prisma/survey";

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{ params: { id: "cuid" } }],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  let surveyId = String(params?.id);
  let { surveyData, questionData } = await getSurveyData(surveyId);

  return {
    props: {
      questions: questionData,
      survey: surveyData,
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
