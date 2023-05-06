import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

import { getSurveyData } from "@/src/utils/prisma/survey";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const surveyId = req.query.id as string;
  const session = await getSession({ req });
  const { surveyData, questionData } = await getSurveyData(surveyId);

  if (!surveyData) {
    res.status(404).json({ message: "Not found" });
    return;
  }

  if(surveyData) {
    if (session?.user?.email === surveyData?.owner.email) {
      res.status(403).json({ message: "Forbidden" });
      return;
    }
  }

  res.status(200).json({ survey: surveyData, questions: questionData });
}
