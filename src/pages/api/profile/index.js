import { getServerSession } from "next-auth";

import { getUserData, getUserId } from "@/utils/prisma/user";

import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);
  const userId = await getUserId(String(session?.user?.email));
  const userData = await getUserData(String(userId));
  const data = JSON.parse(JSON.stringify(userData));

  res.status(200).json(data);
}
