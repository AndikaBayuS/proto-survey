import { getServerSession } from "next-auth";

import { getSurveyData } from "@/utils/prisma/survey";
import { getUserData, getUserId } from "@/utils/prisma/user";

import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);
  const surveyId = req.query.id;
  const userId = await getUserId(session?.user?.email);
  const { surveyData, questionData } = await getSurveyData(surveyId);
  const userData = await getUserData(userId);

  if (!surveyData) {
    res.status(404).json({ message: "Not found" });
    return;
  }

  if (userData) {
    if (userData?.university === null) {
      res.status(406).json({ message: "Not Acceptable" });
      return;
    }
  }

  if (surveyData) {
    if (session?.user?.email === surveyData?.owner.email) {
      res.status(403).json({ message: "Forbidden" });
      return;
    }
  }

  res.status(200).json({ survey: surveyData, questions: questionData });
}
