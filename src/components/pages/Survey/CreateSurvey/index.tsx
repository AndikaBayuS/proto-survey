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
  Text,
  Textarea,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { Field, FieldArray, Form, Formik } from "formik";
import { Fragment } from "react";

import SubmitAlert from "@/src/components/common/SubmitAlert";
import SuccessAlert from "@/src/components/common/SuccessAlert";
import CreateQuestion from "@/src/components/forms/CreateQuestion";
import { CreateValues, QuestionValues } from "@/src/global/interfaces";
import { createSurvey } from "@/src/utils/fetch";
import { countPoints } from "@/src/utils/gamification";
import { handleEnterKey } from "@/src/utils/helper";

import CategoryField from "./fragments/CategoryField";
import RadioCard from "./fragments/RadioCard";
import RadioGroup from "./fragments/RadioGroup";
import { areFieldsEmpty, handleQuestionTypeChange } from "./actions";
import { buttonAttributes, SURVEY_MODE } from "./constants";

const CreateSurvey = () => {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: successIsOpen,
    onOpen: successOnOpen,
    onClose: successOnClose,
  } = useDisclosure();

  return (
    <Box bgColor={"white"} rounded={"lg"} p={5}>
      <Formik
        initialValues={{
          title: "",
          description: "",
          surveyMode: "normal",
          terms: null,
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
          const isAnonim = values.surveyMode === "anonim";
          const modeTitle = isAnonim ? "Mode Anonim" : "Mode Normal";
          const modeDescription = isAnonim
            ? "Ketika survey ini berada dalam mode anonim, maka data dari responden tidak akan ditampilkan untuk melindungi privasi mereka."
            : "Ketika survey berada dalam mode normal, maka data dari responden akan ditampilkan secara terbuka, sehingga identitas mereka dapat diketahui.";

          return (
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

                <Field name="surveyCategory">
                  {({ field }: any) => (
                    <CategoryField
                      setFieldValue={setFieldValue}
                      surveyCategory={field.value}
                    />
                  )}
                </Field>

                <Text fontWeight={"semibold"}>Mode Survei</Text>
                <Box w="full" bgColor={"messenger.50"} rounded={"md"} p={5}>
                  <Fragment>
                    <Text fontWeight={"semibold"}>{modeTitle}</Text>
                    <Text>{modeDescription}</Text>
                  </Fragment>
                </Box>
                <RadioGroup
                  name="surveyMode"
                  py={2}
                  display="flex"
                  gridColumnGap={2}
                >
                  {SURVEY_MODE.map(({ name, value }) => {
                    return <RadioCard key={name} value={value} label={name} />;
                  })}
                </RadioGroup>

                {values.surveyMode === "anonim" && (
                  <FormControl>
                    <FormLabel htmlFor="terms">Persetujuan Survei</FormLabel>
                    <Field
                      as={Textarea}
                      id="terms"
                      name="terms"
                      placeholder="Masukkan persetujuan survei"
                      variant="filled"
                    />
                  </FormControl>
                )}

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
                  colorScheme="messenger"
                  disabled={areFieldsEmpty(values)}
                  size={"md"}
                  onClick={onOpen}
                >
                  Buat Survei
                </Button>
              </HStack>

              <SubmitAlert
                title="Buat Survei"
                description="Apakah anda yakin ingin membuat survei ini? Jika anda setuju, survei akan segera diterbitkan."
                btnSubmitText="Ya, Buat Survei"
                isOpen={isOpen}
                onClose={onClose}
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
};

export default CreateSurvey;
