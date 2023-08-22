import { Box, Text } from "@chakra-ui/react";
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import { Pie } from "react-chartjs-2";

import { PIE_BORDER_COLORS, PIE_COLORS } from "./constants";

ChartJS.register(Tooltip, Legend, ArcElement);

export default function PieChart({ labels, data, title }) {
  const total = data.reduce((sum, value) => sum + value, 0);
  const percentages = data.map((value) => ((value / total) * 100).toFixed(2));

  const chartData = {
    labels: labels.map((label, index) => `${label} - ${percentages[index]}%`),
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
        display: true,
        position: "right", // Display legend on the right side
        labels: {
          usePointStyle: true, // You can adjust other label styles here
        },
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
        <Pie data={chartData} options={options} />
      </Box>
    </Box>
  );
}
