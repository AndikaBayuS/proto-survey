import {
  Box,
  Checkbox,
  CheckboxGroup,
  HStack,
  Radio,
  RadioGroup,
  Select,
  Text,
} from "@chakra-ui/react";

const ViewOptions = ({ options, type }: any) => {
  const questiontType = (() => {
    switch (type) {
      case "checkbox":
        return (
          <CheckboxGroup colorScheme="blue">
            <HStack>
              {options.map((option: any) => (
                <Checkbox key={option.id} value={option.value}>
                  {option.value}
                </Checkbox>
              ))}
            </HStack>
          </CheckboxGroup>
        );
      case "radio":
        return (
          <RadioGroup colorScheme="blue">
            <HStack>
              {options.map((option: any) => (
                <Radio key={option.id} value={option.value}>
                  {option.value}
                </Radio>
              ))}
            </HStack>
          </RadioGroup>
        );
      case "select":
        return (
          <Select placeholder="Pilih Jawaban">
            {options.map((option: any) => (
              <option key={option.id} value={option.value}>
                {option.value}
              </option>
            ))}
          </Select>
        );
      default:
        return <Text>Belum ada pilihan</Text>;
    }
  })();

  return <Box>{questiontType}</Box>;
};

export default ViewOptions;
