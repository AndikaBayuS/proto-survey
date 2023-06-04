import { Prisma as PrismaClient } from "@prisma/client";

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
      minPoints: {
        increment: 1000,
      },
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

export const countCategory = async (id: any, surveyData: any) => {
  const userData = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  const surveyCount = userData?.surveyCount as PrismaClient.JsonObject;

  if (surveyCount) {
    let categoryToUpdate: keyof typeof surveyCount | undefined;

    switch (surveyData.category[0]) {
      case 'teknologi':
        categoryToUpdate = 'teknologi';
        break;
      case 'pendidikan':
        categoryToUpdate = 'pendidikan';
        break;
      case 'kesehatan':
        categoryToUpdate = 'kesehatan';
        break;
      case 'pariwisata':
        categoryToUpdate = 'pariwisata';
        break;
      case 'pertanian':
        categoryToUpdate = 'pertanian';
        break;
      case 'agrikultur':
        categoryToUpdate = 'agrikultur';
        break;
      default:
        break;
    }

    if (categoryToUpdate) {
      const updatedSurveyCount = {
        ...surveyCount,
        [categoryToUpdate]: surveyCount[categoryToUpdate] ? Number(surveyCount[categoryToUpdate]) + 1 : 1,
      };

      await prisma.user.update({
        where: {
          id,
        },
        data: {
          surveyCount: updatedSurveyCount,
        },
      });
    }
  }
};
