import { Box, Text } from "@chakra-ui/react";
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import { Pie } from "react-chartjs-2";
import { PIE_BORDER_COLORS, PIE_COLORS } from "./constants";

interface ChartProps {
  labels: string[];
  data: number[];
  title: string;
}

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart: React.FC<ChartProps> = ({ labels, data, title }) => {
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
    <Box position={"relative"} display={"block"}>
      <Text mb={5}>{title}</Text>
      <Box h={"15rem"}>
        <Pie
          data={chartData}
          options={options}
          height={"50px"}
          width={"50px"}
        />
      </Box>
    </Box>
  );
};

export default PieChart;
