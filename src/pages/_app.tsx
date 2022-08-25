import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import Navbar from "@/src/components/Navbar/Navbar";
import "@/src/styles/globals.css";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <Component {...pageProps} />
      </div>
    </SessionProvider>
  );
}

export default MyApp;
