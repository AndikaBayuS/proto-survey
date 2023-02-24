import axios from "axios"

import { CreateValues } from "@/src/interfaces/survey.interface";

export const createSurvey = async ({
    title,
    description,
    questions,
  }: CreateValues) => {
    try {
      const body = { title, description, questions };
      await fetch("/api/survey/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
    } catch {
      console.log("error");
    }
  };

export const getGamificationData = async() => {
    return axios.get('/api/gamification/get-gamification')
}