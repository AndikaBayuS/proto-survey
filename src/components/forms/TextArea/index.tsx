import { Textarea } from "@chakra-ui/react";
import { Field } from "formik";

export default function TextArea({ id, name, placeholder }: any) {
  return (
    <Field
      as={Textarea}
      id={id}
      name={name}
      placeholder={placeholder}
      variant="filled"
    />
  );
}
