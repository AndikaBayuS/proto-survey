import { Box, Text } from "@chakra-ui/react";

import SurveyCheckbox from "@/src/components/forms/SurveyCheckbox";
import TextField from "@/src/components/forms/TextField";
import { QuestionTypeInterface } from "@/src/interfaces/components/pages/questiontype.interface";

const QuestionType = ({
  type,
  name,
  options,
  setFieldValue,
  target,
}: QuestionTypeInterface) => {
  return (
    <Box w="full">
      {type === "checkbox" ? (
        <SurveyCheckbox
          name={name}
          options={options}
          setFieldValue={setFieldValue}
          target={target}
        />
      ) : type === "radio" ? (
        <Text>Ini pertanyaan Radio</Text>
      ) : (
        <TextField id={name} name={name} placeholder="Masukkan pertanyaan" />
      )}
    </Box>
  );
};

export default QuestionType;
