import { Radio, RadioGroup, VStack } from "@chakra-ui/react";

const RadioOption = ({ options, fieldProps }: any) => {
  return (
    <RadioGroup colorScheme="blue">
      <VStack alignItems={"start"}>
        {options.map((option: any) => (
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