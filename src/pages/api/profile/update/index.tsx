import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

import { prisma } from "@/src/lib/prisma";
import { getUserId } from "@/src/utils/prisma/user";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });
  const userId = await getUserId(session?.user?.email!);
  await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      name: req.body.name,
      university: req.body.university,
    },
  });

  res.status(200).json({message: "Success update data!"});
}
