import { prisma } from "@/lib/prisma";

export const getSurveys = async (search, category) => {
  const whereClause = {};

  if (search) {
    whereClause.title = { contains: search };
  }

  if (category) {
    whereClause.category = { contains: category };
  }

  const surveysData = await prisma.surveys.findMany({
    where: whereClause,
    orderBy: {
      createdAt: "desc",
    },
  });

  const surveys = JSON.parse(JSON.stringify(surveysData));

  return surveys;
};

export const getSurveyData = async (surveyId) => {
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

export const getSurveyResponse = async (surveyId) => {
  const responses = await prisma.response.findMany({
    where: {
      surveyId,
    },
  });

  const counts = {};
  const types = {};

  responses.forEach((response) => {
    const question = response.question;

    if (!counts[question]) {
      counts[question] = {};
      types[question] = response.type;
    }

    response.answer.forEach((answer) => {
      counts[question][answer] = (counts[question][answer] || 0) + 1;
    });
  });

  const result = [];
  Object.entries(counts).forEach(([question, countObj]) => {
    const response = Object.entries(countObj).map(([answer, count]) => ({
      answer,
      count,
    }));
    result.push({ question, type: types[question], response });
  });

  return result;
};

export const handleUpdateQuestion = (questions) => {
  const updates = questions
    .filter((question) => !question.deleteQuestion && !question.isNew)
    .map((question) => ({
      where: { id: question.questionsId },
      data: {
        question: question.question,
        options: question.options ?? undefined,
        type: question.type,
      },
    }));

  const deletes = questions
    .filter((question) => question.deleteQuestion)
    .map((question) => ({
      where: { id: question.questionsId },
    }));

  const news = questions
    .filter((question) => question.isNew)
    .map((question) => ({
      surveyId: question.surveyId,
      question: question.question,
      options: question.options ?? undefined,
      type: question.type,
    }));

  return { updates, deletes, news };
};
