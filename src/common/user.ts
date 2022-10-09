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
  const data = await prisma.gamification.findUnique({
    where: {
      id,
    },
  });

  return data;
};

export const setGamification = async (id: string) => {
  const data = await prisma.gamification.update({
    where: { id },
    data: {
      level: 1,
      points: 0,
    },
  });

  return data;
};
