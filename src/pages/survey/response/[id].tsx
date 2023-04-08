import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import { Box } from "@chakra-ui/react";

import PieChart from "@/src/components/common/PieChart";
import PageBase from "@/src/components/layouts/PageBase";
import { getSurveyAnswers, getSurveyData } from "@/src/utils/prisma/survey";

interface Response {
  answer: string;
  count: number;
}

const SurverResponse = ({ answers }: any) => {
  if (answers) {
    return (
      <Box>
        <Head>
          <title>ProtoSurvey - Respon</title>
        </Head>
        <PageBase>
          {answers.map((surveyAnswer: any, index: any) => (
            <PieChart
              key={index}
              labels={surveyAnswer.response.map((res: any) => res.answer)}
              data={surveyAnswer.response.map((res: any) => res.count)}
              title={surveyAnswer.question}
            />
          ))}
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
  let { surveyData, questionData } = await getSurveyData(surveyId);
  let answers = await getSurveyAnswers(surveyId);

  return {
    props: {
      answers,
      survey: surveyData,
      questions: questionData,
    },
  };
};

export default SurverResponse;
