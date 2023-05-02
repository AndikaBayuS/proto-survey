import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

import { getSurveyData, getSurveyResponse } from "@/src/utils/prisma/survey";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const surveyId = req.query.id as string;
  const session = await getSession({ req });
  const { surveyData } = await getSurveyData(surveyId);
  const responses = await getSurveyResponse(surveyId);

  if (surveyData) {
    if (session?.user?.email !== surveyData?.owner.email) {
      return res.status(401).json({ message: "Unauthorized" });
    } else {
      return res.status(200).json({ survey: surveyData, responses });
    }
  }
}
