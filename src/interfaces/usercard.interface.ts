import { User } from "@prisma/client";

export interface UserCardProps {
  user: User;
  points: number;
  index: number;
}
