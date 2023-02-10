import { prisma } from "@/src/lib/prisma";

export const getUserId = async (email: string) => {
  const data = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  return data?.id;
};

export const getUserName = async (email: string) => {
  const data = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  return data?.name;
};

export const getGamification = async (id: string) => {
  const data = await prisma.gamification.findFirst({
    where: {
      userId: id,
    },
  });

  return data;
};

export const setGamification = async (id: string) => {
  await prisma.gamification.create({
    data: {
      userId: id,
      level: 1,
      points: 0,
    },
  });
};