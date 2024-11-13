import type { AppProps } from "next/app";
import "../styles/globals.css";
import { GoogleAnalytics } from "@next/third-parties/google";
import React, { useEffect, useState } from "react";
import { Theme, ThemeProvider } from "@mui/material/styles";
import { theme } from "../styles/theme";

function MyApp({ Component, pageProps }: AppProps) {
  const [gaId, setGaId] = useState("");

  useEffect(() => {
    if (process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS) {
      setGaId(process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS);
    }
  }, []);

  const setCSSVariables = (theme: Theme) => {
    document.documentElement.style.setProperty(
      "--primary-color",
      theme.palette.primary.main
    );
    document.documentElement.style.setProperty(
      "--secondary-color",
      theme.palette.secondary.main
    );
  };

  useEffect(() => {
    setCSSVariables(theme);
  }, [theme]);

  return (
    <ThemeProvider theme={theme}>
      <GoogleAnalytics gaId={gaId} />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
