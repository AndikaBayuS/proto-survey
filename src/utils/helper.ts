import { v4 as uuidv4 } from "uuid";

export const handleAddOption = (
  values: any,
  setFieldValue: any,
  target: any
) => {
  const newOptions = [...values, { id: uuidv4(), value: "" }];
  setFieldValue(target, newOptions);
};

export const handleEditOption = (
  values: any,
  setFieldValue: any,
  target: any,
  updatedValue: any,
  id: any
) => {
  const index = values.findIndex((option: any) => option.id === id);
  const newOptions = [...values];
  newOptions[index].value = updatedValue;
  setFieldValue(target, newOptions);
};

export const handleDeleteOption = (
  values: any,
  setFieldValue: any,
  target: any,
  id: any
) => {
  const index = values.findIndex((option: any) => option.id === id);
  const newOptions = [...values];
  newOptions.splice(index, 1);
  setFieldValue(target, newOptions);
};
