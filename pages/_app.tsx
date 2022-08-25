import "../styles/globals.css";
import type { AppProps } from "next/app";
import Navbar from "@/components/Navbar/Navbar";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
