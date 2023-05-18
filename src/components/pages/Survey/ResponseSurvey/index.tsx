import { useRouter } from "next/router";
import { Box, Center, Text, VStack } from "@chakra-ui/react";
import { Fragment } from "react";
import useSWR from "swr";

import BarChart from "@/src/components/common/BarChart";
import PieChart from "@/src/components/common/PieChart";
import Skeleton from "@/src/components/common/Skeleton";
import fetcher from "@/src/lib/fetcher";

import TextResponse from "./fragments/TextResponse";

interface Response {
  survey: {
    title: string;
    description: string;
    owner: {
      email: string;
    };
  };
  responses: {
    question: string;
    response: {
      answer: string;
      count: number;
    };
  }[];
}

const ResponseSurvey = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data, error, isLoading } = useSWR<Response>(
    `/api/survey/response/${id}`,
    fetcher
  );

  if (isLoading) return <Skeleton />;
  if (error) router.push("/404");

  const renderChart = (
    type: string,
    labels: string[],
    data: number[],
    title: string
  ) => {
    switch (type) {
      case "radio":
        return <PieChart data={data} labels={labels} title={title} />;
      case "checkbox":
        return <BarChart data={data} labels={labels} title={title} />;
      default:
        return <TextResponse labels={labels} title={title} />;
    }
  };

  const renderResponse = (() => {
    return data?.responses.length ? (
      data?.responses?.map((surveyAnswer: any) => (
        <Fragment key={surveyAnswer.question}>
          {renderChart(
            surveyAnswer.type,
            surveyAnswer.response.map((res: any) => res.answer),
            surveyAnswer.response.map((res: any) => res.count),
            surveyAnswer.question
          )}
        </Fragment>
      ))
    ) : (
      <Center flexDir={"column"} gap={2} mt={50}>
        <Text fontSize={"2xl"} fontWeight={"semibold"}>
          Belum Ada Respon
        </Text>
        <Text>Jawaban dari responden akan ditampilkan di sini</Text>
      </Center>
    );
  })();

  return (
    <Box>
      <VStack gap={3}>
        <Box backgroundColor={"white"} p={5} rounded={"md"} w={"full"}>
          <Text fontSize={"lg"} fontWeight={"semibold"}>
            {data?.survey?.title}
          </Text>
          <Text>{data?.survey?.description}</Text>
        </Box>
        {renderResponse}
      </VStack>
    </Box>
  );
};

export default ResponseSurvey;
