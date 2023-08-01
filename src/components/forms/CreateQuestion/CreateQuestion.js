import { Box, Input } from "@chakra-ui/react";
import { Field } from "formik";

import CreateOption from "@/components/forms/CreateOption";

export default function CreateQuestion({
  type,
  name,
  options,
  setFieldValue,
  target,
}) {
  return (
    <Box w="full">
      {type === "text" ? (
        <Field
          as={Input}
          name={name}
          placeholder="Masukkan pertanyaan"
          variant="filled"
        />
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
}
