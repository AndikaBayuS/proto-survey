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
  VStack,
} from "@chakra-ui/react";
import { FieldArray, Form, Formik, FormikHelpers } from "formik";

import TextArea from "@/src/components/forms/TextArea";
import TextField from "@/src/components/forms/TextField";
import QuestionFormControl from "@/src/components/pages/survey/QuestionType";
import { CreateValues } from "@/src/interfaces/survey.interface";
import { createSurvey } from "@/src/utils/fetch";

import { buttonAttributes } from "./constants";

const Create = () => {
  const router = useRouter();
  const handleEnterKey = (e: any) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  return (
    <Container maxWidth={"container.xl"} py={5}>
      <Box bgColor={"white"} rounded={"lg"} p={5}>
        <Formik
          initialValues={{
            title: "",
            description: "",
            questions: [{ question: "", type: "text" }],
          }}
          onSubmit={(
            values: CreateValues,
            { setSubmitting }: FormikHelpers<CreateValues>
          ) => {
            setTimeout(() => {
              createSurvey(values);
              setSubmitting(false);
            }, 500);
            router.push("/");
          }}
        >
          <Form onKeyDown={handleEnterKey}>
            <VStack alignItems={"start"} spacing={3}>
              <FormControl isRequired>
                <FormLabel htmlFor="title">Judul Survei</FormLabel>
                <TextField
                  id="title"
                  name="title"
                  placeholder="Masukkan judul survei"
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel htmlFor="description">Deskripsi Survei</FormLabel>
                <TextArea
                  id="description"
                  name="description"
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
                                <QuestionFormControl
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
                Buat Survei
              </Button>
            </HStack>
          </Form>
        </Formik>
      </Box>
    </Container>
  );
};

export default Create;
