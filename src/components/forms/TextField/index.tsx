import { Input } from "@chakra-ui/react";
import { Field } from "formik";

export default function TextField({ id, name, placeholder }: any) {
  return (
    <Field
      as={Input}
      name={name}
      id={id}
      placeholder={placeholder}
      variant="filled"
    />
  );
}
