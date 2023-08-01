import { Radio, RadioGroup, VStack } from "@chakra-ui/react";

export default function RadioOption ({ options, fieldProps }) {
  return (
    <RadioGroup colorScheme="messenger">
      <VStack alignItems="start">
        {options.map((option) => (
          <Radio
            key={option.id}
            name={fieldProps.name}
            onBlur={fieldProps.onBlur}
            onChange={fieldProps.onChange}
            value={option.value}
          >
            {option.value}
          </Radio>
        ))}
      </VStack>
    </RadioGroup>
  );
};
