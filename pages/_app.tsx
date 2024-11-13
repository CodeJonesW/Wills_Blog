import type { AppProps } from "next/app";
import "../styles/globals.css";
import { GoogleAnalytics } from "@next/third-parties/google";
import { useEffect, useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "../styles/theme";

function MyApp({ Component, pageProps }: AppProps) {
  const [gaId, setGaId] = useState("");

  useEffect(() => {
    if (process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS) {
      setGaId(process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS);
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <GoogleAnalytics gaId={gaId} />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
