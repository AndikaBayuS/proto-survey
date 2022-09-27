import { Questions } from "@prisma/client";

export interface SurveyProps {
  questions: Questions[] | any;
}

export interface SubmitValues {
  id?: string;
  questionsId: string;
  surveyId: string;
  question: string;
  answer: string;
}

export interface CreateValues {
  title: string;
  description: string;
  questions: [{ question: string }];
}
