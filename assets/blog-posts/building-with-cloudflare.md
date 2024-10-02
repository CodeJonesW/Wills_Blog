---
title: "Building a Fullstack Web App with Cloudflare Pages, Workers, and D1 SQL Databases"
date: "Sep 30, 2024"
excerpt: "Leveraging Cloudflare's serverless platform to create a powerful, scalable, and efficient full-stack web application."
cover_image: "/images/posts/my-goal-creator/mygoalcreator.webp"
---

Live Application: [My Goal Creator](https://mygoalcreator.com)

### Introduction

The demand for scalable, high-performing, and cost-efficient solutions is constantly growing. Serverless architecture has revolutionized how developers build and deploy modern applications, eliminating the need to manage infrastructure and enabling a focus on writing code. My goal is to find the best way to quickly deploy scalable applications to the web. Cloudflare offers a comprehensive platform, and in this article, I'll cover my experience using Pages, Workers, and D1 to build my application.

### Why Use Cloudflare's Serverless Platform?

A colleague recommended Cloudflare for its high quality developer experience. Taking this path allowed me to deploy my app within a few hours. When compared to complexities of AWS and GCP, Cloudflare was a great choice. A few notable points that made Cloudflare stand out were:

1. **Global Distribution**: Cloudflare Workers execute your code in data centers close to the user, reducing latency significantly. This is particularly valuable for applications that require real-time interactions or need to deliver content quickly.

2. **Integrated Development**: Cloudflare offers seamless integration between Pages, Workers, and D1, making it easy to build full-stack applications.

3. **Cost-Effective**: Cloudflare’s pay-as-you-go pricing model ensures you only pay for what you use, making it a cost-effective solution for startups and small businesses.

## Setting Up Cloudflare Pages and Workers

Cloudflare Pages provided instant deployment for my React frontend, while Workers handled the backend logic including user authentication and integrations with external APIs. I choose Typescript to write the worker code. Python workers are still in beta at this time. [source](https://developers.cloudflare.com/workers/languages/python/#_top)

Pages allow developers to link a git repository for automatic deployments based on branch rules. This made it easy to set up a deployment pipeline for my frontend code. Developing pages locally did not seem to support hot reloading due to relying on the react app to be build prior to running wrangler. This added extra time to the frontend development process but was not a deal breaker. When making code changes to the worker, wrangler would automatically reload the changes without having to stop and start the process.

```bash
- npm run build
- npx wrangler pages dev ./build --port 8788
```

### Managing Workers with Wrangler

Wrangler, Cloudflare’s CLI, made deploying and managing Workers straightforward, supporting quick setup, local development, and deployment.

Getting started with Wrangler was as simple as running

```bash
brew install cloudflare-wrangler
yarn create cloudflare@latest my-first-worker
```

The above commands set up everything I needed to start working with Cloudflare Workers. It only took a few minutes to be up and running. With Wrangler’s wrangler.toml configuration file, I could customize settings for my Worker, such as environment variables, and binding to external APIs or databases.

### Key Commands That Made My Workflow Smoother

Here are some of the Wrangler commands that were indispensable during my project:

```bash
 npx wrangler dev: # Run your Worker in a local development environment.
 npx wrangler deploy # Deploy your Worker to the Cloudflare network.
 npx wrangler tail # Stream real-time logs from your Worker
```

### Leveraging D1 for Serverless SQL Databases

D1 is Cloudflare's **native serverless SQL database** that integrates with Workers and Pages. It allowed me to store and manage user data, goals, and other application-specific information without having to worry about traditional database management tasks. The setup involved around 4 lines of code included in the wrangler.toml file and a traditional SQL schema file.

### Environment Variables

I was able to easily create environment variables in the Cloudflare dashboard and access them in my Workers code. The React applications environment variables were compiled during the build process, which meant I could not to use Cloudflare Secrets for them.

### What I built

I built [My Goal Creator](https://mygoalcreator.com), a web application that helps users generate a plan to achieve their goals.

By using Cloudflare Workers, I could handle user authentication, data management, and interactions with the OpenAI API without setting up complex backend infrastructure. This combination allowed me to focus on building the core features without getting bogged down by server management, ensuring a smooth and responsive experience for users.

### My Goal Creator Future Improvements

- Implementing routing and state management like Redux.
- Refactor the UI to use Material UI for consistent styling and improved user experience.
- Ability for users to edit their goals generated by AI and save them to the database.
- Ability to continue the conversation about a particular goal and save any notes or updates.
- Goal tracking and analytics to help users stay on track and motivated.

### Conclusion

This project was a great way to get introduced to Cloudflare products. Overall I have really enjoyed working with their serverless platform and will likely choose it again to support future endeavors.

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

```

```
