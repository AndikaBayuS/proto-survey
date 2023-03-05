import { Select } from "@chakra-ui/react";

const SelectOption = ({ options, fieldProps }: any) => {
  return (
    <Select
      placeholder="Pilih Jawaban"
      name={fieldProps.name}
      onChange={fieldProps.onChange}
      onBlur={fieldProps.onBlur}
    >
      {options.map((option: any) => (
        <option key={option.id} value={option.value}>
          {option.value}
        </option>
      ))}
    </Select>
  );
};

export default SelectOption;
