import {
  Box,
  chakra,
  Text,
  useRadio,
  useRadioGroupContext,
} from "@chakra-ui/react";
import { useField } from "formik";
import React, { forwardRef } from "react";

function RadioCard(props, ref) {
  const { label, name, isDisabled, ...radioProps } = props;
  const group = useRadioGroupContext();

  let isChecked = group.value.toString() === props.value?.toString();

  const [{ checked, ...field }] = useField({
    name: name || "",
    type: "radio",
    value: radioProps.value?.toString(),
    checked: isChecked,
  });

  const { state, getInputProps, getCheckboxProps, htmlProps } =
    useRadio({
      isChecked: isChecked,
      isDisabled: props.isDisabled,
      ...field,
    });

  return (
    <chakra.label {...htmlProps} cursor="pointer">
      <input {...getInputProps({}, ref)} hidden />
      <Box
        {...getCheckboxProps()}
        bg={state.isChecked ? "messenger.100" : "transparent"}
        opacity={props.isDisabled ? 0.5 : 1}
        p={3}
        rounded="md"
      >
        <Text fontWeight="semibold">{label}</Text>
      </Box>
    </chakra.label>
  );
}

RadioCard.displayName = "RadioCard";

export default forwardRef(RadioCard);
