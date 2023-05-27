import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

import { prisma } from "@/src/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });
  await prisma.user.update({
    where: {
      email: String(session?.user?.email),
    },
    data: {
      name: req.body.name,
      university: req.body.university,
    },
  });

  res.status(200).json({message: "Success update data!"});
}
