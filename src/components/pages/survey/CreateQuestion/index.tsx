import { Box, Input } from "@chakra-ui/react";
import { Field } from "formik";

import CreateOption from "@/src/components/forms/CreateOption";
import { QuestionTypeInterface } from "@/src/interfaces/components/pages/questiontype.interface";

const CreateQuestion = ({
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
        <CreateOption
          name={name}
          options={options}
          setFieldValue={setFieldValue}
          target={target}
        />
      )}
    </Box>
  );
};

export default CreateQuestion;
