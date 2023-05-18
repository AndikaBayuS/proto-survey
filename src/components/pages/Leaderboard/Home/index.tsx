import { Box } from "@chakra-ui/react";
import { User } from "@prisma/client";
import useSWR from "swr";

import Skeleton from "@/src/components/common/Skeleton";
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
  if (isLoading) return <Skeleton />;
  if (error) return <div>Error</div>;

  return (
    <Box>
      {data?.map((leaderboard, index) => (
        <UserCard
          key={leaderboard.id}
          index={index}
          points={leaderboard.points}
          user={leaderboard.user}
        />
      ))}
    </Box>
  );
};

export default Home;
