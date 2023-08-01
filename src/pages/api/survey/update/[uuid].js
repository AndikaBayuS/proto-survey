import { prisma } from "@/lib/prisma";
import { handleUpdateQuestion } from "@/utils/prisma/survey";

export default async function handle(req, res) {
  try {
    const {
      title,
      description,
      surveyMode,
      surveyCategory,
      surveySubCategory,
      terms,
      questions,
    } = req.body;
    const surveyId = questions[0].surveyId;
    const { updates, deletes, news } = handleUpdateQuestion(questions);

    await prisma.$transaction([
      prisma.surveys.update({
        where: { id: surveyId },
        data: {
          title,
          description,
          surveyMode,
          category: surveyCategory,
          subCategory: surveySubCategory,
          terms,
        },
      }),
      ...updates.map((update) => prisma.questions.update(update)),
      ...deletes.map((del) => prisma.questions.delete(del)),
      ...news.map((newQuestion) =>
        prisma.questions.create({ data: newQuestion })
      ),
    ]);

    res.json("Survey updated");
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update survey" });
  }
}
