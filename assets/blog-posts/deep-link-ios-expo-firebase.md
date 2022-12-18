---
title: "Deep Links -- iOS, Expo, React Navigation and Firebase"
date: "October 11, 2022"
excerpt: "How to implement a full deep linking in your iOS app using Expo and Firebase."
cover_image: "/images/posts/deep-links/deep-links-cover.jpeg"
---

## Deep Links

Deep linking allows you to create links that will open a specific screen or content within your app when clicked on a mobile device. There are several technologies and approaches that can be used to implement deep linking in an iOS app using Expo and Firebase.

Apple Universal Links is a technology that allows you to set up verification that you own your domain and specify which links should be handled by your app. To implement Universal Links, you need to serve an Apple App Site Association (AASA) file from your web app that contains information about your app and the paths on your domain that should be handled by the app. The AASA file must be served from the root route of your domain and should be in the specified format.

To associate your app with a domain, you need to add the **`associatedDomains`** configuration to your app's **`app.json`** file and follow the specified format. You also need to add the **`associated domains`** key to your Expo app's **`app.config`** file and include the domain you want to associate with your app.

Firebase Dynamic Links is another technology that allows you to create links that will open your app and navigate to the appropriate screen or content, even if the app is not installed on the user's device. Dynamic Links can be created using the Firebase console or using the Firebase Dynamic Links REST API.

To handle deep links in an iOS app using Expo and Firebase, you will need to set up Universal Links and Dynamic Links, as well as handle the link passed to the app upon opening. You may also need to consider the different scenarios of the app being in the background or closed when the deep link is clicked, and handle these scenarios appropriately.

Deep linking allows you to create links that will open a specific screen or content within your app when clicked on a mobile device. There are several technologies and approaches that can be used to implement deep linking in an iOS app using Expo and Firebase.

## **Setting up internal handling of the link**

To set up deep linking in an iOS app using Expo, you will need to handle the link passed to the application upon opening using the **`Linking`** API. This will allow you to parse the link and navigate to the appropriate screen within the app.

To use the **`Linking`** API, you will need to import it in your app:

```jsx
import { Linking } from "expo";
```

Then, you can use the **`parse`** method of the **`Linking`** API to parse the link passed to the app:

```jsx
const { hostname, path, queryParams } = Linking.parse(url);
```

This will return an object containing the hostname, path, and query parameters of the link. You can then use these values to determine which screen or content to navigate to within the app.

For example, you might use the path of the link to determine which screen to navigate to:

```

if (path === '/home') {
  navigateToHomeScreen();
} else if (path === '/profile') {
  navigateToProfileScreen();
}

```

You can also use the query parameters of the link to pass additional information to the app, such as an ID of a specific item to display on the destination screen.

```

if (path === '/item') {
  navigateToItemScreen(queryParams.id);
}

```

## **Setting up Apple Universal Links**

Apple Universal Links is a technology that allows you to set up verification that you own your domain and specify which links should be handled by your app. To implement Universal Links, you need to serve an Apple App Site Association (AASA) file from your web app that contains information about your app and the paths on your domain that should be handled by the app.

To enable associated domains on the Apple Developer site, follow these steps:

1. Go to the Apple Developer portal and sign in with your developer account.
2. Click on the Certificates, Identifiers & Profiles option in the left navigation panel.
3. In the Identifiers section, click on the App IDs option.
4. Click on the app ID that you want to enable associated domains for.
5. Scroll down to the Associated Domains section and click on the Edit button.
6. Check the Enable Associated Domains option.
7. Click on the Add button and enter the domain you want to associate with your app.
8. Click on the Continue button and follow the prompts to complete the process.

Once you have enabled associated domains for your app ID, you can add the **`associatedDomains`** configuration to your app's **`app.json`** file and specify the domains that your app is associated with. You can also add the **`associated domains`** key to your Expo app's **`app.config`** file and include the domain you want to associate with your app, prefixed with **`applinks.`** This will allow your app to handle universal links from the specified domains.

The AASA file must be served from the root route of your domain and should be in the specified JSON format:

```

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

In this example, the **`appID`** field should be replaced with your app's Team ID and Bundle ID, which can be found in the Apple Developer Portal. The **`components`** array specifies the paths on your domain that should be handled by your app. In this case, any link with a path of **`/home`**, **`/metrics`**, or **`/profile`** will be handled by the app.

You can add additional paths as needed. The **`comment`** field is optional and can be used to add a description of each path.

The AASA must be served from the root as **`/apple-app-site-association`** (with no extension) or **`/.well-known/apple-app-site-association`** (with no extension). If using Next.js, you can just put the AASA file in the **`public`** folder with no extension.

Once the AASA file is in place, you need to add the **`associatedDomains`** configuration to your app's **`app.json`** file. This configuration specifies the domains that your app is associated with, and should be in the format specified by Apple:

```

"associatedDomains": [
  "applinks:example.com",
  "applinks:www.example.com"
]

