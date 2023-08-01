import { prisma } from "@/lib/prisma";

export const addExperience = async (id, points) => {
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

export const addLevel = async (id) => {
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

export const addMaxPoints = async (id) => {
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

export const countAnsweredCategory = async (id, surveyData) => {
  const userData = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  const surveyCount = userData?.surveyCount;

  if (surveyCount) {
    let categoryToUpdate;

    switch (surveyData.category[0]) {
      case "teknologi":
        categoryToUpdate = "teknologi";
        break;
      case "pendidikan":
        categoryToUpdate = "pendidikan";
        break;
      case "kesehatan":
        categoryToUpdate = "kesehatan";
        break;
      case "pariwisata":
        categoryToUpdate = "pariwisata";
        break;
      case "pertanian":
        categoryToUpdate = "pertanian";
        break;
      case "agrikultur":
        categoryToUpdate = "agrikultur";
        break;
      default:
        break;
    }

    if (categoryToUpdate) {
      const updatedSurveyCount = {
        ...surveyCount,
        [categoryToUpdate]: surveyCount[categoryToUpdate]
          ? Number(surveyCount[categoryToUpdate]) + 1
          : 1,
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

export const addBadge = async (userData, target) => {
  const activateBadge = (badges, index) => {
    return badges.map((badge, i) => {
      if (i === index) {
        return {
          ...badge,
          achieved: true,
          dateAchieved: new Date().toISOString(),
        };
      }
      return badge;
    });
  };

  const targetValue = userData.surveyCount[target];

  if (targetValue === 10 || targetValue === 50) {
    const index = targetValue === 10 ? 0 : 1;
    const updatedBadges = {
      ...userData.badge,
      [target]: activateBadge(userData.badge[target], index),
    };

    await prisma.user.update({
      where: {
        id: userData.id,
      },
      data: {
        badge: updatedBadges,
      },
    });
  }
};
