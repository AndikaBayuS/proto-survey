import { Prisma, Surveys, User } from "@prisma/client";
import { FieldInputProps } from "formik";

import { OptionsType, surveyType } from "./types";

// Common Interface
export interface Gamification {
  id: string;
  level: number;
  points: number;
  user: User;
}

export interface CardProps {
  surveyId: string;
  ownerName: Prisma.JsonValue | undefined;
  ownerImage: Prisma.JsonValue | undefined;
  title: string;
  description: string;
  surveyMode: string
}

export interface SigninProps {
  providers: [{ id: string; name: string }];
}

export interface SurveyProps {
  id?: string;
  surveyCategory: string[];
  surveySubCategory: string[];
  surveyMode: string;
  questions: SurveyQuestion[];
}

export interface QuestionValues {
  question: string;
  options: OptionsType[];
  type: string;
}
// Page Interface
export interface ProfileProps {
  userData: {
    name: string;
    image: string;
    surveys: Surveys[];
    gamification: Gamification;
  };
}

export interface EditSurveyPageProps {
  questions: any;
  survey: surveyType;
}

// Component interfaces
export interface StatsProps {
  experience: number;
  level: number;
  maxPoints: number;
  minPoints: number;
  isLoading: boolean;
}

export interface UserCardProps {
  user: User;
  points: number;
  index: number;
}

export interface SurveyQuestion {
  id?: string;
  questionsId: string;
  surveyId: string;
  question: string;
  options: any;
  answer?: string;
  type: string;
  deleteQuestion?: boolean;
}

export interface CreateValues {
  title: string;
  description: string;
  surveyMode: string;
  terms?: string | null;
  surveyCategory: string[] | null;
  surveySubCategory: string[] | null;
  questions: [
    { question: string; type: string; options?: { id: string; value: string }[] }
  ];
}

export interface CreateOptionInterface {
  name: string;
  options: OptionsType[];
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined
  ) => void;
  target: string;
}

export interface CreateQuestionInterface extends CreateOptionInterface {
  type: string;
}

export interface ViewOptionInterface {
  options: OptionsType[];
  type: string;
  fieldProps: FieldInputProps<any>;
}

export interface SurveyCardProps {
  title: string;
  description: string;
  surveyId: string;
}

export interface ProfileCardProps {
  name: string;
  email: string;
  image: string;
  university: string;
  level: number;
}

export interface EditSurveyProps {
  questions: SurveyQuestion[];
  survey: surveyType;
  responses: any;
}

// Forms interface
export interface FormComponentProps {
  options: OptionsType[];
  fieldProps: FieldInputProps<any>;
}
