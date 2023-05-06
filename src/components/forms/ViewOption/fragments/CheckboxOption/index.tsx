import { Checkbox, CheckboxGroup, VStack } from "@chakra-ui/react";

import { FormComponentProps } from "@/src/global/interfaces";

const CheckboxOption = ({ options, fieldProps }: FormComponentProps) => {
  return (
    <CheckboxGroup colorScheme="messenger">
      <VStack alignItems={"start"}>
        {options.map((option) => (
          <Checkbox
            key={option.id}
            value={option.value}
            name={fieldProps.name}
            onChange={fieldProps.onChange}
            onBlur={fieldProps.onBlur}
          >
            {option.value}
          </Checkbox>
        ))}
      </VStack>
    </CheckboxGroup>
  );
};

export default CheckboxOption;
