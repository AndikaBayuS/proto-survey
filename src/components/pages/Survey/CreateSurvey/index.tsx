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
  Select,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { Field, FieldArray, Form, Formik, FormikProps } from "formik";
import { ChangeEvent } from "react";
import { v4 as uuidv4 } from "uuid";

import CreateQuestion from "@/src/components/forms/CreateQuestion";
import { CreateValues, QuestionValues } from "@/src/global/interfaces";
import { createSurvey } from "@/src/utils/fetch";
import { handleEnterKey } from "@/src/utils/helper";

import { buttonAttributes } from "./constants";

const CreateSurvey = () => {
  const router = useRouter();

  const handleQuestionTypeChange = (
    event: ChangeEvent<HTMLSelectElement>,
    index: number,
    form: FormikProps<CreateValues>
  ) => {
    const selectedType = event.target.value;
    form.setFieldValue(`questions[${index}].type`, selectedType);

    if (selectedType === "radio" || selectedType === "checkbox") {
      form.setFieldValue(`questions[${index}].options`, [
        { id: uuidv4(), value: "" },
        { id: uuidv4(), value: "" },
      ]);
    } else {
      form.setFieldValue(`questions[${index}].options`, undefined);
    }
  };

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
                              <HStack w={"full"} alignItems={"start"}>
                                <CreateQuestion
                                  type={_question.type}
                                  name={`questions[${index}].question`}
                                  options={_question.options}
                                  setFieldValue={form.setFieldValue}
                                  target={`questions[${index}].options`}
                                />
                                <Select
                                  w={"40%"}
                                  value={_question.type}
                                  onChange={(e) =>
                                    handleQuestionTypeChange(e, index, form)
                                  }
                                >
                                  {buttonAttributes.map((attribute, idx) => (
                                    <option key={idx} value={attribute.type}>
                                      {attribute.label}
                                    </option>
                                  ))}
                                </Select>
                                <IconButton
                                  icon={<CloseIcon />}
                                  aria-label="Hapus Pertanyaan"
                                  colorScheme={"red"}
                                  variant={"outline"}
                                  disabled={index === 0}
                                  onClick={() => remove(index)}
                                />
                              </HStack>
                            </FormControl>
                          )
                        )}
                        <Button
                          onClick={() => push({ question: "", type: "text" })}
                        >
                          Tambah Pertanyaan
                        </Button>
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
