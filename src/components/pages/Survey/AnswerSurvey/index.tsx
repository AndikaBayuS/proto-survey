import { useRouter } from "next/router";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Center,
  Checkbox,
  FormControl,
  FormLabel,
  HStack,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { Field, FieldArray, Form, Formik } from "formik";
import { Fragment, useEffect, useState } from "react";
import useSWR from "swr";

import Skeleton from "@/src/components/common/Skeleton";
import SubmitAlert from "@/src/components/common/SubmitAlert";
import SuccessAlert from "@/src/components/common/SuccessAlert";
import ViewOption from "@/src/components/forms/ViewOption";
import PageNotFound from "@/src/components/pages/Error/PageNotFound";
import { SurveyQuestion } from "@/src/global/interfaces";
import fetcher from "@/src/lib/fetcher";
import { countPoints } from "@/src/utils/gamification";
import { handleEnterKey } from "@/src/utils/helper";

interface AnswerValues {
  questionsId: string;
  surveyId: string;
  question: string;
  type: string;
  options: any;
  answer: string;
}

interface Questions {
  id?: string;
  questionsId: string;
  surveyId: string;
  question: string;
  options: any;
  answer?: string;
  type: string;
}

interface AnswerSurvey {
  survey: {
    title: string;
    description: string;
    surveyMode: string;
    terms: string | null;
  };
  questions: Questions[];
}

const AnswerSurvey = () => {
  const router = useRouter();
  const { id } = router.query;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(true);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: successIsOpen,
    onOpen: successOnOpen,
    onClose: successOnClose,
  } = useDisclosure();
  const { data, error, isLoading } = useSWR<AnswerSurvey>(
    `/api/survey/${id}`,
    fetcher
  );

  useEffect(() => {
    if (data?.survey?.surveyMode === "anonim") setAcceptTerms(false);
  }, [data?.survey?.surveyMode]);

  if (isLoading) return <Skeleton />;
  if (error?.status == 403)
    return (
      <Center flexDir={"column"} gap={2} mt={50}>
        <Text fontSize={"2xl"} fontWeight={"semibold"}>
          Aksi Tidak Diijinkan
        </Text>
        <Text>Anda tidak bisa mengisi survei yang anda buat</Text>
      </Center>
    );
  if (error?.status == 404) return <PageNotFound />;

  const submitAnswer = async (values: AnswerValues[]) => {
    try {
      const body = { questions: values };
      await fetch("/api/survey/answer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      onClose();
      successOnOpen();
    } catch {
      console.log("error");
    }
    setIsSubmitting(false);
  };

  const isFormFullyFilled = (values: AnswerValues[]) => {
    return values.every(
      (question: AnswerValues) => question.answer.length !== 0
    );
  };

  return (
    <VStack spacing={5}>
      {data?.survey.surveyMode === "anonim" && (
        <Alert rounded={"md"} status="warning">
          <AlertIcon />
          <Text fontWeight={"semibold"}>
            Data diri anda tidak akan dikirimkan saat mengisi survei ini.
          </Text>
        </Alert>
      )}
      <Box bgColor={"white"} p={5} rounded={"lg"} w={"full"}>
        <VStack alignItems={"start"}>
          <Text fontSize={"lg"} fontWeight={"semibold"}>
            {data?.survey.title}
          </Text>
          <Text>{data?.survey.description}</Text>
        </VStack>
      </Box>

      {data?.survey.surveyMode === "anonim" && (
        <Box bgColor={"white"} p={3} rounded={"md"}>
          <Text fontWeight={"semibold"}>Persetujuan Responden</Text>
          <Box
            bgColor={"messenger.50"}
            maxH={"12rem"}
            mt={3}
            overflowX={"auto"}
            p={5}
            rounded={"md"}
            w={"full"}
          >
            <Text>{data?.survey.terms}</Text>
          </Box>
          <Checkbox mt={3} onChange={() => setAcceptTerms(!acceptTerms)}>
            Saya Setuju
          </Checkbox>
        </Box>
      )}

      {!acceptTerms && (
        <Alert
          alignItems={"center"}
          flexDirection={"column"}
          height={"15rem"}
          justifyContent={"center"}
          rounded={"md"}
          status={"info"}
          textAlign={"center"}
          variant={"subtle"}
        >
          <AlertIcon boxSize="40px" mr={0} />
          <AlertTitle fontSize="lg" mb={1} mt={4}>
            Informasi
          </AlertTitle>
          <AlertDescription maxWidth="sm">
            Pertanyaan survei akan muncul ketika anda setuju dengan{" "}
            <b>Persetujuan Responden</b>
          </AlertDescription>
        </Alert>
      )}

      {acceptTerms && (
        <Box bgColor={"white"} p={5} rounded={"lg"} w={"full"}>
          <Formik
            initialValues={{
              questions:
                data?.questions.map((question: SurveyQuestion) => ({
                  questionsId: question.id || "",
                  surveyId: question.surveyId,
                  question: question.question,
                  type: question.type,
                  options: question.options,
                  answer: "",
                })) || [],
            }}
            onSubmit={(values) => {
              setIsSubmitting(true);
              submitAnswer(values.questions!);
            }}
          >
            <Fragment>
              <Form onKeyDown={handleEnterKey}>
                <FieldArray name="questions">
                  {(arrayHelpers) => (
                    <VStack alignItems={"start"} spacing={3}>
                      {data?.questions.map(
                        (question: SurveyQuestion, index: number) => (
                          <Field key={index} name={`questions.${index}.answer`}>
                            {({ field }: { field: any }) => (
                              <FormControl id={`questions.${index}.answer`}>
                                <FormLabel
                                  fontWeight={"semibold"}
                                  htmlFor={`questions.${index}.answer`}
                                >
                                  {index + 1}. {question.question}
                                </FormLabel>
                                <ViewOption
                                  fieldProps={field}
                                  options={question.options}
                                  type={question.type}
                                />
                              </FormControl>
                            )}
                          </Field>
                        )
                      )}

                      <HStack justifyContent={"end"} marginTop={10} w={"full"}>
                        <Button
                          colorScheme={"red"}
                          size={"md"}
                          variant={"outline"}
                          onClick={() => router.push("/")}
                        >
                          Batal
                        </Button>
                        <Button
                          colorScheme="messenger"
                          isLoading={isSubmitting}
                          size={"md"}
                          disabled={
                            !isFormFullyFilled(
                              arrayHelpers.form.values.questions
                            ) || isSubmitting
                          }
                          onClick={onOpen}
                        >
                          Submit
                        </Button>
                      </HStack>
                    </VStack>
                  )}
                </FieldArray>
              </Form>
              <SubmitAlert
                btnSubmitText="Ya, Submit"
                description="Anda hampir selesai! Apakah Anda ingin melihat kembali jawaban Anda sebelum submit?"
                isOpen={isOpen}
                title="Submit Jawaban"
                onClose={onClose}
              />
              <SuccessAlert
                description="Terimakasih telah mengisi survei ini."
                isOpen={successIsOpen}
                points={countPoints(data?.questions || [])}
                onClose={successOnClose}
              />
            </Fragment>
          </Formik>
        </Box>
      )}
    </VStack>
  );
};

export default AnswerSurvey;
