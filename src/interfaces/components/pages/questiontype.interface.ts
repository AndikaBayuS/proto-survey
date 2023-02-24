export interface QuestionTypeInterface {
  type: string;
  name: string;
  options: string[];
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined
  ) => void;
  target: string;
}
