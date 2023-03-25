import { Box, Progress, Text, VStack } from "@chakra-ui/react";

import { StatsProps } from "@/src/global/interfaces";

const Stats: React.FC<StatsProps> = ({ experience, level }) => {
  return (
    <Box width={"5rem"}>
      <VStack>
        <Text fontWeight={"semibold"}>Lv. {level}</Text>
        <Progress
          value={experience}
          width={"full"}
          rounded={"md"}
          size={"sm"}
        />
      </VStack>
    </Box>
  );
};

export default Stats;
