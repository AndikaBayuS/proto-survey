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
