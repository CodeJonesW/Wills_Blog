import type { AppProps } from "next/app";
import "../styles/globals.css";
import { GoogleAnalytics } from "@next/third-parties/google";
import { useEffect, useState } from "react";

function MyApp({ Component, pageProps }: AppProps) {
  const [gaId, setGaId] = useState("");

  useEffect(() => {
    if (process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS) {
      setGaId(process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS);
    }
  }, [process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS]);

  return (
    <>
      <GoogleAnalytics gaId={gaId} />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
