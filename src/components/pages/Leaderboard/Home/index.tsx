import { Box } from "@chakra-ui/react";

import { LeaderboardProps } from "@/src/global/interfaces";

import UserCard from "../UserCard";

const Home = ({ leaderboard }: LeaderboardProps) => {
  return (
    <Box>
      {leaderboard.map((leaderboard, index) => (
        <UserCard
          key={leaderboard.id}
          user={leaderboard.user}
          points={leaderboard.points}
          index={index}
        />
      ))}
    </Box>
  );
};

export default Home;
