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
  Text,
  VStack,
} from "@chakra-ui/react";
import { Questions } from "@prisma/client";
import { Field, FieldArray, FieldProps, Form, Formik } from "formik";
import { GetStaticPaths, GetStaticProps } from "next";

interface Props {
  questions: Questions[] | any;
}

interface Values {
  id: string;
  questionId: string;
  surveyId: string;
  question: string;
  answer: string;
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{ params: { id: "cuid" } }],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  let questionId = null;
  let questionData = null;
  try {
    questionId = String(params?.id);
    questionData = await prisma.questions.findMany({
      where: {
        surveyId: questionId,
      },
    });
  } catch (err) {}

  return {
    props: {
      questions: questionData,
    },
  };
};

const Survey = ({ questions }: Props) => {
  const radioValues = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
  if (questions) {
    return (
      <Container maxWidth={"container.xl"} py={5}>
        <Box bgColor={"white"} p={5} rounded={"lg"}>
          <Formik
            initialValues={{
              questions: questions?.map((question: Values) => ({
                questionId: question.id,
                surveId: question.surveyId,
                question: question.question,
                answer: "",
              })),
            }}
            onSubmit={async (values) => {
              await new Promise((r) => setTimeout(r, 500));
              alert(JSON.stringify(values, null, 2));
            }}
          >
            <Form>
              <FieldArray name="question">
                {({ form }) => {
                  const { values } = form;

                  return (
                    <VStack alignItems={"start"} spacing={3}>
                      {values.questions?.map(
                        (question: Values, index: number) => (
                          <Field
                            name={`questions.${index}.answer`}
                            key={question.questionId}
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
                                  id={questions.questionId}
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