import { useRouter } from "next/router";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  HStack,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { Field, FieldArray, Form, Formik } from "formik";
import { Fragment, useState } from "react";
import useSWR from "swr";

import ViewOption from "@/src/components/forms/ViewOption";
import { SurveyQuestion } from "@/src/global/interfaces";
import fetcher from "@/src/lib/fetcher";
import { countPoints } from "@/src/utils/gamification";
import { handleEnterKey } from "@/src/utils/helper";

import SubmitAlert from "./SubmitAlert";
import SuccessAlert from "./SuccessAlert";

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
  };
  questions: Questions[];
}

const AnswerSurvey = () => {
  const router = useRouter();
  const { id } = router.query;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: successIsOpen,
    onOpen: successOnOpen,
    onClose: successOnClose,
  } = useDisclosure();
  const { data, error } = useSWR<AnswerSurvey>(`/api/survey/${id}`, fetcher);

  if (!data?.questions.length) return <div>Loading...</div>;
  if (error) return <div>Failed to load</div>;

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
      <Box bgColor={"white"} p={5} rounded={"lg"} w={"full"}>
        <VStack alignItems={"start"}>
          <Text fontSize={"lg"} fontWeight={"semibold"}>
            {data?.survey.title}
          </Text>
          <Text>{data?.survey.description}</Text>
        </VStack>
      </Box>
      <Box bgColor={"white"} p={5} rounded={"lg"} w={"full"}>
        <Formik
          initialValues={{
            questions: data?.questions.map((question: SurveyQuestion) => ({
              questionsId: question.id || "",
              surveyId: question.surveyId,
              question: question.question,
              type: question.type,
              options: question.options,
              answer: "",
            })),
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
                        <Field name={`questions.${index}.answer`} key={index}>
                          {({ field }: { field: any }) => (
                            <FormControl id={`questions.${index}.answer`}>
                              <FormLabel
                                htmlFor={`questions.${index}.answer`}
                                fontWeight={"semibold"}
                              >
                                {index + 1}. {question.question}
                              </FormLabel>
                              <ViewOption
                                options={question.options}
                                type={question.type}
                                fieldProps={field}
                              />
                            </FormControl>
                          )}
                        </Field>
                      )
                    )}

                    <HStack marginTop={10} justifyContent={"end"} w={"full"}>
                      <Button
                        colorScheme={"red"}
                        variant={"outline"}
                        size={"md"}
                        onClick={() => router.push("/")}
                      >
                        Batal
                      </Button>
                      <Button
                        size={"md"}
                        colorScheme={"telegram"}
                        isLoading={isSubmitting}
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
            <SubmitAlert isOpen={isOpen} onClose={onClose} />
            <SuccessAlert
              isOpen={successIsOpen}
              onClose={successOnClose}
              points={countPoints(data?.questions)}
            />
          </Fragment>
        </Formik>
      </Box>
    </VStack>
  );
};

export default AnswerSurvey;
