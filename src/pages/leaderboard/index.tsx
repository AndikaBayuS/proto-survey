import { GetServerSideProps } from "next";
import { Container, Text } from "@chakra-ui/react";

import { LeaderboardProps } from "@/src/interfaces/leaderboard.interface";
import { getLeaderboard } from "@/src/utils/prisma/gamification";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const leaderboards = await getLeaderboard();
  return {
    props: {
        leaderboard: JSON.parse(JSON.stringify(leaderboards)),
    },
  };
};

const Leaderboard: React.FC<LeaderboardProps> = ({ leaderboard }) => {
  return (
    <Container maxWidth={"container.xl"} py={5}>
      <Text>Halo</Text>
    </Container>
  );
};

export default Leaderboard;
