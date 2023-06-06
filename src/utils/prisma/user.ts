import { prisma } from "@/src/lib/prisma";

export const getUserId = async (email: string) => {
  const data = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  return data?.id;
};

export const getUserData = async (id: string) => {
  const data = await prisma.user.findUnique({
    where: {
      id,
    },
    include: {
      surveys: true,
      gamification: {
        where: {
          userId: id,
        },
      },
    },
  });

  return data;
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

export const setBadges = async (id: string) => {
  const badgesData = {
    teknologi: [
      {
        image: "badges/teknologi/1.png",
        achieved: false,
        dateAchieved: "",
      },
      {
        image: "badges/teknologi/1.png",
        achieved: false,
        dateAchieved: "",
      },
    ],
    kesehatan: [
      {
        image: "badges/kesehatan/1.png",
        achieved: false,
        dateAchieved: "",
      },
      {
        image: "badges/kesehatan/1.png",
        achieved: false,
        dateAchieved: "",
      },
    ],
    pendidikan: [
      {
        image: "badges/pendidikan/1.png",
        achieved: false,
        dateAchieved: "",
      },
      {
        image: "badges/pendidikan/1.png",
        achieved: false,
        dateAchieved: "",
      },
    ],
  };

  await prisma.user.update({
    where: {
      id,
    },
    data: {
      badge: badgesData,
    },
  });
};
