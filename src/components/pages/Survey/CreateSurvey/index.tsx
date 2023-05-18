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
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { Field, FieldArray, Form, Formik } from "formik";

import SubmitAlert from "@/src/components/common/SubmitAlert";
import SuccessAlert from "@/src/components/common/SuccessAlert";
import SurveyMode from "@/src/components/common/SurveyMode";
import CreateQuestion from "@/src/components/forms/CreateQuestion";
import { CreateValues, QuestionValues } from "@/src/global/interfaces";
import { createSurvey } from "@/src/utils/fetch";
import { countPoints } from "@/src/utils/gamification";
import { handleEnterKey } from "@/src/utils/helper";

import CategoryField from "./fragments/CategoryField";
import { areFieldsEmpty, handleQuestionTypeChange } from "./actions";
import { buttonAttributes } from "./constants";

const CreateSurvey = () => {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: successIsOpen,
    onOpen: successOnOpen,
    onClose: successOnClose,
  } = useDisclosure();

  return (
    <Box bgColor="white" p={5} rounded="lg">
      <Formik
        initialValues={{
          title: "",
          description: "",
          surveyMode: "normal",
          terms: "",
          surveyCategory: [],
          surveySubCategory: [],
          questions: [{ question: "", type: "text" }],
        }}
        onSubmit={async (values: CreateValues) => {
          await createSurvey(values);
          onClose();
          successOnOpen();
        }}
      >
        {({ values, setFieldValue }) => {
          return (
            <Form onKeyDown={handleEnterKey}>
              <VStack alignItems="start" spacing={3}>
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

                <Field name="surveyCategory">
                  {({ field }: any) => (
                    <CategoryField
                      setFieldValue={setFieldValue}
                      surveyCategory={field.value}
                    />
                  )}
                </Field>

                <SurveyMode surveyMode={values.surveyMode} />

                <Box w="full">
                  <FieldArray name="questions">
                    {({ remove, push, form }) => {
                      return (
                        <VStack alignItems="start" spacing={3}>
                          {form.values.questions.map(
                            (_question: QuestionValues, index: number) => (
                              <FormControl key={index} isRequired>
                                <FormLabel htmlFor={`questions.${index}`}>
                                  Pertanyaan {index + 1}
                                </FormLabel>
                                <HStack alignItems="start" w="full">
                                  <CreateQuestion
                                    name={`questions[${index}].question`}
                                    options={_question.options}
                                    setFieldValue={form.setFieldValue}
                                    target={`questions[${index}].options`}
                                    type={_question.type}
                                  />
                                  <Select
                                    value={_question.type}
                                    w="40%"
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
                                    aria-label="Hapus Pertanyaan"
                                    colorScheme="red"
                                    disabled={index === 0}
                                    icon={<CloseIcon />}
                                    variant="outline"
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

              <HStack justifyContent="end" marginTop={10}>
                <Button
                  colorScheme="red"
                  size="md"
                  variant="outline"
                  onClick={() => router.push("/")}
                >
                  Batal
                </Button>
                <Button
                  colorScheme="messenger"
                  disabled={areFieldsEmpty(values)}
                  size="md"
                  onClick={onOpen}
                >
                  Buat Survei
                </Button>
              </HStack>

              <SubmitAlert
                btnSubmitText="Ya, Buat Survei"
                description="Apakah anda yakin ingin membuat survei ini? Jika anda setuju, survei akan segera diterbitkan."
                isOpen={isOpen}
                title="Buat Survei"
                onClose={onClose}
              />
              <SuccessAlert
                description="Survey anda berhasil dibuat!"
                isOpen={successIsOpen}
                points={countPoints(values.questions)}
                onClose={successOnClose}
              />
            </Form>
          );
        }}
      </Formik>
    </Box>
  );
};

export default CreateSurvey;
