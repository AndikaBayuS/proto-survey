import { Box, Input } from "@chakra-ui/react";

import CheckboxOption from "./fragments/CheckboxOption";
import RadioOption from "./fragments/RadioOption";
import SelectOption from "./fragments/SelectOption";

export default function ViewOption({ options, type, fieldProps }) {
  const questiontType = (() => {
    switch (type) {
      case "checkbox":
        return <CheckboxOption fieldProps={fieldProps} options={options} />;
      case "radio":
        return <RadioOption fieldProps={fieldProps} options={options} />;
      case "select":
        return <SelectOption fieldProps={fieldProps} options={options} />;
      default:
        return (
          <Input
            name={fieldProps.name}
            onBlur={fieldProps.onBlur}
            onChange={fieldProps.onChange}
            placeholder="Tulis jawaban"
            variant="filled"
          />
        );
    }
  })();

  return <Box>{questiontType}</Box>;
}
