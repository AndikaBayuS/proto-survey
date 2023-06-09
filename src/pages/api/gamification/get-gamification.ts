import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";

import { getGamification, getUserId } from "@/src/utils/prisma/user";

import { authOptions } from "../auth/[...nextauth]";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);
  const userId = await getUserId(String(session?.user?.email));
  try {
    const gamificationData = await getGamification(String(userId));
    res.status(200).json(gamificationData);
  } catch {
    res.status(400).json({ message: "Something went wrong" });
  }
}
