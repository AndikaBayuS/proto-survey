import { Box, FormControl, FormLabel, Text, Textarea } from "@chakra-ui/react";
import { Field } from "formik";
import { Fragment } from "react";

import { SURVEY_MODE } from "../../pages/Survey/CreateSurvey/constants";
import RadioCard from "../../pages/Survey/CreateSurvey/fragments/RadioCard";
import RadioGroup from "../../pages/Survey/CreateSurvey/fragments/RadioGroup";

interface SurveyModeProps {
  surveyMode: string;
}

const SurveyMode = ({ surveyMode }: SurveyModeProps) => {
  const isAnonim = surveyMode === "anonim";
  const modeTitle = isAnonim ? "Mode Anonim" : "Mode Normal";
  const modeDescription = isAnonim
    ? "Ketika survey ini berada dalam mode anonim, maka data dari responden tidak akan ditampilkan untuk melindungi privasi mereka."
    : "Ketika survey berada dalam mode normal, maka data dari responden akan ditampilkan secara terbuka, sehingga identitas mereka dapat diketahui.";

  return (
    <Box w={"full"}>
      <Text fontWeight={"semibold"}>Mode Survei</Text>
      <Box bgColor={"messenger.50"} mt={3} p={5} rounded={"md"} w="full">
        <Fragment>
          <Text fontWeight={"semibold"}>{modeTitle}</Text>
          <Text>{modeDescription}</Text>
        </Fragment>
      </Box>
      <RadioGroup display="flex" gridColumnGap={2} name="surveyMode" py={2}>
        {SURVEY_MODE.map(({ name, value }) => {
          return <RadioCard key={name} label={name} value={value} />;
        })}
      </RadioGroup>

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
};

export default SurveyMode;