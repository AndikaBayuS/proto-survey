import { DeleteIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  IconButton,
  Input,
  VStack,
} from "@chakra-ui/react";
import { Field } from "formik";
import { useState } from "react";

import {
  handleAddOption,
  handleDeleteOption,
  handleEditOption,
} from "@/utils/helper";

export default function CreateOption({ name, options, setFieldValue, target }) {
  const [updatedValue, setUpdatedValue] = useState("");

  const checkValue = (id) => {
    if (updatedValue) {
      handleEditOption(options, setFieldValue, target, updatedValue, id);
      setUpdatedValue("");
    }
  };

  const isError = options.length < 2;

  return (
    <Box>
      <VStack alignItems="start" gap={3}>
        <FormControl isInvalid={isError}>
          <Field
            as={Input}
            name={name}
            placeholder="Masukkan pertanyaan"
            variant="filled"
          />
          <FormErrorMessage>Minimal harus ada 2 pilihan</FormErrorMessage>
        </FormControl>
        {options.map((option) => (
          <Flex gap={3} key={option.id}>
            <Input
              defaultValue={option.value}
              onBlur={() => checkValue(option.id)}
              onChange={(e) => setUpdatedValue(e.target.value)}
              placeholder="Masukkan pilihan"
              variant="filled"
            />
            <IconButton
              aria-label="delete-button"
              icon={<DeleteIcon />}
              onClick={() =>
                handleDeleteOption(options, setFieldValue, target, option.id)
              }
            />
          </Flex>
        ))}
        <Button onClick={() => handleAddOption(options, setFieldValue, target)}>
          Tambah Pilihan
        </Button>
      </VStack>
    </Box>
  );
}
