import { Box, Button, Center, HStack, Text } from "@chakra-ui/react";
import { getProviders, signIn } from "next-auth/react";

import GoogleIcon from "@/components/icons/GoogleIcon";

export default function SignIn({ providers }) {
  return (
    <Center minH="100vh">
      {Object.values(providers).map((provider) => (
        <Button
          colorScheme="gray"
          key={provider.name}
          onClick={(e) => {
            e.preventDefault(), signIn(provider.id, { callbackUrl: "/" });
          }}
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

export const getServerSideProps = async () => {
  const providers = await getProviders();
  return {
    props: {
      providers,
    },
  };
};
