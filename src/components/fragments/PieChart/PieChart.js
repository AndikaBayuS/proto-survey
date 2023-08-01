import { Box, Text } from "@chakra-ui/react";
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import { Pie } from "react-chartjs-2";

import { PIE_BORDER_COLORS, PIE_COLORS } from "./constants";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function PieChart({ labels, data, title }) {
  const chartData = {
    labels: labels,
    datasets: [
      {
        data: data,
        backgroundColor: PIE_COLORS.slice(0, labels.length),
        borderColor: PIE_BORDER_COLORS.slice(0, labels.length),
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
    },
  };

  return (
    <Box backgroundColor="white" p={5} rounded="md" w="full">
      <Text fontWeight="semibold" mb={5}>
        {title}
      </Text>
      <Box h="15rem">
        <Pie data={chartData} height="50px" options={options} width="50px" />
      </Box>
    </Box>
  );
}
