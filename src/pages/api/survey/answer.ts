import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

import { prisma } from "@/src/lib/prisma";
import { countPoints } from "@/src/utils/gamification";
import {
  addBadge,
  addExperience,
  addLevel,
  addMaxPoints,
  countAnsweredCategory,
} from "@/src/utils/prisma/gamification";
import { getSurveyData } from "@/src/utils/prisma/survey";
import {
  getGamification,
  getUserData,
  getUserId,
} from "@/src/utils/prisma/user";

const targetList = ["teknologi", "pendidikan", "kesehatan", "agrikultur"];

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { questions } = req.body;
  const points = countPoints(questions);
  const session = await getSession({ req });
  const userId = await getUserId(String(session?.user?.email));
  let userData = await getUserData(String(userId));
  const { surveyData } = await getSurveyData(questions[0].surveyId);

  const surveys = await prisma.response.createMany({
    data: [...questions].map((question) => {
      const { options, ...rest } = question;
      return {
        ...rest,
        participantId: userId,
      };
    }),
  });

  const gamification = await getGamification(String(userId));
  if (
    gamification?.points != undefined &&
    gamification.points >= gamification.maxPoints
  ) {
    await addLevel(String(userId));
    await addMaxPoints(String(userId));
  }

  await addExperience(String(userId), points);
  await countAnsweredCategory(String(userId), surveyData);

  userData = await getUserData(String(userId));
  targetList.map(async (target) => {
    await addBadge(userData, target);
  });

  res.json(surveys);
}
