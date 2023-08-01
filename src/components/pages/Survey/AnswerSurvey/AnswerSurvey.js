import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Checkbox,
  FormControl,
  FormLabel,
  HStack,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { Field, FieldArray, Form, Formik } from "formik";
import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";
import useSWR from "swr";

import ViewOption from "@/components/forms/ViewOption";
import Loading from "@/components/fragments/Loading";
import SubmitAlert from "@/components/fragments/SubmitAlert";
import SuccessAlert from "@/components/fragments/SuccessAlert";
import SurveyError from "@/components/pages/Error/SurveyError";
import fetcher from "@/lib/fetcher";
import { countPoints,handleEnterKey } from "@/utils/helper";

export default function AnswerSurvey() {
  const router = useRouter();
  const { uuid } = router.query;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(true);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: successIsOpen,
    onOpen: successOnOpen,
    onClose: successOnClose,
  } = useDisclosure();
  const { data, error, isLoading } = useSWR(`/api/survey/${uuid}`, fetcher);

  useEffect(() => {
    if (data?.survey?.surveyMode === "anonim") setAcceptTerms(false);
  }, [data?.survey?.surveyMode]);

  if (isLoading) return <Loading />;
  if (error) return <SurveyError status={error.status} />;

  const submitAnswer = async (values) => {
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

  const isFormFullyFilled = (values) => {
    return values.some((question) => !question.answer || question.answer.length === 0);
  };

  return (
    <VStack spacing={5}>
      {data?.survey.surveyMode === "anonim" && (
        <Alert rounded="md" status="warning">
          <AlertIcon />
          <Text fontWeight="semibold">
            Data diri anda tidak akan dikirimkan saat mengisi survei ini.
          </Text>
        </Alert>
      )}
      <Box bgColor="white" p={5} rounded="lg" w="full">
        <VStack alignItems="start">
          <Text fontSize="lg" fontWeight="semibold">
            {data?.survey.title}
          </Text>
          <Text>{data?.survey.description}</Text>
        </VStack>
      </Box>

      {data?.survey.surveyMode === "anonim" && (
        <Box bgColor="white" p={3} rounded="md" w="full">
          <Text fontWeight="semibold">Persetujuan Responden</Text>
          <Box
            bgColor="messenger.50"
            maxH="12rem"
            mt={3}
            overflowX="auto"
            p={5}
            rounded="md"
            w="full"
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
          alignItems="center"
          flexDirection="column"
          height="15rem"
          justifyContent="center"
          rounded="md"
          status="info"
          textAlign="center"
          variant="subtle"
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
        <Box bgColor="white" p={5} rounded="lg" w="full">
          <Formik
            initialValues={{
              questions:
                data?.questions.map((question) => ({
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
              submitAnswer(values.questions);
            }}
          >
            <Fragment>
              <Form onKeyDown={handleEnterKey}>
                <FieldArray name="questions">
                  {(arrayHelpers) => (
                    <VStack alignItems="start" spacing={3}>
                      {data?.questions.map((question, index) => (
                        <Field key={index} name={`questions.${index}.answer`}>
                          {({ field }) => (
                            <FormControl id={`questions.${index}.answer`}>
                              <FormLabel
                                fontWeight="semibold"
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
                      ))}

                      <HStack justifyContent="end" marginTop={10} w="full">
                        <Button
                          colorScheme="red"
                          onClick={() => router.push("/")}
                          size="md"
                          variant="outline"
                        >
                          Batal
                        </Button>
                        <Button
                          colorScheme="messenger"
                          isDisabled={isFormFullyFilled(arrayHelpers.form.values.questions)}
                          isLoading={isSubmitting}
                          onClick={onOpen}
                          size="md"
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
                onClose={onClose}
                title="Submit Jawaban"
              />
              <SuccessAlert
                description="Terimakasih telah mengisi survei ini."
                isOpen={successIsOpen}
                onClose={successOnClose}
                points={countPoints(data?.questions || [])}
              />
            </Fragment>
          </Formik>
        </Box>
      )}
    </VStack>
  );
}
