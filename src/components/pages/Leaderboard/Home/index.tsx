import { Box } from "@chakra-ui/react";
import { User } from "@prisma/client";
import useSWR from "swr";

import fetcher from "@/src/lib/fetcher";

import UserCard from "../UserCard";

interface Leaderboard {
  id: string;
  userId: string;
  level: number;
  points: number;
  maxPoints: number;
  user: User;
}

const Home = () => {
  const { data, error, isLoading } = useSWR<Leaderboard[]>(
    "/api/leaderboard",
    fetcher
  );
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;

  return (
    <Box>
      {data?.map((leaderboard, index) => (
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
