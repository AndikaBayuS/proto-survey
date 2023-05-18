import { Radio, RadioGroup, VStack } from "@chakra-ui/react";

import { FormComponentProps } from "@/src/global/interfaces";

const RadioOption = ({ options, fieldProps }: FormComponentProps) => {
  return (
    <RadioGroup colorScheme="messenger">
      <VStack alignItems="start">
        {options.map((option) => (
          <Radio
            key={option.id}
            name={fieldProps.name}
            value={option.value}
            onBlur={fieldProps.onBlur}
            onChange={fieldProps.onChange}
          >
            {option.value}
          </Radio>
        ))}
      </VStack>
    </RadioGroup>
  );
};

export default RadioOption;
