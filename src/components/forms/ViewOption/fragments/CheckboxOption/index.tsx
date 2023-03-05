import { Checkbox, CheckboxGroup, VStack } from "@chakra-ui/react";

const CheckboxOption = ({ options, fieldProps }: any) => {
  return (
    <CheckboxGroup colorScheme="blue">
      <VStack alignItems={"start"}>
        {options.map((option: any) => (
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
