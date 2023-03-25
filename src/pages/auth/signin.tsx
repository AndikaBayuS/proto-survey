import { GetServerSideProps } from "next";
import { getProviders, signIn } from "next-auth/react";
import { Box, Button, Center, HStack, Text } from "@chakra-ui/react";

import GoogleIcon from "@/src/components/icons/GoogleIcon/GoogleIcon";
import { SigninProps } from "@/src/global/interfaces";

export const getServerSideProps: GetServerSideProps = async () => {
  const providers = await getProviders();
  return {
    props: {
      providers,
    },
  };
};

const SignIn: React.FC<SigninProps> = ({ providers }) => {
  return (
    <Center minHeight={"100vh"}>
      {Object.values(providers).map((provider) => (
        <Button
          colorScheme={"gray"}
          key={provider.name}
          onClick={() =>
            signIn(provider.id, {
              callbackUrl: "http://localhost:3000/",
            })
          }
        >
          <HStack>
            <Box height={5} width={5}>
              <GoogleIcon />
            </Box>
            <Text>Sign in with {provider.name}</Text>
          </HStack>
        </Button>
      ))}
    </Center>
  );
};

export default SignIn;
