import { GetServerSideProps } from "next";
import { Box, Container, Divider } from "@chakra-ui/react";

import UserCard from "@/src/components/pages/leaderboards/UserCard";
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
    <Container
      p={0}
      mt={5}
      maxWidth={"container.xl"}
      bgColor={"white"}
      rounded={"md"}
    >
      {leaderboard.map((leaderboard, index) => (
        <UserCard
          key={leaderboard.id}
          user={leaderboard.user}
          points={leaderboard.points}
          index={index}
        />
      ))}
    </Container>
  );
};

export default Leaderboard;
