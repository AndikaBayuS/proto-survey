import { prisma } from "@/lib/prisma";

export const getUserId = async (email) => {
  const data = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  return data?.id;
};

export const getUserData = async (id) => {
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

export const getGamification = async (id) => {
  const data = await prisma.gamification.findFirst({
    where: {
      userId: id,
    },
  });

  return data;
};

export const setGamification = async (id) => {
  await prisma.gamification.create({
    data: {
      userId: id,
      level: 1,
      points: 0,
    },
  });
};

export const setBadges = async (id) => {
  const badgesData = {
    teknologi: [
      {
        image: "badges/teknologi/bronze-medal.svg",
        achieved: false,
        dateAchieved: "",
      },
      {
        image: "badges/teknologi/gold-medal.svg",
        achieved: false,
        dateAchieved: "",
      },
    ],
    kesehatan: [
      {
        image: "badges/kesehatan/bronze-medal.svg",
        achieved: false,
        dateAchieved: "",
      },
      {
        image: "badges/kesehatan/gold-medal.svg",
        achieved: false,
        dateAchieved: "",
      },
    ],
    pendidikan: [
      {
        image: "badges/pendidikan/bronze-medal.svg",
        achieved: false,
        dateAchieved: "",
      },
      {
        image: "badges/pendidikan/gold-medal.svg",
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
