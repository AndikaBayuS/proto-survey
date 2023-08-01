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
import { Select as ReactSelect } from "chakra-react-select";
import { Field, FieldArray, Form, Formik } from "formik";
import { useRouter } from "next/router";

import CreateQuestion from "@/components/forms/CreateQuestion";
import SubmitAlert from "@/components/fragments/SubmitAlert";
import SuccessAlert from "@/components/fragments/SuccessAlert";
import SurveyMode from "@/components/fragments/SurveyMode";
import {
  BUTTON_ATTRIBUTES,
  SURVEY_CATEGORY,
  SURVEY_SUBCATEGORY,
} from "@/utils/constants";
import { createSurvey } from "@/utils/fetch";
import {
  areFieldsEmpty,
  countPoints,
  handleEnterKey,
  handleQuestionTypeChange,
} from "@/utils/helper";

import { DEFAULT_QUESTION } from "./constants";

export default function CreateSurvey() {
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
          surveyCategory: "",
          surveySubCategory: [],
          questions: [DEFAULT_QUESTION],
        }}
        onSubmit={async (values) => {
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

                <FormControl>
                  <FormLabel>Kategori Survei</FormLabel>
                  <ReactSelect
                    colorScheme="messenger"
                    onChange={(options) =>
                      setFieldValue("surveyCategory", options.value)
                    }
                    options={SURVEY_CATEGORY}
                    variant="filled"
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Sub-kategori Survei</FormLabel>
                  <ReactSelect
                    colorScheme="messenger"
                    isMulti
                    onChange={(options) =>
                      setFieldValue(
                        "surveySubCategory",
                        options.map((option) => option.value)
                      )
                    }
                    options={SURVEY_SUBCATEGORY}
                    variant="filled"
                  />
                </FormControl>

                <SurveyMode surveyMode={values.surveyMode} />

                <Box w="full">
                  <FieldArray name="questions">
                    {({ remove, push, form }) => {
                      return (
                        <VStack alignItems="start" spacing={3}>
                          {form.values.questions.map((question, index) => (
                            <FormControl isRequired key={index}>
                              <FormLabel htmlFor={`questions.${index}`}>
                                Pertanyaan {index + 1}
                              </FormLabel>
                              <HStack alignItems="start" w="full">
                                <CreateQuestion
                                  name={`questions[${index}].question`}
                                  options={question.options}
                                  setFieldValue={form.setFieldValue}
                                  target={`questions[${index}].options`}
                                  type={question.type}
                                />
                                <Select
                                  onChange={(e) =>
                                    handleQuestionTypeChange(e, index, form)
                                  }
                                  value={question.type}
                                  w="40%"
                                >
                                  {BUTTON_ATTRIBUTES.map((attribute, idx) => (
                                    <option key={idx} value={attribute.type}>
                                      {attribute.label}
                                    </option>
                                  ))}
                                </Select>
                                <IconButton
                                  aria-label="Hapus Pertanyaan"
                                  colorScheme="gray"
                                  disabled={index === 0}
                                  icon={<CloseIcon />}
                                  onClick={() => remove(index)}
                                  variant="outline"
                                />
                              </HStack>
                            </FormControl>
                          ))}
                          <Button onClick={() => push(DEFAULT_QUESTION)}>
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
                  colorScheme="gray"
                  onClick={() => router.push("/")}
                  size="md"
                  variant="outline"
                >
                  Batal
                </Button>
                <Button
                  colorScheme="messenger"
                  isDisabled={areFieldsEmpty(values)}
                  onClick={onOpen}
                  size="md"
                >
                  Buat Survei
                </Button>
              </HStack>

              <SubmitAlert
                btnSubmitText="Ya, Buat Survei"
                description="Apakah anda yakin ingin membuat survei ini? Jika anda setuju, survei akan segera diterbitkan."
                isOpen={isOpen}
                onClose={onClose}
                title="Buat Survei"
              />
              <SuccessAlert
                description="Survey anda berhasil dibuat!"
                isOpen={successIsOpen}
                onClose={successOnClose}
                points={countPoints(values.questions)}
              />
            </Form>
          );
        }}
      </Formik>
    </Box>
  );
}
