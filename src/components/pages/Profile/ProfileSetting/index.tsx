import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  SimpleGrid,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";

const ProfileSetting = ({ userData }: any) => {
  return (
    <Box>
      <Formik
        initialValues={{
          name: userData?.name,
          email: userData?.email,
          university: userData?.university || "",
        }}
        onSubmit={async (values: any) => {
          alert(JSON.stringify(values, null, 2));
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
              <FormControl
                isRequired
                isInvalid={isUniversityEmpty}
              >
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
};

export default ProfileSetting;
