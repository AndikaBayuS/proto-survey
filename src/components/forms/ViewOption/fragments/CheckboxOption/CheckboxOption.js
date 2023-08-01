import { Checkbox, CheckboxGroup, VStack } from "@chakra-ui/react";

export default function CheckboxOption({ options, fieldProps }) {
  return (
    <CheckboxGroup colorScheme="messenger">
      <VStack alignItems="start">
        {options.map((option) => (
          <Checkbox
            key={option.id}
            name={fieldProps.name}
            onBlur={fieldProps.onBlur}
            onChange={fieldProps.onChange}
            value={option.value}
          >
            {option.value}
          </Checkbox>
        ))}
      </VStack>
    </CheckboxGroup>
  );
}
