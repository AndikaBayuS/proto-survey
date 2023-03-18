import { Box, Input } from "@chakra-ui/react";
import { Field } from "formik";

import CreateOption from "@/src/components/forms/CreateOption";
import { CreateQuestionInterface } from "@/src/interfaces/components/pages/survey/createquestion.interface";

const CreateQuestion = ({
  type,
  name,
  options,
  setFieldValue,
  target,
}: CreateQuestionInterface) => {
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
