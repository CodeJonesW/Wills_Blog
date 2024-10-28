---
title: "My Goal Creator Progress and Personal Updates"
date: "Oct 27, 2024"
excerpt: "Progress update on mygoalcreator.com"
cover_image: "/images/posts/mgc_v1/mgc-landing.png"
hide_image_in_slug: true
---

<img src="/images/posts/mgc_v1/mgc-ui-2.png" alt="web app ui" title="analyze"  />

It has been 27 days since I wrote my first article about https://mygoalcreator.com - [here](https://www.williamjonescodes.com/blog/building-with-cloudflare).

Personal Update:

On September 1, 2024, I was laid off from my position at Nimbio due to budget cuts. Since then, I have focused my efforts on applying for new software engineering roles and advancing my goal creator project. Over the past month, I have successfully developed this web application from inception to a functioning minimum viable product (MVP).

To date, I have submitted over 100 job applications and participated in two interviews. Additionally, I completed my first half marathon with a time of 2:16:48 yesterday. I maintain a structured daily routine to meet my job application targets, utilizing running, coding, and continuous learning to stay focused and motivated.

<img src="/images/posts/mgc_v1/contributions.png" alt="web app ui" title="analyze"  />

Quick recap: My Goal Creator is a web application built with React, TypeScript, Node.js, SQL, and Cloudflare services such as Pages and Workers. The backend uses OpenAi to stream chat completions from users inputs.

Features added since the last article:

- frontend
  - user registration and login
  - users can create a goal and stream the response
  - users can click on text within a goal to create a new sub goal and stream the response
  - users can view their generated goals and subgoals
  - users can track goals and see their progress via a kanban board
- backend
  - user authentication
  - open ai completion streaming
  - database schema for goals and tracking
  - markdown parsing and dynamic query generation
  - unit tests for all current routes

<img src="/images/posts/mgc_v1/mgc-ui-1.png" alt="web app ui" title="analyze"  />

Once a response has been generated the user has the ability to select text from the response and dive deeper into that subject. This recursive style of research allows for users to find sub topics of interest and quickly generate information about them.

<img src="/images/posts/mgc_v1/mgc-ui-4.png" alt="web app ui" title="analyze"  />

After playing with the database schema over several weeks I decided on a fairly simple design where clicking on a line of text within a goal creates a new goal referencing the previous via its parent_goal_id. This allows for a tree like structure of goals to be created and queried. Combining this style of data creation with responsive UI animations allow for me to create a fun and engaging user experience.

I decided to implement openai chat completion streaming to provide the user with instant feedback. In order to pipe the completions from openai to my web app I used [Readable streams](https://nodejs.org/api/stream.html#readable-streams) in Nodejs with my cloudflare worker.

Surprisingly the most challenging part about working with the openai completion stream was making sure that the markdown syntax was parsed correctly during the stream as incomplete markdown lines can cause formatting inconsistentsies. To add to this the way new lines were parsed in the production deployed application varied from the development environment. I was able to improve my markdown parsing logic to handle the most edge cases but a few still exist.

Another challenge was prompting the AI to consistently provide quality results. I wanted to generate markdown in a pattern that I could rely on for splitting a goal's plan into a specific timeline and sub tasks. After some experimentation I have improved my results to where I could plan a expected format. I then parse the markdown into data I can properly query via my SQL DB.

I have also been working on a kanban board to track goals and their progress. This feature is still in development but I have a working prototype that allows users to drag goal sub tasks from one column to another.

<img src="/images/posts/mgc_v1/mgc-ui-3.png" alt="web app ui" title="analyze"  />

I have been referring to this as 'diving' and allows users to quickly generate new reading material without having to think of new topics or questions to ask.

My plan is to build a product that I can continually iterate on until I find a use case that resonates with users. During this time I aim to keep the product flexible enough so that I can leverage it as a base for a rebranded product using similar or the same technology if needed.

If you are reading this and have any feedback or ideas please reach out to me williamjonescodes@gmail.com

Cheers,

Will Jones

- A few of this month's goals
  - Eliminate any markdown parsing bugs
  - Organize backend routes and add in a web framework like [Hono](https://hono.dev/docs/)
  - Refactor worker code to use Cloudflare Durable Objects
