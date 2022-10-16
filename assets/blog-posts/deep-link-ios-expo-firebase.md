---
title: "Deep Links -- iOS, Expo, React Navigation and Firebase"
date: "October 11, 2022"
excerpt: "How to implement a full deep linking in your iOS app using Expo and Firebase."
cover_image: "/images/posts/deep-links/deep-links-cover.jpeg"
---

## Implementing Deep Links in iOS 🔗📲

## Intro

- My first time implementing a deep linking solution with iOS, expo, and firebase was a bit of a challenge. I had to do a lot of research and trial and error to get it working. I hope this article can help you get started with your own deep linking solution.

## Terminology

- In this articles there are various pieces of the linking implementation with their own specific names. My experience reading various articles led me to define the terms as below.
- Deep links - general term to describe links that will navigate into the relative app when the user is on a mobile device.
- Universal Links - Apple's setup for how an iOS app knows about its deep link configuration
- Dynamic Links - Firebase's setup for allowing an app to dynamically decide where to go pending the operating system.
- Cold start - When the app is not running in the background and the user clicks on a deep link.
- Warm start - When the app is running in the background and the user clicks on a deep link.

## Base Setup for iOS app with Expo

- You will need to setup internal handling of the link that is passed to the application upon opening. The expo guide for this can be found [here](https://docs.expo.io/guides/linking/). This will allow you to handle the link in your app and navigate to the appropriate screen. It is important to note that expo apps handle a coldstart and a warm start differently and this must be accounted for.

- When a user uses our website url in safari and has our application installed it opens the app instead of using the web browser.

- After reading Apple's ["Allowing apps and websites to link to your content"](https://developer.apple.com/documentation/xcode/allowing-apps-and-websites-to-link-to-your-content?preferredLanguage=occ). [Supporting associated Domains](https://developer.apple.com/documentation/Xcode/supporting-associated-domains) next step to support universal links in our application.

- [Expo AASA configuration Doc](https://docs.expo.dev/guides/linking/#aasa-configuration)

- To implement universal links on iOS, you must first set up verification that you own your domain. This is done by serving an Apple App Site Association (AASA) file from your web app.The AASA must be served from the root as /apple-app-site-association (with no extension) or /.well-known/apple-app-site-association (with no extension). The AASA contains JSON which specifies your Apple app ID and a list of paths on your domain that should be handled by your mobile app.

- If using Nextjs one can just put the AASA file in the public folder with no extension.

- Add the associatedDomains [configuration](https://docs.expo.dev/versions/latest/config/app/#associateddomains) to your app.json, and make sure to follow [Apple's specified format](https://developer.apple.com/documentation/bundleresources/entitlements/com_apple_developer_associated-domains). Make sure not to include the protocol (https) in your URL (this is a common mistake, and will result in your universal links not working).

- [Associated domains](https://developer.apple.com/documentation/bundleresources/entitlements/com_apple_developer_associated-domains)

- Add the associated domains key to your expo apps's app.config - and the domain your want to associate prefixed with applinks.

  `associatedDomains: ["applinks:my.ponder.coach"]`

- [apple's supporting associated domains](https://developer.apple.com/documentation/xcode/supporting-associated-domains)

- With the pathConfig setup and the Linking event listener setup, you can now handle the link in your app. The link will be passed to the event listener as a string. You can then use the string to navigate to the appropriate screen.

- If your app is using react navigation you will need to create a state object to populate as your react navigation's initialState. This state object is dynamic and relative to the design of the stack navigators and tab navigators in your app. [React Navigation state reference](https://reactnavigation.org/docs/navigation-state)

- [React Navigation deep linking reference](https://reactnavigation.org/docs/deep-linking)

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

- Once your AASA file is setup and hosted on your associated domain, reinstalling your testflight application will allow it to fetch the new file config and anticipate the deep links pushing users to the app. At this point the expo linking configuration should be working and you should be able to navigate to the appropriate screen when the app is opened from a deep link.

## Firebase Dynamic Links

- I implemnented deep links with an expo managed workflow app deployed to the Apple app store. Due to the managed workflow I was not able to use things like [React Native Firebase](https://rnfirebase.io/dynamic-links/usage) to implement dynamic links. This is an option for developers not using Expo.

- Using the [Firebase Dynamic Links REST API](https://firebase.google.com/docs/dynamic-links/rest) to implement the dynamic links was the next best option. For this you will need to create a firebase project that has dynamic links enabled and the iOS app properly configured in the project. This can be done navigating to the project general settings and adding the iOS bundle ID, app store ID, and team id.

- In order to call your firebase dynamic links api you will need to use the web API key from your project which can also be accessed from the general settings. One thing to note is that the authentication api must be enabled to access the web api key. This can be done by navigating to the authentication section of the firebase console and clicking get started. When you navigate back to general settings you should see the web api key.

- There is an option to create links from the firebase dynamic links console but more advanced implementations will need to be able to dynamically create a new link for a relative path and id on the fly. This is where the REST API comes in handy. The below is an example of a curl request to create a new dynamic link. The `link` parameter is the relative path that will be appended to the domain of the dynamic link. The `dynamicLinkInfo` parameter is where you can specify the iOS bundle ID and app store ID. The `suffix` parameter is where you can specify the type of dynamic link you want to create. The `SHORT` suffix will create a short link that will redirect to the app store if the app is not installed. The `UNGUESSABLE` suffix will create a long link that will redirect to the app store if the app is not installed. The `UNIVERSAL` suffix will create a long link that will redirect to the app if the app is installed. The `SHORT` suffix is the most common type of dynamic link to use.

- Once you have the web api key you can make a request to the firebase dynamic links api to generate a dynamic link. The config will look something like this:

  ```json
  {
    "dynamicLinkInfo": {
      "domainUriPrefix": "https://example.page.link",
      "link": "https://example.com/home",
      "iosInfo": {
        "iosBundleId": "com.example.ios",
        "iosAppStoreId": "123456789"
      }
    }
  }
  ```

- Then a post request can be made to the firebase dynamic links api with the config and the web api key in the header. The response will contain the dynamic link that can be used to redirect the user to the app.

  ```ts
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

- One can add ?d=1 to the end of the returned dyanmic link to see the preview of the link. This is useful for testing the link and making sure it is working as expected. [Debugging Dynamic links](https://firebase.google.com/docs/dynamic-links/debug)

- After the dynamic link is returned I would save a new db entry with the newly created shortLink and full url. This will allow me to use the shortLink as an unguessable and then fetch the full url from the db and pass into our internal linking configuration.

## Alternatives

- [Branch.io](https://help.branch.io/developers-hub/docs/react-native) works to provide a way to create dynamic links that will use a unique url for different devices if app is installed or not. Unfortunately not available for expo managed projects.

## Resources

- [Universal Links on iOS - Expo Docs](https://docs.expo.dev/guides/linking/#universal-links-on-ios)

- [Dev Troubleshooting Resource](https://gist.github.com/anhar/6d50c023f442fb2437e1#file-setting_up_ios_universal_links-md)

- [Testing Deep Liks with React Navigation](https://reactnavigation.org/docs/deep-linking/#testing-with-npx-uri-scheme)

- [Handling Links into your App - Expo Docs](https://docs.expo.dev/guides/linking/?redirected#handling-links)
