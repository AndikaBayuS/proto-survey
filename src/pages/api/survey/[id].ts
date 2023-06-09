import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";

import { getSurveyData } from "@/src/utils/prisma/survey";
import { getUserData, getUserId } from "@/src/utils/prisma/user";

import { authOptions } from "../auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);
  const surveyId = req.query.id as string;
  const userId = await getUserId(String(session?.user?.email));
  const { surveyData, questionData } = await getSurveyData(surveyId);
  const userData = await getUserData(String(userId));

  if (!surveyData) {
    res.status(404).json({ message: "Not found" });
    return;
  }

  if(userData) {
    if (userData?.university === null) {
      res.status(406).json({ message: "Not Acceptable" });
      return;
    }
  }

  if(surveyData) {
    if (session?.user?.email === surveyData?.owner.email) {
      res.status(403).json({ message: "Forbidden" });
      return;
    }
  }

  res.status(200).json({ survey: surveyData, questions: questionData });
}
