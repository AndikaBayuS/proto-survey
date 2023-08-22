import { Box } from "@chakra-ui/react";
import useSWR from "swr";

import LeaderboardCard from "@/components/fragments/LeaderboardCard";
import Loading from "@/components/fragments/Loading";
import fetcher from "@/lib/fetcher";

export default function Leaderboard() {
  const { data, error, isLoading } = useSWR("/api/leaderboard", fetcher);

  if (isLoading) return <Loading />;
  if (error) return <div>Error</div>;

  return (
    <Box>
      {data?.map((leaderboard, index) => (
        <LeaderboardCard
          index={index}
          key={leaderboard.id}
          level={leaderboard.level}
          points={leaderboard.points}
          user={leaderboard.user}
        />
      ))}
    </Box>
  );
}
