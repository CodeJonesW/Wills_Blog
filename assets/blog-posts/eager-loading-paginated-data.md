---
title: "Eager loading paginated data to support efficient searching"
date: "April 18, 2024"
excerpt: "Loading data in chunks to support search functionality."
cover_image: "/images/posts/loading-data/loading-data.webp"
---

Context: Let's say I have a React web app that allows users to view different large lists of data. The data retrieved from an API and we could imagine it be an object with a series of keys and values describing a user. The user has the ability to search the list of data and show individual results. In order for the search to work efficently and quickly all the data needs to be populated into the web app state. After some time the web app grows and the data in the list expands.

I recently had to deal with an issue where the data in situation I described above began to exceed the designed payload limit of the server response. In order to support the front end UI, I updated the route to use pagination on the data and implemented pagination ui on the front end.

At this point I have now separated the data into small enough chunks to where we do not hit the payload limit but in order to support the search functionality we still would need to be able to acquire all of the items in the list in order to support the search functionality.

In order to do this I will need to implement a kind of eager loading where we detect the total length of the list and then make the appropriate number of calls so that we populate all of the data into state and make it available for the search.

Thinking about this in terms of React, I decided to use a useEffect hook to detect the component mount and then make an API call to get the total length of the list and populate into state. In the same component we implement a useEffect that cites the total length as a dependency and when the total length is no longer the initial value we call the API to get the data.

I can now take the total length and divide it by the length of each page determined in the pagination route to get the number of pages. We then call the API as many times as there are pages. On each successful response we take the new data and update the state. I had to implement additional pagination logic to handle which part of the over all dataset is being rendered in the front end. Another pro to this implementation is that the user can now navigate through paginated data without an async call to the server.

I decided to implementing a loading state while looping through the api calls seems like a good idea to give the user feedback that the data is being loaded. When thinking about the page size, I was able to load in a large amount of data per page and not hit the payload limit, so I opted for a larger page size to reduce the number of API calls needed to load all the data.

It is important to note that the error handling is important with this implementation as I do not want to run into any infinite loops or unnecessary calls to the server. So in any case where the API call returns an error we will populate the state with an error message and then check for it in our useEffect before making subsequent API calls.

Because all this information is held in the redux state and not in the component state it was important to clear the data from the redux state when the component unmounts. This is to prevent the data from being available in the state when the user navigates to a different instance of the component. If not cleared there could be bad data rendered, additional api calls, or an array of other issues.

Now that the data is loaded into the front end's state, searching can be performed locally and provide instant faster user feedback.
