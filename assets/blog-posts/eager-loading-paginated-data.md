---
title: "Eager loading paginated data to support efficient searching"
date: "April 18, 2024"
excerpt: "Loading data in chunks to support search functionality."
cover_image: "/images/posts/loading-data/loading-data.webp"
---

Context: Let's say I have admin interface that allows users to view different large lists of user data. The data is retrieved from an API and is in the form of an array of objects. Each object has keys and values describing a person. The user has the ability to search the list of data and show individual results. In order for the search to work efficently and quickly all the data needs to be populated into the web app state. As more users sign up for the web app the data in the list expands.

I recently had to deal with an issue where the data in situation I described above began to exceed the designed payload limit of the server response. This caused a problem when requesting the entire list of data in a singular API call. In order to support the front end UI, I updated the API route to paginate the data and implemented pagination ui on the front end.

At this point the data is separated into small enough chunks where we do not hit the payload limit but in order to support fast searching functionality we still would need to be able to acquire all of the items in the list in order to support the search functionality. In this scenario the goal was to provide the user with a fast search experience where the user could type in a search query and the results would be displayed instantly.

In order to do this I decided to implement a kind of eager loading where the app detects the total length of the list and then makes the appropriate number of calls so that all of the data populates into state and is available for the fast searching.

Thinking about this in terms of React, I decided to use a useEffect hook to detect the component mount and then make an API call to get the total length of the list and populate into state. In the same component we implement a useEffect that cites the total length as a dependency and when the total length is no longer the initial value we call the API to get the data.

I can now take the total length and divide it by the length of each page determined in the pagination route to get the number of pages. We then call the API as many times as there are pages. On each successful response we take the new data and update the state. I had to implement additional pagination logic to handle which part of the over all dataset is being rendered in the front end. A side benefit to supporting search in this way is that the user can now navigate through paginated data without an async call to the server.

I decided to implement a loading state while looping through the api calls in order to give the user feedback that the data is being loaded. When thinking about the page size, I was able to load in a large amount of data per page and not hit the payload limit, so I opted for a larger page size to reduce the number of API calls needed to load all the data.

It is important to note that the error handling is important with this implementation because I do not want to run into any infinite loops or unnecessary calls to the server. So in any case where the API call returns an error we will populate the state with an error message and then check for it in our useEffect before making subsequent API calls.

Because all this information is held in the redux state and not in the component state it was important to clear the data from the redux state when the component unmounts. I did this via a clean up function in the component's useEffect. Inside the clean up function I call a simple redux action that resets the state. This is to prevent the data from presenting when the user navigates to a different instance of the component. If not cleared there could be bad data rendered, additional api calls, or an array of other issues.

Now that the data is loaded into the front end's state, searching can be performed locally and provide instant faster user feedback.

While eager loading all the data supports for this web apps use case, it could become inefficient if the dataset grows even larger. An alternative could be to implement server-side search and pagination where I only retrieve the current page's data. This would be a good solution if the dataset grows to a point where eager loading all the data becomes too slow or resource intensive.
