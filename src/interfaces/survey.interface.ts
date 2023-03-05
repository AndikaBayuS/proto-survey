export interface SurveyQuestion {
  id?: string;
  questionsId: string;
  surveyId: string;
  question: string;
  options: any;
  answer: string;
  type: string;
}

export interface SurveyProps {
  questions: SurveyQuestion[];
}

export interface CreateValues {
  title: string;
  description: string;
  questions: [{ question: string; type: string; options?: string[] }];
}
