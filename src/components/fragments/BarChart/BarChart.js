import { Box, Text } from "@chakra-ui/react";
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function BarChart({ labels, data, title }) {
  const chartData = {
    labels: labels,
    datasets: [
      {
        data: data,
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "rgba(54, 162, 235, 1)",
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
        <Bar data={chartData} options={options} />
      </Box>
    </Box>
  );
}
