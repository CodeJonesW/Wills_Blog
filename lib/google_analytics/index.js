// log the pageview with their URL
export const sendPageViewAnalytics = (url) => {
  window.dataLayer.push({
    event: "pageview",
    page: url,
  });
};

// log specific events happening.
export const sendAnalyticsEvent = ({ action, params }) => {
  window.gtag("event", action, params);
};
