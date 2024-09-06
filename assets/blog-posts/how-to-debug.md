---
title: "How to Debug a full stack web application"
date: "April 17, 2024"
excerpt: "Debugging is about continually digging and finding the next answer."
cover_image: "/images/posts/how-to-debug/debugging.webp"
---

### Question Fractals

When debugging a full stack web application, I like to think of the process as a fractal of questions. I start with a high level question and then drill down into the specifics. For example, let's say we have a bug in our application. The first question I would ask is, "What is the bug?" This is a high level question that doesn't give us much information, but it is vital to start off investigating the correct issue. From here, I would start to drill down into the specifics.

So, let's say a button is broken, for a simple example. When I click the button, is the event firing in the Handler? If so, is the internal functionality working as expected? Let's assume that the internal functionality has an asynchronous API call inside. Is that API call returning a proper response? Let's say that we're not getting a response. At this point, we should check the server logs to see if the API call is being registered. Hopefully, there's good logging, and you can see that the API call is going through initially. Hopefully, this hypothetical server has error handling, and if something is going wrong, the exception or error is being properly caught and not causing the server to stop running properly. At this point, if there is no error handling, we could likely see an exception in the logs. Is the exception related to a utility function that supports the API route? Here, we need to check the internal functionality and see if there's an error in our code, or maybe this functionality interacts with the database, in which case there is another area to check.

Using this type of logic to drill into software problems is a great way to be able to work independently and create good questions. Generally, I like to drill down in this way and find facts that I can state that will then support a hypothesis around a problem. When you are the new person on a team, or you're working independently, and you have someone who developed more of the code base accessible, but you're not trying to pester them with questions, using this strategy can be very useful in eliminating generic questions that waste time.

Once you have a hypothesis on what the issue might be, I would then write a test to reproduce those conditions and produce the error. At this point, you can be truly confident that your issue is not a ghost, and you can start to think about the changes necessary to eliminate the bug. Once you make the changes to implement a fix, make sure your test passes and asserts the critical functionality that has been fixed.

Finally, I would open a merge request and state the facts that led me to finding the issue and tag someone for review. If the bug just happens to be frontend, the same concepts can be applied by stating the facts, writing tests reproducing the error, and implementing a fix.

Good luck debugging! 🐛
