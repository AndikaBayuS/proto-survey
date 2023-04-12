import { Box, Progress, Text, VStack } from "@chakra-ui/react";

import { StatsProps } from "@/src/global/interfaces";

const Stats: React.FC<StatsProps> = ({ experience, level, maxPoints }) => {
  return (
    <Box width={"5rem"}>
      <VStack alignItems={"flex-start"}>
        <Text fontWeight={"semibold"}>Lv. {level}</Text>
        <Progress
          backgroundColor={"gray.300"}
          value={experience}
          max={maxPoints}
          width={"full"}
          rounded={"md"}
          size={"sm"}
        />
      </VStack>
    </Box>
  );
};

export default Stats;
