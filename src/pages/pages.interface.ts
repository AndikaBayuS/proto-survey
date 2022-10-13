import { Gamification, Surveys, User } from "@prisma/client";

export type Props = {
  surveys: Surveys[];
  owners: User[];
  gamification: Gamification[];
};
