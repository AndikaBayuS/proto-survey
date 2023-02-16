import { User } from "@prisma/client";

export interface Gamification {
    id: string;
    userId: string;
    level: number;
    points: number;
    user: User;
}

export interface LeaderboardProps {
  leaderboard: Gamification[];
}
