import { useRouter } from "next/router";
import { Box, Button, FormControl, FormLabel, VStack } from "@chakra-ui/react";
import { Field, FieldArray, Form, Formik } from "formik";
import { useState } from "react";
import useSWR from "swr";

import ViewOption from "@/src/components/forms/ViewOption";
import { SurveyQuestion } from "@/src/global/interfaces";
import fetcher from "@/src/lib/fetcher";

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

const AnswerSurvey = () => {
  const router = useRouter();
  const { id } = router.query;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { data, error } = useSWR<Questions[]>(`/api/survey/${id}`, fetcher);

  if (!data?.length) return <div>Loading...</div>;
  if (error) return <div>Failed to load</div>;

  const submitAnswer = async (values: AnswerValues[]) => {
    try {
      const body = { questions: values };
      await fetch("/api/survey/answer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      await router.push("/");
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
    <Box bgColor={"white"} p={5} rounded={"lg"}>
      <Formik
        initialValues={{
          questions: data?.map((question: SurveyQuestion) => ({
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
        <Form>
          <FieldArray name="questions">
            {(arrayHelpers) => (
              <VStack alignItems={"start"} spacing={3}>
                {data?.map((question: SurveyQuestion, index: number) => (
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
                ))}
                <Button
                  type="submit"
                  size={"md"}
                  colorScheme={"telegram"}
                  isLoading={isSubmitting}
                  disabled={
                    !isFormFullyFilled(arrayHelpers.form.values.questions) ||
                    isSubmitting
                  }
                >
                  Submit
                </Button>
              </VStack>
            )}
          </FieldArray>
        </Form>
      </Formik>
    </Box>
  );
};

export default AnswerSurvey;
