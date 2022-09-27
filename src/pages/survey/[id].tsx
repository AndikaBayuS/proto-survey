import { prisma } from "@/src/lib/prisma";
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
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
import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import { SurveyProps, SubmitValues } from "./survey.interface";

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{ params: { id: "cuid" } }],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  let surveyId = null;
  let questionData = null;
  try {
    surveyId = String(params?.id);
    questionData = await prisma.questions.findMany({
      where: {
        surveyId,
      },
    });
  } catch (err) {}

  return {
    props: {
      questions: questionData,
    },
  };
};

const Survey = ({ questions }: SurveyProps) => {
  const router = useRouter();
  const radioValues = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];

  const submitAnswer = async ({ questions }: SurveyProps) => {
    try {
      const body = { questions };
      await fetch("/api/survey/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      await router.push("/");
    } catch {
      console.log("error");
    }
  };

  if (questions) {
    return (
      <Container maxWidth={"container.xl"} py={5}>
        <Box bgColor={"white"} p={5} rounded={"lg"}>
          <Formik
            initialValues={{
              questions: questions?.map((question: SubmitValues) => ({
                questionsId: question.id,
                surveyId: question.surveyId,
                question: question.question,
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
                        (question: SubmitValues, index: number) => (
                          <Field
                            name={`questions.${index}.answer`}
                            key={question.questionsId}
                          >
                            {({ field }: FieldProps) => (
                              <FormControl id={`questions.${index}.answer`}>
                                <FormLabel
                                  htmlFor={`questions.${index}.answer`}
                                  fontWeight={"semibold"}
                                >
                                  {index + 1}. {question.question}
                                </FormLabel>
                                <RadioGroup
                                  {...field}
                                  id={questions.questionsId}
                                >
                                  <Stack direction={"row"}>
                                    {radioValues.map((value) => (
                                      <Radio
                                        {...field}
                                        value={value}
                                        key={value}
                                      >
                                        {value}
                                      </Radio>
                                    ))}
                                  </Stack>
                                </RadioGroup>
                              </FormControl>
                            )}
                          </Field>
                        )
                      )}
                      <Button
                        type="submit"
                        size={"sm"}
                        colorScheme={"telegram"}
                      >
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
  }
};

export default Survey;
