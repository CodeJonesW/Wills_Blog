---
title: "Building a Fullstack Web App with Cloudflare Pages and Workers"
date: "Sep 30, 2024"
excerpt: "Leveraging Cloudflare's serverless platform to create a powerful, scalable, and efficient full-stack web application."
cover_image: "/images/posts/my-goal-creator/mygoalcreator.webp"
---

### Introduction

In the ever-evolving world of web development, the demand for scalable, high-performing, and cost-efficient solutions is constantly growing. Serverless architecture has emerged as a revolutionary approach to building and deploying modern applications without the need to manage traditional infrastructure. This paradigm shift allows developers to focus on writing code, leaving infrastructure concerns such as scaling, provisioning, and maintenance to the serverless provider.

Cloudflare offers a comprehensive serverless platform that includes **Pages**, **Workers**, and **D1**, enabling developers to build full-stack web applications with ease. In this article, I'll share my experience of building a full-stack web application using Cloudflare's suite of serverless technologies and explain why Cloudflare stands out as an exceptional platform for this purpose.

### What Is Serverless?

The term "serverless" doesn't mean that servers are no longer involved; instead, it refers to an architecture where developers no longer have to manage the servers themselves. With serverless computing, developers can write code that runs in response to events, while the serverless provider (Cloudflare, in this case) handles infrastructure tasks such as provisioning, scaling, and load balancing. This leads to:

- **Reduced Complexity**: No need to worry about managing servers or configuring infrastructure.
- **Automatic Scaling**: Serverless platforms can handle any number of incoming requests, scaling up or down based on demand.
- **Cost Efficiency**: You only pay for the compute resources used, eliminating the need for pre-provisioned capacity.

Cloudflare’s serverless offerings go a step further by running code across its global network, ensuring low latency and high performance for users worldwide.

### Why Use Cloudflare's Serverless Platform?

After wrestling with the complexities of setting up projects on AWS and GCP—where configuring APIs, permissions, and infrastructure often felt overwhelming—a colleague recommended I try Cloudflare. The difference was immediate. Cloudflare's platform was far more intuitive, allowing me to deploy my app in minutes instead of hours. Its seamless integration, global reach, and edge computing capabilities made it the perfect choice, letting me focus on building features instead of managing infrastructure. A few other points that stood out to me were:

1. **Global Distribution**: Cloudflare operates one of the largest networks in the world, with over 200 data centers. This ensures that your code runs as close to your users as possible, providing lightning-fast response times.

2. **Efficient Edge Computing**: Cloudflare Workers execute your code at the edge, meaning it runs in data centers close to the user, reducing latency significantly. This is particularly valuable for applications that require real-time interactions or need to deliver content quickly.

3. **Integrated Development**: Cloudflare offers seamless integration between Pages, Workers, and D1, making it easy to build full-stack applications that are deployed and scaled across their global network.

### Setting Up Cloudflare Pages

As a React developer, this service made it incredibly simple to deploy my frontend application and integrate it with backend logic using Pages Functions. One slight negative for local develop was that hot reloading changes to the React app itself was not supported as I needed to build the app and then run Wrangler to see the changes. Hot reloading does work with the serviceless functions outside of the src directory. Possibly a way to improve this but I have not investigated it further.

#### Highlights of Cloudflare Pages:

- **Instant Deployment**: Once I connected my GitHub repository, my React app was deployed across Cloudflare's global network within minutes.
- **Custom Domain Setup**: Configuring a custom domain was seamless, with automatic SSL and DNS management.
- **Server-Side Logic with Functions**: Cloudflare Pages Functions allowed me to run server-side logic directly alongside my static assets. This capability made it easy to add API endpoints, handle form submissions, and interact with external services.

### Using Cloudflare Workers for Backend Logic

