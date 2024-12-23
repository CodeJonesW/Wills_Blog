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

My Goal Creator is a web application designed to help users set, track, and refine their goals. The app is built with React, TypeScript, Node.js, SQLite, Cloudflare Workers, and uses OpenAI to dynamically stream responses to users' inputs.

The app acts like a task manager and research tool where the user can ask how to achieve a goal or task and recieve a detailed plan. Once a plan has been generated the user has the ability to easily select a line from the text and dive deeper into that subject. This recursive style of research allows for users to find sub topics of interest and quickly generate information about them. I have been referring to this as 'diving'.

<img src="/images/posts/mgc_v1/mgc-ui-4.png" alt="web app ui" title="plan"  />

<img src="/images/posts/mgc_v1/mgc-ui-6.png" alt="web app ui" title="dive"  />

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
  - users can create daily todos and track their progress over the month
- Backend

  - open ai completion streaming
  - database schema for goals and tracking
  - markdown parsing and dynamic query generation
  - unit test coverage up to 70%
  - convert to use [Hono](https://hono.dev/docs/) web application framework

<img src="/images/posts/mgc_v1/mgc-ui-1.png" alt="web app ui" title="dashboard"  />

## Implementation of OpenAI Completion Streaming 💿

Initially, I took a straightforward approach by awaiting the full response from OpenAI, which resulted in the user waiting with a loading spinner. To improve user experience, I implemented OpenAI’s chat completion streaming, allowing instant feedback. I used Readable Streams to handle OpenAI's chunked data and continually sent each chunk back to the client via a Server-Sent Events (SSE) connection."

Surprisingly a hallenging part about working with the openai completion stream was making sure that the markdown syntax was parsed correctly during the stream as incomplete markdown lines can cause formatting inconsistencies. After refactoring my initial implementation I found the issue was with the combination of the actual newline characters in the response and the newline character at the end of the string signaling the end of a "message" in a server-sent events stream.

## Database structure and interaction 💾

After playing with the database schema, I decided on a design where clicking on a line of text within a goal creates a new goal referencing the previous via its parent_goal_id. This allows for a tree like structure of goals to be created and queried. Combining this style of data creation with responsive UI animations allow for me to create a fairly engaging user experience. The design supports a simple routing and component implementation. I can continually navigate to each new piece of content with a new goal id reusing the same component. There are definitely improvements to be made but I am happy with the progress so far.

## AI Prompting Challenges 💬

Prompting the AI to consistently produce reliable, structured markdown was another challenge. I aimed for a specific markdown pattern that I could use to split goal plans into timelines and subtasks. After some experimentation, I refined my prompts to achieve a predictable format, which I now parse and store in a SQL database for easy querying. This was critical for the kanban board feature I am developing as inconsistencies in responses would break the markdown parsing logic.

<img src="/images/posts/mgc_v1/mgc-ui-3.png" alt="web app ui" title="goal tracker"  />

## Future Plans 📜

My plan is to keep refining My Goal Creator until I find a use case that truly resonates with users. The platform’s flexibility should allow it to serve as a foundation for future, rebranded products if necessary.

I want to implement regression testing for the AI model to ensure responses satisfy quality standards as the prompting continues to evolve.

I thought this [article](https://about.gitlab.com/blog/2024/05/09/developing-gitlab-duo-how-we-validate-and-test-ai-models-at-scale/) by Gitlab was interesting and offered insight into how they approach testing AI models.

### Goals for the month

- Refactor worker code to use Cloudflare [Durable Objects](https://developers.cloudflare.com/durable-objects/)
- Improve how goal data is split and stored into tasks for the goal tracker
- Implement a way to test and track the quality of responses from the AI model

If you have any feedback or ideas, feel free to reach out at williamjonescodes@gmail.com.

Cheers!

### Resources for future me

- https://www.evidentlyai.com/blog/llm-regression-testing-tutorial
- https://about.gitlab.com/blog/2024/05/09/developing-gitlab-duo-how-we-validate-and-test-ai-models-at-scale/
- https://github.com/CircleCI-Public/intro-to-hallucination-detection/blob/main/test_hallucinations.py
