import { Box, Input } from "@chakra-ui/react";
import { Field } from "formik";

import OptionsForm from "@/src/components/forms/CreateOptions";
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
      {type === "text" ? (
        <Field as={Input} name={name} placeholder="Masukkan pertanyaan" />
      ) : (
        <OptionsForm
          name={name}
          options={options}
          setFieldValue={setFieldValue}
          target={target}
        />
      )}
    </Box>
  );
};

export default QuestionType;
