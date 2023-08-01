import { getServerSession } from "next-auth";

import { getSurveyData, getSurveyResponse } from "@/utils/prisma/survey";

import { authOptions } from "../../auth/[...nextauth]";

export default async function handler(req, res) {
  const surveyId = req.query.uuid;
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
