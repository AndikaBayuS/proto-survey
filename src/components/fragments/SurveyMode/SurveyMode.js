import { Box, FormControl, FormLabel, Text, Textarea } from "@chakra-ui/react";
import { Field } from "formik";

import { SURVEY_MODE } from "@/utils/constants";

import RadioCard from "../RadioCard";
import RadioGroup from "../RadioGroup";
import { MODE_ANONYMOUS, MODE_NORMAL } from "./constants";

export default function SurveyMode({ surveyMode, isDisabled = false }) {
  return (
    <Box w="full">
      <Text fontWeight="semibold">Mode Survei</Text>
      <Box bgColor="messenger.50" mt={3} p={5} rounded="md" w="full">
        <Text fontWeight="semibold">Mode Normal</Text>
        <Text>{MODE_NORMAL}</Text>

        <Text fontWeight="semibold" marginTop={5}>
          Mode Anonim
        </Text>
        <Text>{MODE_ANONYMOUS}</Text>
      </Box>
      <RadioGroup display="flex" gridColumnGap={2} name="surveyMode" py={2}>
        {SURVEY_MODE.map(({ name, value }) => {
          return (
            <RadioCard
              isDisabled={isDisabled}
              key={name}
              label={name}
              value={value}
            />
          );
        })}
      </RadioGroup>

      {isDisabled && (
        <Text color="red.500" fontSize="xs">*Anda tidak bisa merubah mode survei!</Text>
      )}

      {surveyMode === "anonim" && (
        <FormControl>
          <FormLabel htmlFor="terms">Persetujuan Survei</FormLabel>
          <Field
            as={Textarea}
            id="terms"
            name="terms"
            placeholder="Masukkan persetujuan survei"
            variant="filled"
          />
        </FormControl>
      )}
    </Box>
  );
}
