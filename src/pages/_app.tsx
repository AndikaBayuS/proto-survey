import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import Navbar from "@/src/components/Navbar/Navbar";
import "@/src/styles/globals.css";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const router = useRouter();
  const auth = router.pathname === "/auth/signin" ? false : true;

  return (
    <SessionProvider session={session}>
      <div className="min-h-screen bg-gray-100" data-theme="light">
        {auth && <Navbar />}
        <Component {...pageProps} />
      </div>
    </SessionProvider>
  );
}

export default MyApp;
