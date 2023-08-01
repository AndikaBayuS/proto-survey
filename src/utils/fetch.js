import axios from "axios";

export const createSurvey = async ({
  title,
  description,
  surveyMode,
  terms,
  questions,
  surveyCategory,
  surveySubCategory,
}) => {
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

export const updateSurvey = async (data) => {
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

export const deleteSurvey = async (id) => {
  try {
    await fetch(`/api/survey/delete/${id}`, {
      method: "DELETE",
    });
  } catch {
    console.log("error");
  }
};

export const getGamificationData = async () => {
  return axios.get("/api/gamification");
};

export const updateProfile = async (data) => {
  try {
    await fetch(`/api/profile/update`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  } catch {
    console.log("error");
  }
};
