import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

import { getSurveys } from "@/src/utils/prisma/survey";
import { getGamification, getUserId, setGamification } from "@/src/utils/prisma/user";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const session = await getSession({ req });
    const userId = await getUserId(String(session?.user?.email));
    const userGamification = await getGamification(String(userId));
    const surveys = await getSurveys();

    if (userId && userGamification == null) {
      await setGamification(String(userId));
    }

    res.status(200).json(surveys);
  } catch {
    res.status(500).json("failed to get surveys");
  }
}
