import { RadioGroup as ChakraRadioGroup } from "@chakra-ui/react";
import { useField } from "formik";
import React from "react";

export default function RadioGroup({ name, children, ...props }) {
  const [field, , { setValue }] = useField({
    name: name || "",
    value: props.value,
  });

  const namedChildren = React.Children.map(children, (child) => {
    if (!React.isValidElement(child)) return child;

    return React.cloneElement(child, {
      name,
    });
  });

  return (
    <ChakraRadioGroup {...props} {...field} onChange={setValue}>
      {namedChildren}
    </ChakraRadioGroup>
  );
}
