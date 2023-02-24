export const handleAddOption = (
  values: any,
  setFieldValue: any,
  target: any
) => {
  const newOptions = [...values, "Pilihan Baru"];
  setFieldValue(target, newOptions);
};

export const handleEditOption = (
  values: any,
  setFieldValue: any,
  target: any,
  updatedValue: any,
  index: any
) => {
  const newOptions = [...values];
  newOptions[index] = updatedValue;
  setFieldValue(target, newOptions);
};
