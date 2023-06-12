import { useRouter } from "next/router";
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
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { Select as ReactSelect } from "chakra-react-select";
import { Field, FieldArray, Form, Formik, FormikHelpers } from "formik";
import useSWR from "swr";

import SurveyMode from "@/src/components/common/SurveyMode";
import CreateQuestion from "@/src/components/forms/CreateQuestion";
import {
  EditSurveyProps,
  QuestionValues,
  SurveyProps,
  SurveyQuestion,
} from "@/src/global/interfaces";
import fetcher from "@/src/lib/fetcher";
import { updateSurvey } from "@/src/utils/fetch";
import { handleEnterKey, toTitleCase } from "@/src/utils/helper";

import { SURVEY_CATEGORY, SURVEY_SUBCATEGORY } from "../CreateSurvey/constants";

import { buttonAttributes } from "./constants";

const EditSurvey = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data, error } = useSWR<EditSurveyProps>(
    `/api/survey/edit/${id}`,
    fetcher
  );

  if (!data?.questions.length) return <div>Loading...</div>;
  if (error) return <div>Failed to load</div>;

  const handleDeleteQuestion = (
    values: SurveyProps,
    index: number,
    setFieldValue: any
  ) => {
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
            data?.questions.map((question: SurveyQuestion) => ({
              questionsId: question.id || "",
              surveyId: question.surveyId,
              question: question.question,
              type: question.type,
              options: question.options,
              deleteQuestion: false,
            })) || [],
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
        {({ values, setFieldValue }) => {
          console.log(values);
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
                    options={SURVEY_CATEGORY}
                    variant="filled"
                    defaultValue={[{
                      label: toTitleCase(values.surveyCategory[0]),
                      value: values.surveyCategory[0],
                    }]}
                    onChange={(options: any) =>
                      setFieldValue(
                        "surveyCategory",
                        options.value
                      )
                    }
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Sub-kategori Survei</FormLabel>
                  <ReactSelect
                    isMulti
                    colorScheme="messenger"
                    options={SURVEY_SUBCATEGORY}
                    variant="filled"
                    defaultValue={values.surveySubCategory.map((subCategory) => ({
                      label: toTitleCase(subCategory),
                      value: subCategory,
                    }))}
                    onChange={(options: any) =>
                      setFieldValue(
                        "surveySubCategory",
                        options.map((o: any) => o.value)
                      )
                    }
                  />
                </FormControl>

                <SurveyMode surveyMode={values.surveyMode} />

                <Box w="full">
                  <FieldArray name="questions">
                    {({ remove, push, form }) => {
                      const { values, setFieldValue } = form;
                      return (
                        <VStack alignItems="start" spacing={3}>
                          {values.questions.map(
                            (_question: QuestionValues, index: number) => (
                              <FormControl key={index} isRequired>
                                <FormLabel htmlFor={`questions.${index}`}>
                                  Pertanyaan {index + 1}
                                </FormLabel>
                                <HStack w="full">
                                  <CreateQuestion
                                    name={`questions[${index}].question`}
                                    options={_question.options}
                                    setFieldValue={setFieldValue}
                                    target={`questions[${index}].options`}
                                    type={_question.type}
                                  />
                                  <IconButton
                                    aria-label="Hapus Pertanyaan"
                                    colorScheme="red"
                                    disabled={index === 0}
                                    icon={<CloseIcon />}
                                    size="sm"
                                    variant="outline"
                                    onClick={() =>
                                      handleDeleteQuestion(
                                        values,
                                        index,
                                        setFieldValue
                                      )
                                    }
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

              <HStack justifyContent="end" marginTop={10}>
                <Button
                  colorScheme="red"
                  size="md"
                  variant="outline"
                  onClick={() => router.push("/")}
                >
                  Batal
                </Button>
                <Button colorScheme="messenger" size="md" type="submit">
                  Perbarui Survei
                </Button>
              </HStack>
            </Form>
          );
        }}
      </Formik>
    </Box>
  );
};

export default EditSurvey;