```

Make sure not to include the protocol (**`https`**) in your URL, as this will result in your universal links not working.

You also need to add the **`associated domains`** key to your Expo app's **`app.config`** file and include the domain you want to associate with your app, prefixed with **`applinks.`**:

```

"associated domains": [
  "applinks:example.com",
  "applinks:www.example.com"
]

```

Once these configurations are in place, you can test your universal links by clicking on a link on your website that should be handled by your app. The link should open the app and navigate to the appropriate screen or content.

## **Setting up Firebase Dynamic Links**

Firebase Dynamic Links is another technology that allows you to create links that will open your app and navigate to the appropriate screen or content, even if the app is not installed on the user's device. Dynamic Links can be created using the Firebase console or using the Firebase Dynamic Links REST API.

To create a Dynamic Link using the Firebase console, follow these steps:

1. Go to the Firebase console and select your project.
2. In the left navigation panel, click on the Dynamic Links option.
3. Click on the Create Dynamic Link button.
4. Enter the link destination for your Dynamic Link. This can be a specific screen or content within your app, or a webpage on your website.
5. Enter a Link name and Short link suffix (optional).
6. Click on the Create button.

This will create a Dynamic Link that you can use in emails, social media posts, or other places where you want to link to your app or website. When clicked, the link will open the app and navigate to the specified destination, or fall back to the website if the app is not installed.

To create a Dynamic Link using the Firebase Dynamic Links REST API, you will need to make a POST request to the **`https://firebasedynamiclinks.googleapis.com/v1/shortLinks`** endpoint with a JSON payload containing the link destination and other optional parameters. For example:

```

{
  "dynamicLinkInfo": {
    "domainUriPrefix": "https://example.page.link",
    "link": "https://example.com/home",
    "androidInfo": {
      "androidPackageName": "com.example.app"
    },
    "iosInfo": {
      "iosBundleId": "com.example.app"
    }
  },
  "suffix": {
    "option": "SHORT"
  }
}

```

This payload specifies the link destination (**`https://example.com/home`**) and the package name and bundle ID of the app for Android and iOS respectively. The **`domainUriPrefix`** field specifies the domain of the Dynamic Link, which should be a domain owned by your Firebase project. The **`suffix`** field specifies the option for the short link suffix, which can be **`SHORT`** or **`UNGUESSABLE`**.

To create the Dynamic Link, you will need to authenticate the request using a Firebase API key or a server key. You can find these keys in the Firebase console under the Project settings > General tab.

Once the Dynamic Link is created, you will receive a response containing the short link that you can use to link to your app or website. When clicked, the link will open the app and navigate to the specified destination, or fall back to the website if the app is not installed.

## **Handling deep links in different scenarios**

When implementing deep linking in an iOS app using Expo and Firebase, you need to consider different scenarios where the app may be in the background or closed when the deep link is clicked.

If the app is not running in the background and the user clicks on a deep link, this is known as a cold start. In this case, the app needs to be launched and the link needs to be passed to the app so that it can navigate to the appropriate screen or content.

If the app is running in the background and the user clicks on a deep link, this is known as an active start. In this case, the app does not need to be launched again, but the link still needs to be passed to the app so that it can navigate to the appropriate screen or content.

To handle these scenarios, you can use the **`Linking`** API and the **`AppState`** API in Expo to listen for changes in the app's state and handle the deep link accordingly.

Here is an example of how to use these APIs to handle deep links in different scenarios:

```jsx
import { Linking, AppState } from "expo";

const [initialUrl, setInitialUrl] = useState(null);

useEffect(() => {
  const handleUrl = async () => {
    // Get the initial URL
    const initialUrl = await Linking.getInitialURL();

    // Store the initial URL in state
    setInitialUrl(initialUrl);
  };

  // Listen for changes in the app's state
  AppState.addEventListener("change", handleUrl);

  return () => {
    AppState.removeEventListener("change", handleUrl);
  };
}, []);

useEffect(() => {
  // If there is an initial URL, parse and handle it
  if (initialUrl) {
    handleDeepLink(initialUrl);
  }
}, [initialUrl]);

const handleDeepLink = (url) => {
  // Parse the link
  const { hostname, path, queryParams } = Linking.parse(url);

  // Navigate to the appropriate screen or content based on the link
  if (path === "/home") {
    navigateToHomeScreen();
  } else if (path === "/item") {
    navigateToItemScreen(queryParams.id);
  }
};
```

In this example, the **`useEffect`** hook is used to listen for changes in the app's state and get the initial URL when the app is launched.

The initial URL is stored in state and passed to the **`handleDeepLink`** function when it is available. The **`handleDeepLink`** function parses the link and navigates to the appropriate screen or content based on the link's path and query parameters.

You can customize the logic in the **`handleDeepLink`** function to suit your specific requirements and implement any additional functionality needed to handle deep links in your app.

## **Conclusion**

Implementing deep linking in an iOS app using Expo and Firebase can be challenging, but with the right setup and understanding of the various technologies and approaches available, you can create a seamless experience for users to navigate to specific content or screens within your app from external sources. By understanding the different layers of technology and their specific use cases you can choose the most appropriate solution for your project.

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
