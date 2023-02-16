import { GetServerSideProps } from "next";
import { Container, Text } from "@chakra-ui/react";
import { User } from "@prisma/client";

import { getLeaderboard } from "@/src/utils/prisma/gamification";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const leaderboards = await getLeaderboard();
  return {
    props: {
        leaderboard: JSON.parse(JSON.stringify(leaderboards)),
    },
  };
};

interface Gamification {
    id: string;
    userId: string;
    level: number;
    points: number;
    user: User;
}

interface Props {
  leaderboard: Gamification[];
}

const Leaderboard: React.FC<Props> = ({ leaderboard }) => {
  return (
    <Container maxWidth={"container.xl"} py={5}>
      <Text>Halo</Text>
    </Container>
  );
};

export default Leaderboard;
