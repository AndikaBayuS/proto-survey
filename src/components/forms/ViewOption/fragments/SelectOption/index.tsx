import { Select } from "@chakra-ui/react";

import { FormComponentProps } from "@/src/global/interfaces";

const SelectOption = ({ options, fieldProps }: FormComponentProps) => {
  return (
    <Select
      name={fieldProps.name}
      placeholder="Pilih Jawaban"
      onBlur={fieldProps.onBlur}
      onChange={fieldProps.onChange}
    >
      {options.map((option) => (
        <option key={option.id} value={option.value}>
          {option.value}
        </option>
      ))}
    </Select>
  );
};

export default SelectOption;
