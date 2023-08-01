import { getSurveyData, getSurveyResponse } from "@/utils/prisma/survey";

export default async function handler(req, res) {
  const surveyId = req.query.uuid;
  const { surveyData, questionData } = await getSurveyData(surveyId);
  const responses = await getSurveyResponse(surveyId);

  res
    .status(200)
    .json({ survey: surveyData, questions: questionData, responses });
}
