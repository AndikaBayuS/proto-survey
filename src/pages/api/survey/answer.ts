import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

import { prisma } from "@/src/lib/prisma";
import { countPoints } from "@/src/utils/gamification";
import {
  addExperience,
  addLevel,
  addMaxPoints,
  countCategory,
} from "@/src/utils/prisma/gamification";
import { getSurveyData } from "@/src/utils/prisma/survey";
import { getGamification, getUserId } from "@/src/utils/prisma/user";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { questions } = req.body;
  const points = countPoints(questions);
  const session = await getSession({ req });
  const userId = await getUserId(String(session?.user?.email));
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
  await addExperience(String(userId), points);
  await countCategory(String(userId), surveyData);

  const gamification = await getGamification(String(userId));
  if (
    gamification?.points != undefined &&
    gamification.points >= gamification.maxPoints
  ) {
    await addLevel(String(userId));
    await addMaxPoints(String(userId));
  }

  res.json(surveys);
}
