// Reusable types
export type OptionsType = {
  id: string;
  value: string;
}

export type surveyType = {
  title: string;
  description: string;
}

export type AnswerCounts = {
  [answer: string]: number;
};

export type SurveyAnswerCount = {
  question: string;
  type: string;
  response: { answer: string; count: number }[];
};
