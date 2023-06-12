import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";

import { getSurveys } from "@/src/utils/prisma/survey";
import {
  getGamification,
  getUserData,
  getUserId,
  setBadges,
  setGamification,
} from "@/src/utils/prisma/user";

import { authOptions } from "../auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const session = await getServerSession(req, res, authOptions);
    const search = req.query.search as string;
    const category = req.query.category as string;
    const userId = await getUserId(String(session?.user?.email));
    const userData = await getUserData(String(userId));
    const userGamification = await getGamification(String(userId));
    const surveys = await getSurveys(search, category);

    if (userId && userGamification == null) {
      await setGamification(String(userId));
    }

    if (userData && JSON.stringify(userData.badge) === "{}") {
      await setBadges(String(userId));
    }

    res.status(200).json(surveys);
  } catch {
    res.status(500).json("failed to get surveys");
  }
}
