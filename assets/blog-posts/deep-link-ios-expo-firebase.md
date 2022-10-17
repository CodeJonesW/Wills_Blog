---
title: "Deep Links -- iOS, Expo, React Navigation and Firebase"
date: "October 11, 2022"
excerpt: "How to implement a full deep linking in your iOS app using Expo and Firebase."
cover_image: "/images/posts/deep-links/deep-links-cover.jpeg"
---

## Intro 🔗📲

- My first time implementing a deep linking solution with iOS, expo, and firebase was a bit of a challenge. I had to do a lot of research and trial and error to get it working. I hope this article can help you get started with your own deep linking solution. I will also be discussing various layers of technology to support this implementation which may be useful even if we are not using the exact same stack.

## Terminology

- In this article there are various pieces of the linking implementation with their own specific names. My experience reading various articles has led me to define the terms as below.
- Deep links - general term to describe links that will navigate into the relative app when the user is on a mobile device.
- Universal Links - Apple's setup for how an iOS app knows about its deep link configuration
- Dynamic Links - Firebase's setup for allowing an app to dynamically decide where to go pending the operating system.
- Cold start - When the app is not running in the background and the user clicks on a deep link.
- Active start - When the app is running in the background and the user clicks on a deep link.

## Base Setup for iOS app with Expo

