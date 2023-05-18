import { atom } from "recoil";

export const gamificationState = atom({
  key: "gamificationState",
  default: {
    isLoading: true,
    gamification: {
      level: 1,
      points: 0,
      maxPoints: 0,
      minPoints: 0
    },
  },
});
