import { Select } from "@chakra-ui/react";

import { FormComponentProps } from "@/src/global/interfaces";

const SelectOption = ({ options, fieldProps }: FormComponentProps) => {
  return (
    <Select
      placeholder="Pilih Jawaban"
      name={fieldProps.name}
      onChange={fieldProps.onChange}
      onBlur={fieldProps.onBlur}
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
