---
title: "Migrate from legacy FCM APIs to HTTP v1"
date: "June 19, 2024"
excerpt: "Out with the old in with the new."
cover_image: "/images/posts/update-fcm-http-v1/firebase-apis.webp"
---

Apps using the deprecated FCM legacy APIs for HTTP and XMPP should migrate to the HTTP v1 API at the earliest opportunity. Sending messages (including upstream messages) with those APIs was deprecated on June 20, 2023, and **will be removed on June 21, 2024**. ( [Source](https://firebase.google.com/docs/cloud-messaging/migrate-v1) )

There are at least two ways to do this in my case. Either update the http requests to firebase to use the new patterns or implement the use of the fire admin python library to provide the same functionality. In order to preserve patterns in my own code base I opted to update the http requests to the new pattern.

##### 1. Update the server endpoint

- Update server url to include new pattern with project id. The project id can be obtained from the firebase [general project settings](https://console.cloud.google.com/project/_/settings/general/).

##### 2. Update authorization of send requests

- Involves changing how the authorization headers are generated. In HTTP v1 users will need to provide credentials via 1 of 3 ways provided by the documentation. In my case the application was running in a non google server environment which called for the use of service account files to generate an access token that is used in each requests authorization headers. The credentials are passed to the python google.auth2 library’s service_account module that allows us to generate a token with assuming the credentials provided are valid. Acquiring a service account is pretty straight forward in the firebase ui but will require admin privileges.

##### 3. Update the payload of send requests

- The payload being passed to FCM HTTP v1 has changed significantly compared to the legacy api.
  - The generic notification object has been simplified and more specific attributes have been moved to [Android](https://firebase.google.com/docs/reference/fcm/rest/v1/projects.messages#androidconfig) and [iOS](https://firebase.google.com/docs/reference/fcm/rest/v1/projects.messages#apnsconfig) specific objects.
  - Keys that were previously at the top level of the object are now nested in a message object

##### Summary

Overall this was a fairly simple process but a requirement for continuing to use FCM. Writing unit tests to confirm each change was a critical part being confident in my work, When initially writing code involving http requests creating tests is a great way to test actual apis and improve ones understanding of the data structure returned. Sometimes documentation will provide this accurately but it you cannot argue with the actual data.

Resources

- https://firebase.google.com/docs/reference/fcm/rest/v1/projects.messages
- https://firebase.google.com/docs/cloud-messaging/migrate-v1
- https://developer.apple.com/documentation/usernotifications/generating-a-remote-notification
