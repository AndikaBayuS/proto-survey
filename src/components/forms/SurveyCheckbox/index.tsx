import {
  Box,
  Button,
  Editable,
  EditableInput,
  EditablePreview,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";

import { handleAddOption, handleEditOption } from "@/src/utils/helper";

import TextField from "../TextField";

const SurveyCheckbox = ({ name, options, setFieldValue, target }: any) => {
  const [updatedValue, setUpdatedValue] = useState("");
  return (
    <Box>
      <VStack alignItems={"start"} gap={3}>
        <TextField id={name} name={name} placeholder="Masukkan pertanyaan" />
        {options.map((option: any, index: any) => (
          <Editable
            key={index}
            defaultValue={option}
            onChange={(value) => {
              setUpdatedValue(value || option);
            }}
            onSubmit={() => {
              handleEditOption(
                options,
                setFieldValue,
                target,
                updatedValue,
                index
              );
              setUpdatedValue("");
            }}
            startWithEditView
          >
            <EditablePreview />
            <EditableInput />
          </Editable>
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

export default SurveyCheckbox;
