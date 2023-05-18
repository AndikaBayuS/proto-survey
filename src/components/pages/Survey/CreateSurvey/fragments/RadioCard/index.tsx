import {
  Box,
  chakra,
  Text,
  useRadio,
  useRadioGroupContext,
  UseRadioProps,
} from "@chakra-ui/react";
import { useField } from "formik";
import * as React from "react";

type Props = UseRadioProps & {
  label: string;
};

const RadioCard = React.forwardRef((props: Props, ref) => {
  const { label, name, ...radioProps } = props;
  const group = useRadioGroupContext();

  let isChecked = group.value.toString() === props.value?.toString();

  const [{ checked, ...field }] = useField({
    name: name || "",
    type: "radio",
    value: radioProps.value?.toString(),
    checked: isChecked,
  });

  const { state, getInputProps, getCheckboxProps, htmlProps, getLabelProps } =
    useRadio({
      isChecked: isChecked,
      ...field,
    });

  return (
    <chakra.label {...htmlProps} cursor="pointer">
      <input {...getInputProps({}, ref)} hidden />
      <Box
        {...getCheckboxProps()}
        bg={state.isChecked ? "messenger.100" : "transparent"}
        p={3}
        rounded="md"
      >
        <Text fontWeight="semibold">{label}</Text>
      </Box>
    </chakra.label>
  );
});

RadioCard.displayName = "RadioCard";
export default RadioCard;
