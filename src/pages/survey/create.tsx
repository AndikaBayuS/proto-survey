import { useRouter } from "next/router";
import { Formik, Field, FieldArray, Form, FormikHelpers } from "formik";
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  HStack,
  IconButton,
  Input,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";

interface Values {
  title: string;
  description: string;
  questions: [{ question: string }];
}

const Create = () => {
  const router = useRouter();
  const createSurvey = async ({ title, description, questions }: Values) => {
    try {
      const body = { title, description, questions };
      await fetch("/api/survey", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      await router.push("/");
    } catch {
      console.log("error");
    }
  };

  return (
    <Container maxWidth={"container.xl"} py={5}>
      <Box bgColor={"white"} rounded={"lg"} p={5}>
        <Formik
          initialValues={{
            title: "",
            description: "",
            questions: [{ question: "" }],
          }}
          onSubmit={(
            values: Values,
            { setSubmitting }: FormikHelpers<Values>
          ) => {
            setTimeout(() => {
              createSurvey(values);
              setSubmitting(false);
            }, 500);
          }}
        >
          <Form>
            <VStack alignItems={"start"} spacing={3}>
              <FormControl isRequired>
                <FormLabel htmlFor="title">Judul Survei</FormLabel>
                <Field
                  as={Input}
                  id="title"
                  name="title"
                  placeholder="Survey ..."
                  variant="filled"
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="description">Deskripsi Survei</FormLabel>
                <Field
                  as={Textarea}
                  id="description"
                  name="description"
                  placeholder="Survey mengenai ..."
                  variant="filled"
                />
              </FormControl>

              <Box w="full">
                <FieldArray name="questions">
                  {({ remove, push, form }) => {
                    const { values } = form;
                    return (
                      <VStack alignItems={"start"} spacing={3}>
                        {values.questions.map(
                          (_question: string[], index: number) => (
                            <FormControl key={index}>
                              <FormLabel htmlFor={`questions.${index}`}>
                                Pertanyaan {index + 1}
                              </FormLabel>
                              <HStack>
                                <Field
                                  as={Input}
                                  name={`questions[${index}].question`}
                                  placeholder="Pertanyaan ..."
                                  variant="filled"
                                />
                                <IconButton
                                  icon={<CloseIcon />}
                                  aria-label="Hapus Pertanyaan"
                                  colorScheme={"red"}
                                  variant={"outline"}
                                  size={"sm"}
                                  disabled={index === 0}
                                  onClick={() => remove(index)}
                                />
                              </HStack>
                            </FormControl>
                          )
                        )}
                        <Button
                          type="button"
                          colorScheme={"telegram"}
                          size={"sm"}
                          onClick={() => push({ question: "" })}
                        >
                          Tambah Pertanyaan
                        </Button>
                      </VStack>
                    );
                  }}
                </FieldArray>
              </Box>
            </VStack>

            <HStack marginTop={10} justifyContent={'end'}>
              <Button
                colorScheme={"red"}
                variant={"outline"}
                size={"sm"}
                onClick={() => router.push("/")}
              >
                Batal
              </Button>
              <Button type="submit" colorScheme={"telegram"} size={"sm"}>
                Buat Survei
              </Button>
            </HStack>
          </Form>
        </Formik>
      </Box>
    </Container>
  );
};

export default Create;
