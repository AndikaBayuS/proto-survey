import axios from "axios";

import { CreateValues, SurveyProps } from "@/src/global/interfaces";

export const createSurvey = async ({
  title,
  description,
  surveyMode,
  terms,
  questions,
  surveyCategory,
  surveySubCategory
}: CreateValues) => {
  try {
    const body = {
      title,
      description,
      surveyMode,
      surveyCategory,
      surveySubCategory,
      terms,
      questions,
    };
    await fetch("/api/survey/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  } catch {
    console.log("error");
  }
};

export const updateSurvey = async (data: SurveyProps) => {
  try {
    await fetch(`/api/survey/update/${data.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  } catch {
    console.log("error");
  }
};

export const deleteSurvey = async (id: string) => {
  try {
    await fetch(`/api/survey/delete/${id}`, {
      method: "DELETE",
    });
  } catch {
    console.log("error");
  }
};

export const getGamificationData = async () => {
  return axios.get("/api/gamification/get-gamification");
};
