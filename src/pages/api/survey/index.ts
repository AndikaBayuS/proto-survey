import { getSession } from "next-auth/react";
import { prisma } from "@/src/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { title, description, questions } = req.body;
  const session = await getSession({ req });
  const surveys = await prisma.surveys.create({
    data: {
      title,
      owner: String(session?.user?.email || ""),
      description,
      questions: {
        create: questions,
      },
    },
  });
  res.json(surveys);
}
