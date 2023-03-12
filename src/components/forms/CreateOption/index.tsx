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
} from "@/src/utils/helper";

const CreateOption = ({ name, options, setFieldValue, target }: any) => {
  const [updatedValue, setUpdatedValue] = useState("");

  const checkValue = (id: string) => {
    if (updatedValue === "") {
      handleDeleteOption(options, setFieldValue, target, id);
      setUpdatedValue("");
    } else {
      handleEditOption(options, setFieldValue, target, updatedValue, id);
      setUpdatedValue("");
    }
  };

  const isError = options.length < 2;

  return (
    <Box>
      <VStack alignItems={"start"} gap={3}>
        <FormControl isInvalid={isError}>
          <Field
            as={Input}
            name={name}
            placeholder="Masukkan pertanyaan"
            variant="filled"
          />
          <FormErrorMessage>Minimal harus ada 2 pilihan</FormErrorMessage>
        </FormControl>
        {options.map((option: any) => (
          <Flex key={option.id} gap={3}>
            <Input
              key={option.id}
              variant="filled"
              placeholder="Masukkan pilihan"
              defaultValue={option.value}
              onChange={(value) => {
                setUpdatedValue(value.target.value);
              }}
              onBlur={() => {
                checkValue(option.id);
              }}
            />
            <IconButton
              aria-label="delete-button"
              icon={<DeleteIcon />}
              onClick={() => {
                handleDeleteOption(options, setFieldValue, target, option.id);
              }}
            />
          </Flex>
        ))}
        <Button
          onClick={() => {
            handleAddOption(options, setFieldValue, target);
          }}
        >
          Tambah Pilihan
        </Button>
      </VStack>
    </Box>
  );
};

export default CreateOption;
