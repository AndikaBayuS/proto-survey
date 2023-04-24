import { NextApiRequest, NextApiResponse } from "next";

import { getLeaderboard } from "@/src/utils/prisma/gamification";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const leaderboard = await getLeaderboard();

  res.status(200).json(leaderboard);
}
