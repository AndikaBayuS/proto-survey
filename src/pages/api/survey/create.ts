import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { Prisma } from "@prisma/client";

import { prisma } from "@/src/lib/prisma";
import { countQuestions } from "@/src/utils/gamification";
import { addExperience } from "@/src/utils/prisma/gamification";
import { getUserId } from "@/src/utils/prisma/user";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { title, description, questions } = req.body;
  const points = countQuestions(questions);
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
      questions: {
        create: questions,
      },
    },
  });

  await addExperience(String(userId), points);
  res.json(surveys);
}
