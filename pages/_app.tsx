import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { sendPageViewAnalytics } from "../lib/google_analytics";
import Script from "next/script";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    router.events.on("routeChangeComplete", sendPageViewAnalytics);

    return () => {
      router.events.off("routeChangeComplete", sendPageViewAnalytics);
    };
  }, [router.events]);

  return (
    <>
      <Script
        id="gtag-base"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}');
          `,
        }}
      />
      <Component {...pageProps} />;
    </>
  );
}

export default MyApp;
