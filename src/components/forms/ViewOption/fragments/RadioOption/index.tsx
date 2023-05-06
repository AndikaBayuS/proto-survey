import { Radio, RadioGroup, VStack } from "@chakra-ui/react";

import { FormComponentProps } from "@/src/global/interfaces";

const RadioOption = ({ options, fieldProps }: FormComponentProps) => {
  return (
    <RadioGroup colorScheme="messenger">
      <VStack alignItems={"start"}>
        {options.map((option) => (
          <Radio
            key={option.id}
            value={option.value}
            name={fieldProps.name}
            onChange={fieldProps.onChange}
            onBlur={fieldProps.onBlur}
          >
            {option.value}
          </Radio>
        ))}
      </VStack>
    </RadioGroup>
  );
};

export default RadioOption;
