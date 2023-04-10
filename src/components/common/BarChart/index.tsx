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

interface ChartProps {
  labels: string[];
  data: number[];
  title: string;
}

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart: React.FC<ChartProps> = ({ labels, data, title }) => {
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
    <Box backgroundColor={"white"} rounded={"md"} p={5} w={"full"}>
      <Text mb={5} fontWeight={"semibold"}>{title}</Text>
      <Box h={"15rem"}>
        <Bar data={chartData} options={options} />
      </Box>
    </Box>
  );
};

export default BarChart;
