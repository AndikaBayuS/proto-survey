import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { Prisma } from "@prisma/client";

import { prisma } from "@/src/lib/prisma";
import { countPoints } from "@/src/utils/gamification";
import { addExperience } from "@/src/utils/prisma/gamification";
import { getUserId } from "@/src/utils/prisma/user";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { title, description, surveyMode, surveyCategory, terms, questions } = req.body;
  const points = countPoints(questions);
  const session = await getSession({ req });
  const userId = await getUserId(String(session?.user?.email));
  const ownerData = {
    name: session?.user?.name,
    email: session?.user?.email,
    image: session?.user?.image,
  } as Prisma.JsonObject;

  const surveys = await prisma.surveys.create({
    data: {
      title,
      ownerId: String(userId),
      owner: ownerData,
      description,
      surveyMode,
      category: surveyCategory,
      terms,
      questions: {
        create: questions,
      },
    },
  });

  await addExperience(String(userId), points);
  res.json(surveys);
}
