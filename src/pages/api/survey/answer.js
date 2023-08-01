import { getServerSession } from "next-auth";

import { prisma } from "@/lib/prisma";
import { countPoints } from "@/utils/helper";
import {
  addBadge,
  addExperience,
  addLevel,
  addMaxPoints,
  countAnsweredCategory,
} from "@/utils/prisma/gamification";
import { getSurveyData } from "@/utils/prisma/survey";
import { getGamification, getUserData, getUserId } from "@/utils/prisma/user";

import { authOptions } from "../auth/[...nextauth]";

const targetList = ["teknologi", "pendidikan", "kesehatan", "agrikultur"];

export default async function handle(req, res) {
  const { questions } = req.body;
  const points = countPoints(questions);
  const session = await getServerSession(req, res, authOptions);
  const userId = await getUserId(session?.user?.email);
  let userData = await getUserData(userId);
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

  const gamification = await getGamification(userId);
  if (
    gamification?.points != undefined &&
    gamification?.points >= gamification?.maxPoints
  ) {
    await addLevel(userId);
    await addMaxPoints(userId);
  }

  await addExperience(userId, points);
  await countAnsweredCategory(userId, surveyData);

  userData = await getUserData(userId);
  targetList.map(async (target) => {
    await addBadge(userData, target);
  });

  res.json(surveys);
}
