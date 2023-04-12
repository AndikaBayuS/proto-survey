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

export const addLevel = async (id: string) => {
  const data = await prisma.gamification.updateMany({
    where: {
      userId: id,
    },
    data: {
      level: {
        increment: 1,
      },
    },
  });

  return data;
};

export const addMaxPoints = async (id: string) => {
  const data = await prisma.gamification.updateMany({
    where: {
      userId: id,
    },
    data: {
      maxPoints: {
        increment: 1000,
      },
      points: 0,
    },
  });

  return data;
};

export const getLeaderboard = async () => {
  const data = await prisma.gamification.findMany({
    orderBy: {
      points: "desc",
    },
    include: {
      user: true,
    },
  });

  return data;
};
