import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { SessionProvider } from "next-auth/react";
import { Box, ChakraProvider } from "@chakra-ui/react";

import Navbar from "@/src/components/common/Navbar";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const router = useRouter();
  const auth = router.pathname === "/auth/signin" ? false : true;

  return (
    <SessionProvider session={session}>
      <ChakraProvider>
        <Box minH={"100vh"} bgColor="gray.100" position={"relative"}>
          {auth && <Navbar />}
          <Component {...pageProps} />
        </Box>
      </ChakraProvider>
    </SessionProvider>
  );
}

export default MyApp;
