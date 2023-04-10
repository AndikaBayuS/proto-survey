import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import { Box } from "@chakra-ui/react";

import PageBase from "@/src/components/layouts/PageBase";
import ResponseSurvey from "@/src/components/pages/Survey/ResponseSurvey";
import { getSurveyData, getSurveyResponse } from "@/src/utils/prisma/survey";

const ResponseSurveyPage = ({ surveys, responses }: any) => {
  if (responses) {
    console.log(responses);
    return (
      <Box>
        <Head>
          <title>ProtoSurvey - Respon</title>
        </Head>
        <PageBase>
          <ResponseSurvey surveys={surveys} responses={responses} />
        </PageBase>
      </Box>
    );
  }
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{ params: { id: "cuid" } }],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  let surveyId = String(params?.id);
  let { surveyData } = await getSurveyData(surveyId);
  let responses = await getSurveyResponse(surveyId);

  return {
    props: {
      surveys: surveyData,
      responses,
    },
  };
};

export default ResponseSurveyPage;
