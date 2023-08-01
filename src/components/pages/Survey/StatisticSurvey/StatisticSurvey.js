import { Box, Center, Text, VStack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { Fragment } from "react";
import useSWR from "swr";

import BarChart from "@/components/fragments/BarChart";
import Loading from "@/components/fragments/Loading";
import PieChart from "@/components/fragments/PieChart";
import TextCard from "@/components/fragments/TextCard";
import fetcher from "@/lib/fetcher";

export default function StatisticSurvey() {
  const router = useRouter();
  const { uuid } = router.query;
  const { data, error, isLoading } = useSWR(
    `/api/survey/statistic/${uuid}`,
    fetcher
  );

  if (isLoading) return <Loading />;
  if (error) router.push("/404");

  const renderChart = (title, type, labels, data) => {
    switch (type) {
      case "radio":
        return <PieChart data={data} labels={labels} title={title} />;
      case "checkbox":
        return <BarChart data={data} labels={labels} title={title} />;
      default:
        return <TextCard labels={labels} title={title} />;
    }
  };

  const renderResponse = (() => {
    return data?.responses.length ? (
      data.responses.map((surveyAnswer) => (
        <Fragment key={surveyAnswer.question}>
          {renderChart(
            surveyAnswer.question,
            surveyAnswer.type,
            surveyAnswer.response.map((res) => res.answer),
            surveyAnswer.response.map((res) => res.count)
          )}
        </Fragment>
      ))
    ) : (
      <Center flexDir="column" gap={2} mt={50}>
        <Text fontSize="2xl" fontWeight="semibold">
          Belum Ada Respon
        </Text>
        <Text>Jawaban dari responden akan ditampilkan di sini</Text>
      </Center>
    );
  })();

  return (
    <Box>
      <VStack gap={3}>
        <Box backgroundColor="white" p={5} rounded="md" w="full">
          <Text fontSize="lg" fontWeight="semibold">
            {data?.survey?.title}
          </Text>
          <Text>{data?.survey?.description}</Text>
        </Box>
        {renderResponse}
      </VStack>
    </Box>
  );
}
