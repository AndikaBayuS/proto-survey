import { prisma } from "@/src/lib/prisma";

export const addExperience = async (id: string, points: number) => {
  const data = await prisma.gamification.updateMany({
    where: {
      userId: id,
    },
    data: {
      points: {
        increment: points,
      },
    },
  });

  return data;
};