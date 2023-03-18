import { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "@/src/lib/prisma";
import { handleUpdateQuestion } from "@/src/utils/prisma/survey";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { title, description, questions } = req.body;
    const surveyId = questions[0].surveyId;
    const { updates, deletes } = handleUpdateQuestion(questions);

    await prisma.$transaction([
      prisma.surveys.update({
        where: { id: surveyId },
        data: { title, description },
      }),
      ...updates.map((update: any) => prisma.questions.update(update)),
      ...deletes.map((del: any) => prisma.questions.delete(del)),
    ]);

    res.json("Survey updated");
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update survey" });
  }
}