Cloudflare Workers are a core part of the Cloudflare serverless ecosystem, allowing you to execute JavaScript code at the edge of their network. This means my backend logic was running closer to users, significantly reducing latency and improving performance. I would have likely choosen Python for backend logic but Python workers are still in beta at this time and seem to have some limitations. [source](https://developers.cloudflare.com/workers/languages/python/#_top)

#### What Makes Workers Stand Out?

- **Event-Driven Execution**: Workers are triggered by events such as HTTP requests, making them ideal for building APIs, handling user authentication, and processing data in real time.
- **Scalability and Reliability**: Workers scale automatically to handle any number of incoming requests, which means I never had to worry about load balancing or server capacity.
- **Access to Global Resources**: I could access various external APIs directly from Workers, and since they run at the edge, the response times were consistently fast.

By using Workers, I built the backend functionality of my application, including secure user authentication, data fetching, and integrations with third-party APIs. The deployment process was seamless with Cloudflare’s Wrangler CLI, allowing me to quickly test and deploy changes to my backend code.

### Managing Workers with Wrangler

One of the standout tools I used during this project was **Wrangler**, Cloudflare’s CLI (Command Line Interface) tool that makes deploying and managing Workers a breeze. If you've ever been frustrated by lengthy deployments or confusing setup processes, you’re going to love how Wrangler simplifies things.

#### What is Wrangler?

Wrangler is like your personal assistant for interacting with Cloudflare Workers. It’s a command-line tool that lets you develop, test, and deploy your Workers right from your local environment. Think of it as the bridge between your code and Cloudflare’s powerful edge network.

#### How Wrangler Made My Life Easier

1. **Quick Setup**: Getting started with Wrangler was as simple as running `npm install -g wrangler` in my terminal. After that, I could initialize my project with `wrangler init`, which set up everything I needed to start working with Cloudflare Workers. It took just a few minutes to be up and running.

2. **Development Mode**: While building my app, I used `wrangler dev`, which allowed me to run my Workers locally and see changes instantly. It even emulates the Cloudflare edge environment, so I could test how my code would behave in production without leaving my local machine.

3. **Seamless Deployment**: Once I was happy with my code, deploying it was as simple as running `wrangler publish`. Within seconds, my Worker was live and running on Cloudflare's global network. No need to worry about infrastructure, servers, or complicated deployment pipelines—Wrangler handled it all.

4. **Environment Management**: Wrangler made it easy to manage different environments (development, staging, production). I could deploy to different environments using simple commands like `wrangler publish --env production`. This made testing new features and updates in a sandbox environment incredibly straightforward.

5. **Configuration Flexibility**: With Wrangler’s `wrangler.toml` configuration file, I could customize settings for my Worker, such as environment variables, KV namespaces, and binding to external APIs or databases. This made integrating my Worker with other parts of my application much more manageable.

#### Key Commands That Made My Workflow Smoother

Here are some of the Wrangler commands that were indispensable during my project:

- `npx wrangler dev`: Run your Worker in a local development environment.
- `npx wrangler deploy`: Deploy your Worker to the Cloudflare network.
- `npx wrangler tail`: Stream real-time logs from your Worker

### Leveraging D1 for Serverless SQL Databases

D1 is Cloudflare's **native serverless SQL database** that integrates seamlessly with Workers and Pages. It allowed me to store and manage user data, goals, and other application-specific information without having to worry about traditional database management tasks. I believe setup was around 4 lines of code included in the wrangler.toml file.

#### Key Benefits of Using D1:

- **Instant Scaling**: D1 handles scaling automatically, so my database could manage growing traffic and data without intervention.
- **Serverless SQL Queries**: I could perform SQL queries directly within my Workers, making data access fast and efficient. Configuration was very simple. 4 lines of code and I had a database connection.
- **Time-Travel Backups**: The ability to restore my database to any point within the last 30 days provided peace of mind in case of a future data loss event.

### How Cloudflare's Serverless Approach Simplified My Development Workflow

Throughout this project, the most significant advantage was how Cloudflare's serverless technologies allowed me to focus on writing code rather than managing infrastructure. Here’s how:

- **Reduced Overhead**: I didn't have to worry about setting up servers, load balancers, or database instances, which saved me valuable time and effort.
- **Global Scalability**: My app was instantly available worldwide, with minimal latency, thanks to Cloudflare's extensive edge network.
- **Unified Development**: With Pages, Workers, and D1 working together seamlessly, I was able to maintain a unified codebase for both frontend and backend logic.

## Domain Registration

I was able to register a domain directly through Cloudflare and assign to my Pages project. This was a seamless process and allowed me to manage everything in one place.

## Environment Variables

I was able to easily create environment variables in the Cloudflare dashboard and access them in my Workers code. On the Frontend I had to create a way to check the projects current domain in order to select the correct environment variables which seemed like a workaround. The env variables would compiled in the build process and I did not have to use cloudflaore secrets. Possible I may change this to hide my functions API urls in the future.

## What I built

I built [My Goal Creator](https://mygoalcreator.com), a web application that helps users set, track, and achieve their goals. The app allows users to simply state their goal, areas of focus, and a timeline for completion and then use AI to generate a plan to achieve the goal. Users can save their goals and check them later. The MVP has been deployed and I look forward to adding more features in the future. As someone who I always looking to improve and set goals, I found this project to be very rewarding.

## Future Improvements

- Implementing routing and state management like Redux.
- Refactor the UI to use Material UI for consistent styling and improved user experience.
- Ability for users to edit their goals generated by AI and save them to the database.
- Ability to continue the conversation about a particular goal and save any notes or updates.

### Conclusion

Cloudflare's serverless platform, with its combination of Pages, Workers, and D1, provided everything I needed to build a full-stack web application quickly and efficiently. By leveraging Cloudflare's global network, I was able to deliver a responsive, scalable, and reliable app to users around the world. If you’re looking for a modern solution to building and deploying web applications, Cloudflare's serverless technologies offer a powerful and developer-friendly option.

### Repos

[Worker](https://github.com/CodeJonesW/MyGoalCreator-worker)
[Frontend](https://github.com/CodeJonesW/MyGoalCreator)

### Further Learning and Resources

- [What is Serverless?](https://www.cloudflare.com/learning/serverless/what-is-serverless/)
- [Why Use Serverless?](https://www.cloudflare.com/learning/serverless/why-use-serverless/)
- [Serverless JavaScript with Cloudflare Workers](https://www.cloudflare.com/learning/serverless/serverless-javascript/)
- [Cloudflare Pages Documentation](https://developers.cloudflare.com/pages/)
- [Cloudflare Workers Documentation](https://developers.cloudflare.com/workers/)
- [Cloudflare D1 Documentation](https://developers.cloudflare.com/d1/)
