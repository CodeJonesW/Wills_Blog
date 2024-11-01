---
title: "My Goal Creator Progress and Personal Updates"
date: "Oct 27, 2024"
excerpt: "Progress update on mygoalcreator.com"
cover_image: "/images/posts/mgc_v1/mgc-landing.png"
hide_image_in_slug: true
---

<img src="/images/posts/mgc_v1/mgc-ui-2.png" alt="landing page" title="my goal creator"  />

It has been 27 days since I wrote my first [article](https://www.williamjonescodes.com/blog/building-with-cloudflare) about [My Goal Creator](https://mygoalcreator.com).

## Personal Update 🏃‍♂️

I completed my first half marathon yesterday, finishing with a time of 2:16:26!
<img src="/images/posts/mgc_v1/marathon.jpg" alt="marathon" title="marathon"  />

The commits have been steady!

<img src="/images/posts/mgc_v1/contributions.png" alt="github history" title="commit history"  />

## Project Recap ☕️

My Goal Creator is a web application designed to help users set, track, and refine their goals. Built with React, TypeScript, Node.js, SQL, and Cloudflare services, it uses OpenAI on the backend to dynamically stream responses to users' inputs.

The app acts like a reader where the user can ask how to achieve a goal or task and recieve a detailed plan. Once a plan has been generated the user has the ability to easily select a line from the text and dive deeper into that subject. This recursive style of research allows for users to find sub topics of interest and quickly generate information about them. I have been referring to this as 'diving'. It allows users to quickly generate new reading material without having to type.

[My Goal Creator - Worker](https://github.com/CodeJonesW/MyGoalCreator-worker)

[My Goal Creator - Frontend](https://github.com/CodeJonesW/MyGoalCreator)

### New Features Since Last Update 🚀

- Frontend
  - redux
  - material ui
  - react router
  - users can create a goal and stream the response
  - users can click on text within a goal to create a new sub goal and stream the response
  - users can view their generated goals and any topics they have dived into
  - users can track goals and see their progress via a kanban board
- Backend

  - open ai completion streaming
  - database schema for goals and tracking
  - markdown parsing and dynamic query generation
  - unit test coverage up to 70%
  - convert to use [Hono](https://hono.dev/docs/) web application framework

- Goals for the month
  - Refactor worker code to use Cloudflare [Durable Objects](https://developers.cloudflare.com/durable-objects/)
  - improve how goal data is split and stored into tasks for the goal tracker
  -

<img src="/images/posts/mgc_v1/mgc-ui-1.png" alt="web app ui" title="enter goal"  />

<img src="/images/posts/mgc_v1/mgc-ui-4.png" alt="web app ui" title="plan"  />

## Implementation of OpenAI Completion Streaming 💿

Initially, I took a straightforward approach by awaiting the full response from OpenAI, which resulted in the user waiting with a loading spinner. To improve user experience, I implemented OpenAI’s chat completion streaming, allowing instant feedback. I used Readable Streams to handle OpenAI's chunked data and continually sent each chunk back to the client via a Server-Sent Events (SSE) connection."

Surprisingly a challenging part about working with the openai completion stream was making sure that the markdown syntax was parsed correctly during the stream as incomplete markdown lines can cause formatting inconsistencies. To add to this the way new lines were parsed in the production deployed application varied from the development environment. After refactoring my initial implementation I found the issue was with the combination of the actual newline characters in the response and the newline character at the end of the string signaling the end of a "message" in a server-sent events stream.

## Database structure and interaction 💾

After playing with the database schema, I decided on a design where clicking on a line of text within a goal creates a new goal referencing the previous via its parent_goal_id. This allows for a tree like structure of goals to be created and queried. Combining this style of data creation with responsive UI animations allow for me to create a fairly engaging user experience. The design supports a simple routing and component implementation. I can continually navigate to each new piece of content with a new goal id reusing the same component. There are definitely improvements to be made but I am happy with the progress so far.

## AI Prompting Challenges 💬

Prompting the AI to consistently produce reliable, structured markdown was another challenge. I aimed for a specific markdown pattern that I could use to split goal plans into timelines and subtasks. After extensive experimentation, I refined my prompts to achieve a predictable format, which I now parse and store in a SQL database for easy querying.

## Kanban Board for Tracking 📊

I’m also developing a kanban board feature for tracking goals and progress. Currently, a working prototype allows users to drag sub-tasks between columns, providing a visual and interactive way to manage tasks.

<img src="/images/posts/mgc_v1/mgc-ui-3.png" alt="web app ui" title="goal tracker"  />

## Future Plans 📜

My plan is to keep refining My Goal Creator until I find a use case that truly resonates with users. The platform’s flexibility should allow it to serve as a foundation for future, rebranded products if necessary.

If you have any feedback or ideas, feel free to reach out at williamjonescodes@gmail.com.

Cheers,

Will Jones
