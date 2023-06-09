import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";

import { getSurveyData, getSurveyResponse } from "@/src/utils/prisma/survey";

import { authOptions } from "../../auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const surveyId = req.query.id as string;
  const session = await getServerSession(req, res, authOptions);
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