- You will need to setup internal handling of the link that is passed to the application upon opening. The expo guide for this can be found [here](https://docs.expo.io/guides/linking/). This will allow you to handle the link in your app and navigate to the appropriate screen.

  ```tsx
  const { hostname, path, queryParams } = Linking.parse(url);
  ```

- When combining with a login a new stack navigation, it is possible to store the initial url in state management and use useEffect to listen for the loading state to change and then parse and navigate to the deep link.

## Apple Universal Links

- To implement universal links on iOS, you must first set up verification that you own your domain. This is done by serving an Apple App Site Association (AASA) file from your web app.
- The AASA must be served from the root as /apple-app-site-association (with no extension) or /.well-known/apple-app-site-association (with no extension). The AASA contains JSON which specifies your Apple app ID and a list of paths on your domain that should be handled by your mobile app.

- If using Nextjs one can just put the AASA file in the public folder with no extension.

- Add the associatedDomains [configuration](https://docs.expo.dev/versions/latest/config/app/#associateddomains) to your app.json, and make sure to follow [Apple's specified format](https://developer.apple.com/documentation/bundleresources/entitlements/com_apple_developer_associated-domains). Make sure not to include the protocol (https) in your URL (this is a common mistake, and will result in your universal links not working).

- Add the associated domains key to your expo apps's app.config - and the domain your want to associate prefixed with applinks.

  `associatedDomains: ["applinks:my.ponder.coach"]`

- Once the internal handling is setup, you will need to setup the Universal Links. This is done by adding a file to your project called `apple-app-site-association`. This file will contain the information that Apple will use to determine if the link is valid and should be passed to your app. The file should be hosted in the root of your project. When installed the iOS app will make a request to the associated domain where it will look for this file off the root route. I used the below setup for this file with success:

  ```json
  {
    "applinks": {
      "apps": [],
      "details": [
        {
          "appID": "TEAM_ID.BUNDLE_ID",
          "components": [
            {
              "/": "/home",
              "comment": "Matches URL whose path is /home"
            },
            {
              "/": "/metrics",
              "comment": "Matches URL whose path is /metrics"
            },
            {
              "/": "/profile",
              "comment": "Matches URL whose path is /profile"
            }
          ]
        }
      ]
    }
  }
  ```

- There are multiple configuration types for setting up this file as it has changed over time from Apple. If there are many routes that need to be handled, you can use the `paths` key instead of the `components` key. The `paths` key will allow you to specify a regex pattern to match against the path of the URL. The `components` key will allow you to specify the path exactly. I used the `components` key as I only had a few routes to handle.

- This video is the most accurate and detailed source I have found on the subject. [Apple WWDC 2020 - Unveiling Universal Links 2.0](https://developer.apple.com/videos/play/wwdc2020/10098/)

- [Branch.io](https://branch.io/) has a ASAA validator tool that can be found [here](https://branch.io/resources/aasa-validator/).

- Once your AASA file is setup and hosted on your associated domain, reinstalling your testflight application will allow it to fetch the new file config and anticipate the deep links pushing users to the app. At this point the expo linking configuration should be working and you should be able to navigate to the appropriate screen when the app is opened from a deep link.

- With the [pathConfig](https://reactnavigation.org/docs/configuring-links/) setup and the Linking event listener setup, you can now handle the link in your app. The link will be passed to the event listener as a string. You can then use the string to navigate to the appropriate screen.

- If your app is using react navigation you will need to create a state object to populate as your react navigation's initialState. This state object is dynamic and relative to the design of the stack navigators and tab navigators in your app. [React Navigation state reference](https://reactnavigation.org/docs/navigation-state)

## Firebase Dynamic Links

- Now that we have users being able to deep link into the application when it is installed, it is time to setup the dynamic links. This will redirect users to install the application from the app store when the app is not present on the device. The user will then be able to install the app and open it with the dynamic link.

- It is possible to [create a custom native module](https://rnfirebase.io/#expo) to support the usage of [React Native Firebase](https://rnfirebase.io/dynamic-links/usage) wehn implementing dynamic links. I chose to not take this route at the time and instead generated them via the Firebase REST api on the project's server.

- Using the [Firebase Dynamic Links REST API](https://firebase.google.com/docs/dynamic-links/rest) to implement the dynamic links was the next best option. For this you will need to create a firebase project that has dynamic links enabled and the iOS app properly configured in the project. This can be done navigating to the project general settings and adding the iOS bundle ID, app store ID, and team id.

- In order to call your firebase dynamic links api you will need to use the web API key from your project which can also be accessed from the general settings. One thing to note is that the authentication api must be enabled to access the web api key. This can be done by navigating to the authentication section of the firebase console and clicking get started. When you navigate back to general settings you should see the web api key.

- There is an option to create links from the firebase dynamic links console but more advanced implementations will need to be able to dynamically create a new link for a relative path and id on the fly. This is where the REST API comes in handy. The below is an example of a request to create a new dynamic link.

- Once you have the web api key you can make a request to the firebase dynamic links api to generate a dynamic link. The config will look something like this:

  ```ts
  const config = {
    dynamicLinkInfo: {
      domainUriPrefix: "https://example.page.link",
      link: "https://example.com/home",
      iosInfo: {
        iosBundleId: "com.example.ios",
        iosAppStoreId: "123456789",
      },
    },
  };

  interface FirebaseLink {
    shortLink?: string;
    warning?: object[];
    previewLink?: string;
    error?: any;
  }

  const data: FirebaseLink = await got
    .post(
      `https://firebasedynamiclinks.googleapis.com/v1/shortLinks?key=${webAPiKey}`,
      { json: config }
    )
    .json();
  ```

- Then a post request can be made to the firebase dynamic links api with the config and the web api key in the header. The response will contain the dynamic link that can be used to redirect the user to the app.

- For my implementation this was all done sever side. Whenever the frontend app would need a deep link it could make a request to the firebase link route on the server, make the api calls and return the dynamic link in the response. In order to preserve extra deep link creations I would store the dynamic link in a database and return the stored link if it existed.

- Additionally storing the dynamic link in the database will allow the usage of short links which allow the masking of routes and ids in the link. This is useful for security purposes and for the ability to change the route or id in the future without breaking the link.

  ```json
  {
    "shortLink": "https://example.page.link/123456789",
    "fullLink": "https://example.com/resource/id"
  }
  ```

- With the short link and full link information stored, the frontend can use make a lookup request to the server to get the full link and then use the link to redirect the user to internal page the app.

- One can add ?d=1 to the end of the returned dyanmic link to see the preview of the link. This is useful for testing the link and making sure it is working as expected. [Debugging Dynamic links](https://firebase.google.com/docs/dynamic-links/debug)

- After the dynamic link is returned I would save a new db entry with the newly created shortLink and full url. This will allow me to use the shortLink as an unguessable and then fetch the full url from the db and pass into our internal linking configuration.

## Conclusion

- I hope this has given you an idea of how one could combine these services in order to provide a solution for deep linking. I would be happy to hear any feedback or suggestions on how to improve this solution. I would also be happy to answer any questions you may have. Thanks for reading!

  will@webexpertstudios.com

## Alternatives

- [Branch.io](https://help.branch.io/developers-hub/docs/react-native) works to provide a way to create dynamic links that will use a unique url for different devices if app is installed or not. Unfortunately not available for expo managed projects.

## Resources

### Expo

- [Universal Links on iOS - Expo Docs](https://docs.expo.dev/guides/linking/#universal-links-on-ios)

- [Handling Links into your App - Expo Docs](https://docs.expo.dev/guides/linking/?redirected#handling-links)

### React Navigation

- [React Navigation state reference](https://reactnavigation.org/docs/navigation-state)

- [React Navigation Linking](https://reactnavigation.org/docs/configuring-links/)

- [Testing Deep Links with React Navigation](https://reactnavigation.org/docs/deep-linking/#testing-with-npx-uri-scheme)

- [React Navigation deep linking reference](https://reactnavigation.org/docs/deep-linking)

### Apple

- [Allowing apps and websites to link to your content](https://developer.apple.com/documentation/xcode/allowing-apps-and-websites-to-link-to-your-content?preferredLanguage=occ)

- [Supporting Universal Links](https://developer.apple.com/library/archive/documentation/General/Conceptual/AppSearch/UniversalLinks.html)

- [Supporting associated Domains](https://developer.apple.com/documentation/Xcode/supporting-associated-domains)

- [Associated domains - Entitlements](https://developer.apple.com/documentation/bundleresources/entitlements/com_apple_developer_associated-domains)

- [Expo AASA Configuration Doc](https://docs.expo.dev/guides/linking/#aasa-configuration)

- [Supporting associated domains](https://developer.apple.com/documentation/xcode/supporting-associated-domains)

### Firebase

- [Dynamic links Docs](https://firebase.google.com/docs/dynamic-links/rest)

- [Open Dynamic links in app](https://firebase.google.com/docs/dynamic-links/ios/receive#open-dynamic-links-in-your-app)

- [Debugging Dynamic links](https://firebase.google.com/docs/dynamic-links/debug)

- [Analytics for Dynamic Links](https://firebase.google.com/docs/dynamic-links/analytics?authuser=0)

### Misc

- [Dev Troubleshooting Resource](https://gist.github.com/anhar/6d50c023f442fb2437e1#file-setting_up_ios_universal_links-md)
