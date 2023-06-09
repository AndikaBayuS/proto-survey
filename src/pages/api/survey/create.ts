import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { Prisma } from "@prisma/client";

import { prisma } from "@/src/lib/prisma";
import { countPoints } from "@/src/utils/gamification";
import { addExperience } from "@/src/utils/prisma/gamification";
import { getUserId } from "@/src/utils/prisma/user";

import { authOptions } from "../auth/[...nextauth]";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    title,
    description,
    surveyMode,
    surveyCategory,
    surveySubCategory,
    terms,
    questions,
  } = req.body;
  const points = countPoints(questions);
  const session = await getServerSession(req, res, authOptions);
  const userId = await getUserId(String(session?.user?.email));
  const ownerData = {
    name: session?.user?.name,
    email: session?.user?.email,
    image: session?.user?.image,
  } as Prisma.JsonObject;

  const surveys = await prisma.surveys.create({
    data: {
      title,
      ownerId: userId,
      owner: ownerData,
      description,
      surveyMode,
      category: surveyCategory,
      subCategory: surveySubCategory,
      terms,
      questions: {
        create: questions,
      },
    },
  });

  await addExperience(String(userId), points);
  res.json(surveys);
}
