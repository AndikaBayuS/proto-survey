import { prisma } from "@/lib/prisma";

export default async function handle(req, res) {
  const { uuid } = req.query;
  const deleteSurvey = prisma.surveys.delete({
    where: {
      id: uuid,
    },
  });
  const deleteQuestion = prisma.questions.deleteMany({
    where: {
      surveyId: uuid,
    },
  });
  const deleteResponse = prisma.response.deleteMany({
    where: {
      surveyId: uuid,
    },
  });

  await prisma.$transaction([deleteQuestion, deleteSurvey, deleteResponse]);
  res.json("Survey deleted");
}
