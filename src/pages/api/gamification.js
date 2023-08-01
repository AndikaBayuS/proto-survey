import { getServerSession } from "next-auth";

import { getGamification, getUserId } from "@/utils/prisma/user";

import { authOptions } from "./auth/[...nextauth]";


export default async function handle(req, res) {
  const session = await getServerSession(req, res, authOptions);
  const userId = await getUserId(session?.user?.email);
  try {
    const gamificationData = await getGamification(userId);
    res.status(200).json(gamificationData);
  } catch {
    res.status(400).json({ message: "Something went wrong" });
  }
}
