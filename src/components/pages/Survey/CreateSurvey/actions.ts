import { FormikProps } from "formik";
import { ChangeEvent } from "react";
import { v4 as uuidv4 } from "uuid";

import { CreateValues } from "@/src/global/interfaces";

export const handleQuestionTypeChange = (
  event: ChangeEvent<HTMLSelectElement>,
  index: number,
  form: FormikProps<CreateValues>
) => {
  const selectedType = event.target.value;
  form.setFieldValue(`questions[${index}].type`, selectedType);

  if (selectedType === "radio" || selectedType === "checkbox") {
    form.setFieldValue(`questions[${index}].options`, [
      { id: uuidv4(), value: "" },
      { id: uuidv4(), value: "" },
    ]);
  } else {
    form.setFieldValue(`questions[${index}].options`, undefined);
  }
};

export const areFieldsEmpty = (values: CreateValues) => {
  if (!values.title || !values.description) {
    return true;
  }

  for (const question of values.questions) {
    if (!question.question) {
      return true;
    }

    if (question.options && question.options.length > 0) {
      for (const option of question.options) {
        if (!option.value.trim()) return true;
      }
    }
  }

  return false;
};
