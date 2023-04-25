import { v4 as uuidv4 } from "uuid";

export const handleAddOption = (
  values: any,
  setFieldValue: any,
  target: any
) => {
  setFieldValue(target, [...values, { id: uuidv4(), value: "" }]);
};

export const handleEditOption = (
  values: any,
  setFieldValue: any,
  target: any,
  updatedValue: any,
  id: any
) => {
  const updatedOptions = values.map((option: any) => {
    if (option.id === id) {
      return { ...option, value: updatedValue };
    }
    return option;
  });
  setFieldValue(target, updatedOptions);
};

export const handleDeleteOption = (
  values: any,
  setFieldValue: any,
  target: any,
  id: any
) => {
  setFieldValue(
    target,
    values.filter((option: any) => option.id !== id)
  );
};


export const handleEnterKey = (e: React.KeyboardEvent) => {
  if (e.key === "Enter") {
    e.preventDefault();
  }
};
