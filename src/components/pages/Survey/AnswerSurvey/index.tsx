import { useRouter } from "next/router";
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  VStack,
} from "@chakra-ui/react";
import {
  Field,
  FieldArray,
  FieldProps,
  Form,
  Formik,
  FormikHelpers,
} from "formik";

import ViewOption from "@/src/components/forms/ViewOption";
import { SurveyProps, SurveyQuestion } from "@/src/global/interfaces";

const AnswerSurvey = ({ questions }: SurveyProps) => {
  const router = useRouter();

  const submitAnswer = async ({ questions }: SurveyProps) => {
    try {
      const body = { questions };
      await fetch("/api/survey/answer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      await router.push("/");
    } catch {
      console.log("error");
    }
  };
  return (
    <Container maxWidth={"container.xl"} py={5}>
      <Box bgColor={"white"} p={5} rounded={"lg"}>
        <Formik
          initialValues={{
            questions: questions?.map((question: SurveyQuestion) => ({
              questionsId: question.id || "",
              surveyId: question.surveyId,
              question: question.question,
              type: question.type,
              options: question.options,
              answer: "",
            })),
          }}
          onSubmit={(
            values: SurveyProps,
            { setSubmitting }: FormikHelpers<SurveyProps>
          ) => {
            setTimeout(() => {
              submitAnswer(values);
              setSubmitting(false);
            }, 500);
          }}
        >
          <Form>
            <FieldArray name="question">
              {({ form }) => {
                const { values } = form;

                return (
                  <VStack alignItems={"start"} spacing={3}>
                    {values.questions?.map(
                      (question: SurveyQuestion, index: number) => (
                        <Field
                          name={`questions.${index}.answer`}
                          key={question.questionsId}
                        >
                          {({ field }: FieldProps) => {
                            return (
                              <FormControl id={`questions.${index}.answer`}>
                                <FormLabel
                                  htmlFor={`questions.${index}.answer`}
                                  fontWeight={"semibold"}
                                >
                                  {index + 1}. {question.question}
                                </FormLabel>
                                <ViewOption
                                  options={question.options}
                                  type={question.type}
                                  fieldProps={field}
                                />
                              </FormControl>
                            );
                          }}
                        </Field>
                      )
                    )}
                    <Button type="submit" size={"md"} colorScheme={"telegram"}>
                      Submit
                    </Button>
                  </VStack>
                );
              }}
            </FieldArray>
          </Form>
        </Formik>
      </Box>
    </Container>
  );
};

export default AnswerSurvey;
