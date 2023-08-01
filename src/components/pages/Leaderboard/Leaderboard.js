import { Box } from "@chakra-ui/react";
import useSWR from "swr";

import LeaderboardCard from "@/components/fragments/LeaderboardCard";
import Loading from "@/components/fragments/Loading";
import fetcher from "@/lib/fetcher";

export default function Leaderboard() {
  const { data, error, isLoading } = useSWR("/api/leaderboard", fetcher);

  if (isLoading) return <Loading />;
  if (error) return <div>Error</div>;

  console.log(data);

  return (
    <Box>
      {data?.map((leaderboard, index) => (
        <LeaderboardCard
          index={index}
          key={leaderboard.id}
          points={leaderboard.points}
          user={leaderboard.user}
        />
      ))}
    </Box>
  );
}
