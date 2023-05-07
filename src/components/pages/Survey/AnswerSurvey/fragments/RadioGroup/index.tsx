import {
  RadioGroup as ChakraRadioGroup,
  RadioGroupProps as ChakraRadioGroupProps,
} from "@chakra-ui/react";
import { useField } from "formik";
import * as React from "react";

type Props = ChakraRadioGroupProps;
type ChildProps = {
  name: string;
};

const RadioGroup = ({ name, children, ...props }: Props) => {
  const [field, , { setValue }] = useField({
    name: name || "",
    value: props.value,
  });

  const namedChildren = React.Children.map(children, (child) => {
    if (!React.isValidElement<ChildProps>(child)) return;

    return React.cloneElement(child, {
      name,
    });
  });

  return (
    <ChakraRadioGroup {...props} {...field} onChange={setValue}>
      {namedChildren}
    </ChakraRadioGroup>
  );
};

export default RadioGroup;
