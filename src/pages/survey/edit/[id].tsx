import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import { CloseIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  HStack,
  IconButton,
  Input,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { Field, FieldArray, Form, Formik, FormikHelpers } from "formik";

import CreateQuestion from "@/src/components/pages/survey/CreateQuestion";
import { SurveyProps, SurveyQuestion } from "@/src/interfaces/survey.interface";
import { prisma } from "@/src/lib/prisma";
import { updateSurvey } from "@/src/utils/fetch";

import { buttonAttributes } from "./constants";

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{ params: { id: "cuid" } }],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  let surveyId = String(params?.id);
  let questionData = null;
  let surveyData = null;

  try {
    questionData = await prisma.questions.findMany({
      where: {
        surveyId,
      },
    });
  } catch (err) {}

  try {
    surveyData = await prisma.surveys.findUnique({
      where: {
        id: surveyId,
      },
    });
  } catch (err) {}

  const surveys = JSON.parse(JSON.stringify(surveyData));

  return {
    props: {
      questions: questionData,
      survey: surveys,
    },
  };
};

const SurveyEdit = ({ questions, survey }: any) => {
  const router = useRouter();
  const handleEnterKey = (e: any) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  if (questions) {
    return (
      <Container maxWidth={"container.xl"} py={5}>
        <Box bgColor={"white"} rounded={"lg"} p={5}>
          <Formik
            initialValues={{
              title: survey.title,
              description: survey.description,
              questions: questions?.map((question: SurveyQuestion) => ({
                questionsId: question.id || "",
                surveyId: question.surveyId,
                question: question.question,
                type: question.type,
                options: question.options,
              })),
            }}
            onSubmit={(
              values: SurveyProps,
              { setSubmitting }: FormikHelpers<SurveyProps>
            ) => {
              setTimeout(() => {
                updateSurvey(values);
                setSubmitting(false);
              }, 500);
              router.push("/");
            }}
          >
            <Form onKeyDown={handleEnterKey}>
              <VStack alignItems={"start"} spacing={3}>
                <FormControl isRequired>
                  <FormLabel htmlFor="title">Judul Survei</FormLabel>
                  <Field
                    as={Input}
                    id="title"
                    name="title"
                    defaultValue={survey.title}
                    placeholder="Masukkan judul survei"
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel htmlFor="description">Deskripsi Survei</FormLabel>
                  <Field
                    as={Textarea}
                    id="description"
                    name="description"
                    defaultValue={survey.description}
                    placeholder="Masukkan deskripsi survei"
                  />
                </FormControl>

                <Box w="full">
                  <FieldArray name="questions">
                    {({ remove, push, form }) => {
                      const { values, setFieldValue } = form;
                      console.log(values);
                      return (
                        <VStack alignItems={"start"} spacing={3}>
                          {values.questions.map(
                            (_question: any, index: number) => (
                              <FormControl key={index} isRequired>
                                <FormLabel htmlFor={`questions.${index}`}>
                                  Pertanyaan {index + 1}
                                </FormLabel>
                                <HStack w={"full"}>
                                  <CreateQuestion
                                    type={_question.type}
                                    name={`questions[${index}].question`}
                                    options={_question.options}
                                    setFieldValue={setFieldValue}
                                    target={`questions[${index}].options`}
                                  />
                                  <IconButton
                                    icon={<CloseIcon />}
                                    aria-label="Hapus Pertanyaan"
                                    colorScheme={"red"}
                                    variant={"outline"}
                                    size={"sm"}
                                    disabled={index === 0}
                                    onClick={() => remove(index)}
                                  />
                                </HStack>
                              </FormControl>
                            )
                          )}
                          <HStack>
                            {buttonAttributes.map((attribute, index) => (
                              <Button
                                key={index}
                                size="md"
                                onClick={() =>
                                  push({
                                    question: "",
                                    type: attribute.type,
                                    options: attribute.options,
                                  })
                                }
                              >
                                {attribute.label}
                              </Button>
                            ))}
                          </HStack>
                        </VStack>
                      );
                    }}
                  </FieldArray>
                </Box>
              </VStack>

              <HStack marginTop={10} justifyContent={"end"}>
                <Button
                  colorScheme={"red"}
                  variant={"outline"}
                  size={"md"}
                  onClick={() => router.push("/")}
                >
                  Batal
                </Button>
                <Button type="submit" colorScheme={"telegram"} size={"md"}>
                  Perbarui Survei
                </Button>
              </HStack>
            </Form>
          </Formik>
        </Box>
      </Container>
    );
  }
};

export default SurveyEdit;
