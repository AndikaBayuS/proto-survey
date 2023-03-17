import { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "@/src/lib/prisma";

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { title, description, questions } = req.body;
    const surveyId = questions[0].surveyId;
    const updates = questions.map((question: any) => ({
      where: { id: question.questionsId },
      data: {
        question: question.question,
        options: question.options ?? undefined,
        type: question.type,
      },
    }));

    await prisma.$transaction([
      prisma.surveys.update({
        where: { id: surveyId },
        data: { title, description },
      }),
      ...updates.map((update: any) => prisma.questions.update(update)),
    ]);

    res.json("Survey updated");
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update survey" });
  }
}
