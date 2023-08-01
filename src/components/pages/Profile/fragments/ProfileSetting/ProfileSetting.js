import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  SimpleGrid,
  useToast,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import { useState } from "react";

import { updateProfile } from "@/utils/fetch";

export default function ProfileSetting({ userData }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const toast = useToast();

  return (
    <Box>
      <Formik
        initialValues={{
          name: userData?.name,
          email: userData?.email,
          university: userData?.university || "",
        }}
        onSubmit={async (values) => {
          setIsSubmitting(true);
          await updateProfile(values).then(() => {
            setIsSubmitting(false);
            toast({
              title: 'Sukses!',
              description: "Profil berhasil diperbarui",
              status: 'success',
              duration: 2000,
              isClosable: true,
            })
          });
        }}
      >
        {({ values }) => {
          const isUniversityEmpty = values.university === "";
          return (
            <Form>
              <SimpleGrid columns={2} spacing={5}>
                <FormControl>
                  <FormLabel htmlFor="name">Nama</FormLabel>
                  <Field
                    as={Input}
                    name="name"
                    placeholder="Masukkan nama"
                    variant="filled"
                  />
                </FormControl>
                <FormControl isDisabled>
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <Field as={Input} name="email" variant="filled" />
                </FormControl>
              </SimpleGrid>
              <FormControl isInvalid={isUniversityEmpty} isRequired>
                <FormLabel htmlFor="university">Universitas</FormLabel>
                <Field
                  as={Input}
                  name="university"
                  placeholder="Masukkan universitas anda"
                  variant="filled"
                />
                <FormErrorMessage>
                  Universitas tidak boleh kosong!
                </FormErrorMessage>
              </FormControl>
              <Button
                colorScheme="messenger"
                disabled={isUniversityEmpty}
                isLoading={isSubmitting}
                mt={5}
                type="submit"
                w="full"
              >
                Simpan
              </Button>
            </Form>
          );
        }}
      </Formik>
    </Box>
  );
}
