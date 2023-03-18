import { prisma } from "@/src/lib/prisma";

export const getSurveys = async () => {
  const surveysData = await prisma.surveys.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  const surveys = JSON.parse(JSON.stringify(surveysData));

  return surveys;
};

export const getSurveyData = async (surveyId: string) => {
  const surveys = await prisma.surveys.findUnique({
    where: {
      id: surveyId,
    },
  });
  const surveyData = JSON.parse(JSON.stringify(surveys));

  const questionData = await prisma.questions.findMany({
    where: {
      surveyId,
    },
  });

  return { surveyData, questionData };
};

export const handleUpdateQuestion = (questions: any) => {
  const updates = questions
    .filter((question: any) => !question.deleteQuestion)
    .map((question: any) => ({
      where: { id: question.questionsId },
      data: {
        question: question.question,
        options: question.options ?? undefined,
        type: question.type,
      },
    }));

  const deletes = questions
    .filter((question: any) => question.deleteQuestion)
    .map((question: any) => ({
      where: { id: question.questionsId },
    }));

  return { updates, deletes };
};
