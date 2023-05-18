import { Checkbox, CheckboxGroup, VStack } from "@chakra-ui/react";

import { FormComponentProps } from "@/src/global/interfaces";

const CheckboxOption = ({ options, fieldProps }: FormComponentProps) => {
  return (
    <CheckboxGroup colorScheme="messenger">
      <VStack alignItems="start">
        {options.map((option) => (
          <Checkbox
            key={option.id}
            name={fieldProps.name}
            value={option.value}
            onBlur={fieldProps.onBlur}
            onChange={fieldProps.onChange}
          >
            {option.value}
          </Checkbox>
        ))}
      </VStack>
    </CheckboxGroup>
  );
};

export default CheckboxOption;
