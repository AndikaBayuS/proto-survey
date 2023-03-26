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
}

export interface SigninProps {
  providers: [{ id: string; name: string }];
}

export interface SurveyProps {
  id?: string;
  questions: SurveyQuestion[];
}

export interface QuestionValues {
  question: string;
  options: OptionsType[];
  type: string;
}
// Page Interface
export interface PagesProps {
  surveys: Surveys[];
}

export interface ProfileProps {
  userData: {
    name: string;
    image: string;
    surveys: Surveys[];
    gamification: Gamification;
  }
}

export interface LeaderboardProps {
  leaderboard: Gamification[];
}

export interface EditSurveyPageProps {
  questions: any;
  survey: surveyType;
}

// Component interfaces
export interface StatsProps {
  experience: number;
  level: number;
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
  questions: [{ question: string; type: string; options?: string[] }];
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
  image: string;
  surveyCount: number;
}

export interface EditSurveyProps {
  questions: SurveyQuestion[];
  survey: surveyType;
}

// Forms interface
export interface FormComponentProps {
  options: OptionsType[];
  fieldProps: FieldInputProps<any>;
}