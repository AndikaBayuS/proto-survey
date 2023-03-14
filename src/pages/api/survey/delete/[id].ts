import { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "@/src/lib/prisma";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;
  const deleteSurvey = prisma.surveys.delete({
    where: {
      id: String(id),
    },
  });
  const deleteQuestion = prisma.questions.deleteMany({
    where: {
      surveyId: String(id),
    },
  });
  const deleteResponse = prisma.response.deleteMany({
    where: {
      surveyId: String(id),
    },
  });

  await prisma.$transaction([deleteQuestion, deleteSurvey, deleteResponse]);
  res.json("Survey deleted");
}
