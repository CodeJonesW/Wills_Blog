// log the pageview with their URL
export const sendPageViewAnalytics = (url) => {
  window
    .gtag("config", process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS, {
      page_path: url,
    })
    .catch((error) => {
      console.error("Something went wrong with page view analytics: ", error);
    });
};

// log specific events happening.
export const sendAnalyticsEvent = ({ action, params }) => {
  window.gtag("event", action, params).catch((error) => {
    console.error("Something went wrong with send event analytics: ", error);
  });
};
