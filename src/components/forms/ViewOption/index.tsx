import { Box, Input } from "@chakra-ui/react";

import CheckboxOption from "./fragments/CheckboxOption";
import RadioOption from "./fragments/RadioOption";
import SelectOption from "./fragments/SelectOption";

const ViewOption = ({ options, type, fieldProps }: any) => {
  const questiontType = (() => {
    switch (type) {
      case "checkbox":
        return <CheckboxOption options={options} fieldProps={fieldProps} />;
      case "radio":
        return <RadioOption options={options} fieldProps={fieldProps} />;
      case "select":
        return <SelectOption options={options} fieldProps={fieldProps} />;
      default:
        return (
          <Input
            placeholder="Tulis jawaban"
            name={fieldProps.name}
            onChange={fieldProps.onChange}
            onBlur={fieldProps.onBlur}
          />
        );
    }
  })();

  return <Box>{questiontType}</Box>;
};

export default ViewOption;
