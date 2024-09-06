import type { AppProps } from "next/app";
import "../styles/globals.css";
import { GoogleAnalytics } from "@next/third-parties/google";

function MyApp({ Component, pageProps }: AppProps) {
  const gaId = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID
    ? process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID
    : "";

  return (
    <>
      <GoogleAnalytics gaId={gaId} />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
