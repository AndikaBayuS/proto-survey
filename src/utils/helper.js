import { v4 as uuidv4 } from "uuid";

export const handleAddOption = (values, setFieldValue, target) => {
  setFieldValue(target, [...values, { id: uuidv4(), value: "" }]);
};

export const handleEditOption = (
  values,
  setFieldValue,
  target,
  updatedValue,
  id
) => {
  const updatedOptions = values.map((option) => {
    if (option.id === id) {
      return { ...option, value: updatedValue };
    }
    return option;
  });
  setFieldValue(target, updatedOptions);
};

export const handleDeleteOption = (values, setFieldValue, target, id) => {
  setFieldValue(
    target,
    values.filter((option) => option.id !== id)
  );
};

export const handleEnterKey = (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
  }
};

export const toTitleCase = (string) => {
  return string?.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
};

export const countPoints = (questions) => {
  return questions.length * 5;
};

export const handleQuestionTypeChange = (event, index, form) => {
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

export const areFieldsEmpty = (values) => {
  if (
    !values.title ||
    !values.description ||
    !values.surveyCategory ||
    !values.surveySubCategory.length
  ) {
    return true;
  }

  if (values.surveyMode === "anonim" && !values.terms) {
    return true;
  }

  for (const question of values.questions) {
    if (!question.question) {
      return true;
    }

    if (question.options && question.options.length > 0) {
      for (const option of question.options) {
        if (!option.value.trim()) {
          return true;
        }
      }
    }
  }

  return false;
};
