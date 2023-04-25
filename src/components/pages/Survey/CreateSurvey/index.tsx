import { useRouter } from "next/router";
import { CloseIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  HStack,
  IconButton,
  Input,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { Field, FieldArray, Form, Formik } from "formik";

import CreateQuestion from "@/src/components/forms/CreateQuestion";
import { CreateValues, QuestionValues } from "@/src/global/interfaces";
import { createSurvey } from "@/src/utils/fetch";
import { handleEnterKey } from "@/src/utils/helper";

import { buttonAttributes } from "./constants";

const CreateSurvey = () => {
  const router = useRouter();

  const areFieldsEmpty = (values: CreateValues) => {
    if (!values.title || !values.description) {
      return true;
    }

    for (const question of values.questions) {
      if (!question.question) {
        return true;
      }

      if (question.options && question.options.length > 0) {
        for (const option of question.options) {
          if (!option.value.trim()) return true;
        }
      }
    }

    return false;
  };

  return (
    <Box bgColor={"white"} rounded={"lg"} p={5}>
      <Formik
        initialValues={{
          title: "",
          description: "",
          questions: [{ question: "", type: "text" }],
        }}
        onSubmit={(values: CreateValues) => {
          createSurvey(values);
          router.push("/");
        }}
      >
        {({ values }) => (
          <Form onKeyDown={handleEnterKey}>
            <VStack alignItems={"start"} spacing={3}>
              <FormControl isRequired>
                <FormLabel htmlFor="title">Judul Survei</FormLabel>
                <Field
                  as={Input}
                  id="title"
                  name="title"
                  placeholder="Masukkan judul survei"
                  variant="filled"
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel htmlFor="description">Deskripsi Survei</FormLabel>
                <Field
                  as={Textarea}
                  id="description"
                  name="description"
                  placeholder="Masukkan deskripsi survei"
                  variant="filled"
                />
              </FormControl>

              <Box w="full">
                <FieldArray name="questions">
                  {({ remove, push, form }) => {
                    return (
                      <VStack alignItems={"start"} spacing={3}>
                        {form.values.questions.map(
                          (_question: QuestionValues, index: number) => (
                            <FormControl key={index} isRequired>
                              <FormLabel htmlFor={`questions.${index}`}>
                                Pertanyaan {index + 1}
                              </FormLabel>
                              <HStack w={"full"}>
                                <CreateQuestion
                                  type={_question.type}
                                  name={`questions[${index}].question`}
                                  options={_question.options}
                                  setFieldValue={form.setFieldValue}
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
              <Button
                type="submit"
                colorScheme={"telegram"}
                disabled={areFieldsEmpty(values)}
                size={"md"}
              >
                Buat Survei
              </Button>
            </HStack>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default CreateSurvey;
