import { Select } from "@chakra-ui/react";

export default function SelectOption({ options, fieldProps }) {
  return (
    <Select
      name={fieldProps.name}
      onBlur={fieldProps.onBlur}
      onChange={fieldProps.onChange}
      placeholder="Pilih Jawaban"
    >
      {options.map((option) => (
        <option key={option.id} value={option.value}>
          {option.value}
        </option>
      ))}
    </Select>
  );
}
