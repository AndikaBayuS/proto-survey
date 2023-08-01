import { CloseIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Center,
  FormControl,
  FormLabel,
  HStack,
  IconButton,
  Input,
  Select,
  Text,
  Textarea,
  useDisclosure,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { Select as ReactSelect } from "chakra-react-select";
import { Field, FieldArray, Form, Formik } from "formik";
import { useRouter } from "next/router";
import useSWR from "swr";

import CreateQuestion from "@/components/forms/CreateQuestion";
import SubmitAlert from "@/components/fragments/SubmitAlert";
import SurveyMode from "@/components/fragments/SurveyMode";
import fetcher from "@/lib/fetcher";
import {
  BUTTON_ATTRIBUTES,
  SURVEY_CATEGORY,
  SURVEY_SUBCATEGORY,
} from "@/utils/constants";
import { updateSurvey } from "@/utils/fetch";
import { areFieldsEmpty, handleEnterKey, toTitleCase } from "@/utils/helper";

import { MAX_SELECTED, maxSelectedOptions } from "./constants";

export default function EditSurvey() {
  const router = useRouter();
  const toast = useToast();
  const { uuid } = router.query;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data, error } = useSWR(`/api/survey/edit/${uuid}`, fetcher);

  if (!data?.questions.length) return <div>Loading...</div>;
  if (error) return <div>Failed to load</div>;

  const handleDeleteQuestion = (values, index, setFieldValue) => {
    const questions = [...values.questions];
    questions[index].deleteQuestion = true;
    setFieldValue("questions", questions);
  };

  return data?.responses.length ? (
    <Center flexDirection="column" gap={5}>
      <Text fontSize="lg">
        Anda tidak bisa mengubah survei ini karena sudah ada responden yang
        mengisi survei anda!
      </Text>
      <Button colorScheme="messenger" onClick={() => router.push("/profile")}>
        Kembali
      </Button>
    </Center>
  ) : (
    <Box bgColor="white" p={5} rounded="lg">
      <Formik
        initialValues={{
          title: data?.survey?.title,
          description: data?.survey?.description,
          terms: data?.survey?.terms || "",
          surveyCategory: data?.survey?.category || "",
          surveySubCategory: data?.survey?.subCategory || [],
          surveyMode: data?.survey?.surveyMode,
          questions:
            data?.questions.map((question) => ({
              questionsId: question.id || "",
              surveyId: question.surveyId,
              question: question.question,
              type: question.type,
              options: question.options,
              deleteQuestion: false,
            })) || [],
        }}
        onSubmit={(values) => {
          updateSurvey(values).then(() => {
            onClose();
            router.push("/profile");
            toast({
              title: 'Sukses!',
              description: "Survei berhasil diperbarui",
              status: 'success',
              duration: 2000,
              isClosable: true,
            })
          });
        }}
      >
        {({ values, setFieldValue }) => {
          const isMax = values.surveySubCategory.length === MAX_SELECTED;
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
                    defaultValue={[
                      {
                        label: toTitleCase(values.surveyCategory),
                        value: values.surveyCategory,
                      },
                    ]}
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
                    defaultValue={values.surveySubCategory.map(
                      (subCategory) => ({
                        label: toTitleCase(subCategory),
                        value: subCategory,
                      })
                    )}
                    isMulti
                    onChange={(options) =>
                      setFieldValue(
                        "surveySubCategory",
                        options.map((option) => option.value)
                      )
                    }
                    options={isMax ? maxSelectedOptions : SURVEY_SUBCATEGORY}
                    variant="filled"
                  />
                </FormControl>

                <SurveyMode isDisabled surveyMode={values.surveyMode} />

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
                          <Button
                            onClick={() =>
                              push({
                                surveyId: data?.questions[0].surveyId,
                                question: "",
                                type: "text",
                                isNew: true,
                              })
                            }
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
                  colorScheme="gray"
                  onClick={() => router.push("/profile")}
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
                  Perbarui Survei
                </Button>
              </HStack>

              <SubmitAlert
                btnSubmitText="Ya, Perbarui Survei"
                description="Apakah anda yakin ingin memperbarui survei ini?"
                isOpen={isOpen}
                onClose={onClose}
                title="Perbarui Survei"
              />
            </Form>
          );
        }}
      </Formik>
    </Box>
  );
}
