// log the pageview with their URL
export const sendPageViewAnalytics = (url) => {
  window.dataLayer.push({
    event: "pageview",
    page: url,
  });
};

export const sendAnalyticsEvent = (name, eventData) => {
  window.gtag("event", name, eventData);
};
