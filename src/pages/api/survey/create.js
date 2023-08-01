import { getServerSession } from "next-auth";

import { prisma } from "@/lib/prisma";
import { countPoints } from "@/utils/helper";
import { addExperience } from "@/utils/prisma/gamification";
import { getUserId } from "@/utils/prisma/user";

import { authOptions } from "../auth/[...nextauth]";

export default async function handle(req, res) {
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
  const userId = await getUserId(session?.user?.email);
  const ownerData = {
    name: session?.user?.name,
    email: session?.user?.email,
    image: session?.user?.image,
  };

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

  await addExperience(userId, points);
  res.json(surveys);
}
