import { NextApiRequest, NextApiResponse } from "next";

import { getSurveyData } from "@/src/utils/prisma/survey";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const surveyId = req.query.id as string;
  const { surveyData, questionData } = await getSurveyData(surveyId);

  res.status(200).json({ survey: surveyData, questions: questionData });
}
