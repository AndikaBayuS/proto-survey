import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

import { getGamification, getUserId } from "@/src/utils/prisma/user";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });
  const userId = await getUserId(String(session?.user?.email));
  try {
    const gamificationData = await getGamification(String(userId));
    res.status(200).json(gamificationData);
  } catch {
    res.status(400).json({ message: "Something went wrong" });
  }
}
