import { getServerSession } from "next-auth";

import { getSurveys } from "@/utils/prisma/survey";
import {
  getGamification,
  getUserData,
  getUserId,
  setBadges,
  setGamification,
} from "@/utils/prisma/user";

import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req, res) {
  try {
    const session = await getServerSession(req, res, authOptions);
    const search = req.query.search;
    const category = req.query.category;
    const surveys = await getSurveys(search, category);

    if (session?.user?.email) {
      const userId = await getUserId(session.user.email);
      const userData = await getUserData(userId);
      const userGamification = await getGamification(userId);

      if (userId && userGamification == null) {
        await setGamification(userId);
      }

      if (userData && JSON.stringify(userData.badge) === "{}") {
        await setBadges(userId);
      }
    }

    res.status(200).json(surveys);
  } catch {
    res.status(500).json("failed to get surveys");
  }
}
