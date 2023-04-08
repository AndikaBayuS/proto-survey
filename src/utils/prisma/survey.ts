import { Response } from "@prisma/client";

import { AnswerCounts, SurveyAnswerCount } from "@/src/global/types";
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

export const getSurveyAnswers = async (
  surveyId: string
): Promise<SurveyAnswerCount[]> => {
  const responses = await prisma.response.findMany({
    where: {
      surveyId,
    },
  });

  const counts: { [question: string]: AnswerCounts } = {};

  responses.forEach((response: Response) => {
    const question = response.question;

    if (!counts[question]) {
      counts[question] = {};
    }

    response.answer.forEach((answer: string) => {
      counts[question][answer] = (counts[question][answer] || 0) + 1;
    });
  });

  const result: SurveyAnswerCount[] = [];
  Object.entries(counts).forEach(([question, countObj]) => {
    const response = Object.entries(countObj).map(([answer, count]) => ({
      answer,
      count,
    }));
    result.push({ question, response });
  });

  return result;
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
