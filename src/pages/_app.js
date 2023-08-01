import { Box, ChakraProvider } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { SessionProvider } from "next-auth/react";
import { RecoilRoot } from "recoil";

import Header from "@/components/fragments/Header";

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const renderHeader = (() => {
    if(router.pathname === "/auth/signin") {
      return null;
    } else {
      return <Header />
    }
  })()

  return (
    <ChakraProvider>
      <SessionProvider>
        <RecoilRoot>
          <Box backgroundColor="gray.100" minH="100vh">
            {renderHeader}
            <Box
              as="main"
              px={{ base: 4, md: 8, lg: 16 }}
              py={5}
            >
              <Component {...pageProps} />
            </Box>
          </Box>
        </RecoilRoot>
      </SessionProvider>
    </ChakraProvider>
  );
}
