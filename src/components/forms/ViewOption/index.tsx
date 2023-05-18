import { Box, Input } from "@chakra-ui/react";

import { ViewOptionInterface } from "@/src/global/interfaces";

import CheckboxOption from "./fragments/CheckboxOption";
import RadioOption from "./fragments/RadioOption";
import SelectOption from "./fragments/SelectOption";

const ViewOption = ({ options, type, fieldProps }: ViewOptionInterface) => {
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
            placeholder="Tulis jawaban"
            variant="filled"
            onBlur={fieldProps.onBlur}
            onChange={fieldProps.onChange}
          />
        );
    }
  })();

  return <Box>{questiontType}</Box>;
};

export default ViewOption;
