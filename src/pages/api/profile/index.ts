import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

import { getUserData, getUserId } from "@/src/utils/prisma/user";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });
  const userId = await getUserId(String(session?.user?.email));
  const userData = await getUserData(String(userId));
  const data = JSON.parse(JSON.stringify(userData));

  res.status(200).json(data);
}
