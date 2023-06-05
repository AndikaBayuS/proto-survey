import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

import { getSurveyData } from "@/src/utils/prisma/survey";
import { getUserData, getUserId } from "@/src/utils/prisma/user";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });
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
