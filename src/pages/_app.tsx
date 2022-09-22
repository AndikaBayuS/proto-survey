import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { SessionProvider } from "next-auth/react";
import { ChakraProvider, Box } from "@chakra-ui/react";
import Navbar from "@/src/components/common/Navbar";
import Header from "@/src/components/common/Header";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const router = useRouter();
  const auth = router.pathname === "/auth/signin" ? false : true;

  return (
    <SessionProvider session={session}>
      <ChakraProvider>
        <Box minH={"100vh"} bgColor="gray.100">
          {auth && <Navbar />}
          <Header />
          <Component {...pageProps} />
        </Box>
      </ChakraProvider>
    </SessionProvider>
  );
}

export default MyApp;
