import { Box, Text, VStack } from "@chakra-ui/react";
import { Fragment } from "react";

import BarChart from "@/src/components/common/BarChart";
import PieChart from "@/src/components/common/PieChart";
import TextResponse from "./fragments/TextResponse";

const ResponseSurvey = ({ surveys, responses }: any) => {
  const renderChart = (type: any, labels: any, data: any, title: any) => {
    switch (type) {
      case "radio":
        return <PieChart labels={labels} data={data} title={title} />;
      case "checkbox":
        return <BarChart labels={labels} data={data} title={title} />;
      default:
        return <TextResponse labels={labels} title={title} />;
    }
  };

  return (
    <Box>
      <VStack gap={3}>
        <Box backgroundColor={"white"} p={5} rounded={"md"} w={"full"}>
          <Text>{surveys.title}</Text>
          <Text>{surveys.description}</Text>
        </Box>
        {responses.map((surveyAnswer: any) => (
          <Fragment key={surveyAnswer.question}>
            {renderChart(
              surveyAnswer.type,
              surveyAnswer.response.map((res: any) => res.answer),
              surveyAnswer.response.map((res: any) => res.count),
              surveyAnswer.question
            )}
          </Fragment>
        ))}
      </VStack>
    </Box>
  );
};

export default ResponseSurvey;
