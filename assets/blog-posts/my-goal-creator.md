---
title: "Building a Fullstack Web App with Cloudflare Pages and Workers"
date: "Sep 30, 2024"
excerpt: "Leveraging Cloudflare's serverless platform to create a powerful, scalable, and efficient full-stack web application."
cover_image: "/images/posts/my-goal-creator/mygoalcreator.webp"
---

Live Application: [My Goal Creator](https://mygoalcreator.com)

### Introduction

In the ever-evolving world of web development, the demand for scalable, high-performing, and cost-efficient solutions is constantly growing. Serverless architecture has revolutionized how developers build and deploy modern applications, eliminating the need to manage infrastructure and enabling a focus on writing code. Cloudflare offers a comprehensive platform, and in this article, I'll cover how I used Pages, Workers, and D1 to build my application.

### Why Use Cloudflare's Serverless Platform?

A colleague recommended Cloudflare, and its simplicity allowed me to deploy my app within minutes, compared to AWS and GCP’s complexities.

1. **Global Distribution**: Cloudflare operates one of the largest networks in the world, with over 200 data centers. This ensures that your code runs as close to your users as possible, providing lightning-fast response times.

2. **Efficient Edge Computing**: Cloudflare Workers execute your code at the edge, meaning it runs in data centers close to the user, reducing latency significantly. This is particularly valuable for applications that require real-time interactions or need to deliver content quickly.

3. **Integrated Development**: Cloudflare offers seamless integration between Pages, Workers, and D1, making it easy to build full-stack applications that are deployed and scaled across their global network.

## Setting Up Cloudflare Pages and Workers

Cloudflare Pages provided instant deployment for my React frontend, while Workers ensured efficient edge execution for backend logic, including user authentication and integrations with external APIs. I would have likely choosen Python for backend logic but Python workers are still in beta at this time and seem to have some limitations. [source](https://developers.cloudflare.com/workers/languages/python/#_top)

By using Workers, I built the backend functionality of my application, including secure user authentication, data fetching, and integrations with third-party APIs. The deployment process was seamless with Cloudflare’s Wrangler CLI, allowing me to quickly test and deploy changes to my backend code.

### Managing Workers with Wrangler

Wrangler, Cloudflare’s CLI, made deploying and managing Workers straightforward, supporting quick setup, local development, and seamless deployment.

#### What is Wrangler?

Wrangler is like your personal assistant for interacting with Cloudflare Workers. It’s a command-line tool that lets you develop, test, and deploy your Workers right from your local environment. Think of it as the bridge between your code and Cloudflare’s powerful edge network.

#### How Wrangler Made My Life Easier

1. **Quick Setup**: Getting started with Wrangler was as simple as running `npm install -g wrangler` in my terminal. After that, I could initialize my project with `wrangler init`, which set up everything I needed to start working with Cloudflare Workers. It took just a few minutes to be up and running.

2. **Development Mode**: While building my app, I used `wrangler dev`, which allowed me to run my Workers locally and see changes instantly. It even emulates the Cloudflare edge environment, so I could test how my code would behave in production without leaving my local machine.

3. **Seamless Deployment**: Once I was happy with my code, deploying it was as simple as running `wrangler deploy`. Within seconds, my Worker was live and running on Cloudflare's global network. No need to worry about infrastructure, servers, or complicated deployment pipelines—Wrangler handled it all.

4. **Configuration Flexibility**: With Wrangler’s `wrangler.toml` configuration file, I could customize settings for my Worker, such as environment variables, and binding to external APIs or databases. This made integrating my Worker with other parts of my application much more manageable.

#### Key Commands That Made My Workflow Smoother

Here are some of the Wrangler commands that were indispensable during my project:

- `npx wrangler dev`: Run your Worker in a local development environment.
- `npx wrangler deploy`: Deploy your Worker to the Cloudflare network.
- `npx wrangler tail`: Stream real-time logs from your Worker

### Leveraging D1 for Serverless SQL Databases

D1 is Cloudflare's **native serverless SQL database** that integrates seamlessly with Workers and Pages. It allowed me to store and manage user data, goals, and other application-specific information without having to worry about traditional database management tasks. I believe setup was around 4 lines of code included in the wrangler.toml file.

## Environment Variables

I was able to easily create environment variables in the Cloudflare dashboard and access them in my Workers code. On the Frontend I had to create a way to check the projects current domain in order to select the correct environment variables which seemed like a workaround. The environment variables were compiled during the build process, which meant I didn’t need to use Cloudflare Secrets for them. However, I might adjust this setup in the future to better secure my function API URLs.

## What I built

I built [My Goal Creator](https://www.mygoalcreator.com), a web application that helps users set, track, and achieve their goals. The app was built using React for the frontend, leveraging the flexibility and performance that Cloudflare Pages offers. To generate personalized goal plans, I integrated OpenAI for natural language processing, allowing users to receive actionable steps tailored to their objectives.

Cloudflare’s platform simplified the entire process of deploying and scaling this app. By using Cloudflare Workers, I could handle user authentication, data management, and interactions with the OpenAI API without setting up complex backend infrastructure. Cloudflare D1 was instrumental in storing user goals and tracking their progress, seamlessly integrating with the rest of my tech stack. This combination allowed me to focus on building the core features without getting bogged down by server management, ensuring a smooth and responsive experience for users.

## Future Improvements

- Implementing routing and state management like Redux.
- Refactor the UI to use Material UI for consistent styling and improved user experience.
- Ability for users to edit their goals generated by AI and save them to the database.
- Ability to continue the conversation about a particular goal and save any notes or updates.

### Conclusion

Overall I have really enjoyed working with Cloudflare's serverless platform. As I continue to explore Cloudflare’s capabilities, I’m excited to see how I they can support future projects.

### Repos

[My Goal Creator - Worker](https://github.com/CodeJonesW/MyGoalCreator-worker)
[My Goal Creator - Frontend](https://github.com/CodeJonesW/MyGoalCreator)

### Further Learning and Resources

- [What is Serverless?](https://www.cloudflare.com/learning/serverless/what-is-serverless/)
- [Why Use Serverless?](https://www.cloudflare.com/learning/serverless/why-use-serverless/)
- [Serverless JavaScript with Cloudflare Workers](https://www.cloudflare.com/learning/serverless/serverless-javascript/)
- [Cloudflare Pages Documentation](https://developers.cloudflare.com/pages/)
- [Cloudflare Workers Documentation](https://developers.cloudflare.com/workers/)
- [Cloudflare D1 Documentation](https://developers.cloudflare.com/d1/)
