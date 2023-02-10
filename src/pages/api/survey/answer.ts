import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

import { prisma } from "@/src/lib/prisma";
import { addExperience } from "@/src/utils/prisma/gamification";
import { getUserId } from "@/src/utils/prisma/user";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { questions } = req.body;
  const session = await getSession({ req });
  const userId = await getUserId(String(session?.user?.email));
  const surveys = await prisma.response.createMany({
    data: [...questions].map((question) => ({
      ...question,
      participantId: userId,
    })),
  });
  await addExperience(String(userId), 10);
  res.json(surveys);
}
