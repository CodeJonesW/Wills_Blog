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

1. **Global Distribution**: Cloudflare Workers execute your code in data centers close to the user, reducing latency significantly. This is particularly valuable for applications that require real-time interactions or need to deliver content quickly.

2. **Integrated Development**: Cloudflare offers seamless integration between Pages, Workers, and D1, making it easy to build full-stack applications.

3. **Cost-Effective**: Cloudflare’s pay-as-you-go pricing model ensures you only pay for what you use, making it a cost-effective solution for startups and small businesses.

## Setting Up Cloudflare Pages and Workers

Cloudflare Pages provided instant deployment for my React frontend, while Workers handled the backend logic including user authentication and integrations with external APIs. I choose Typescript to write the worker code. Python workers are still in beta at this time. [source](https://developers.cloudflare.com/workers/languages/python/#_top)

Pages allow developers to link a git repository for automatic deployments based on branch rules. This made it easy to set up a CI/CD pipeline for my frontend code, ensuring that changes were deployed automatically when pushed to the repository. Developing pages locally did not seem to support hot reloading due to relying on the react app to be build prior to running wrangler. This added extra time to the development process but was not a deal breaker.

```bash
- npm run build
- npx wrangler pages dev ./build --port 8788
```

### Managing Workers with Wrangler

Wrangler, Cloudflare’s CLI, made deploying and managing Workers straightforward, supporting quick setup, local development, and seamless deployment.

- **Quick Setup**: Getting started with Wrangler was as simple as running

```bash
brew install cloudflare-wrangler
yarn create cloudflare@latest my-first-worker
```

The above commands set up everything I needed to start working with Cloudflare Workers. It only took a few minutes to be up and running. With Wrangler’s `wrangler.toml` configuration file, I could customize settings for my Worker, such as environment variables, and binding to external APIs or databases.

### Key Commands That Made My Workflow Smoother

Here are some of the Wrangler commands that were indispensable during my project:

```bash
 npx wrangler dev: # Run your Worker in a local development environment.
 npx wrangler deploy # Deploy your Worker to the Cloudflare network.
 npx wrangler tail # Stream real-time logs from your Worker
```

### Leveraging D1 for Serverless SQL Databases

D1 is Cloudflare's **native serverless SQL database** that integrates seamlessly with Workers and Pages. It allowed me to store and manage user data, goals, and other application-specific information without having to worry about traditional database management tasks. The setup was around 4 lines of code included in the wrangler.toml file.

### Environment Variables

I was able to easily create environment variables in the Cloudflare dashboard and access them in my Workers code. On the Frontend I had to create a way to check the projects current domain in order to select the correct environment variables which seemed like a workaround. The environment variables were compiled during the build process, which meant I didn’t need to use Cloudflare Secrets for them. However, I might adjust this setup in the future to better secure my function API URLs.

### What I built

I built [My Goal Creator](https://www.mygoalcreator.com), a web application that helps users set, track, and achieve their goals. The app was built using React for the frontend, leveraging the flexibility and performance that Cloudflare Pages offers. To generate personalized goal plans, I integrated OpenAI for natural language processing, allowing users to receive actionable steps tailored to their objectives.

Cloudflare’s platform simplified the entire process of deploying and scaling this app. By using Cloudflare Workers, I could handle user authentication, data management, and interactions with the OpenAI API without setting up complex backend infrastructure. Cloudflare D1 was instrumental in storing user goals and tracking their progress, seamlessly integrating with the rest of my tech stack. This combination allowed me to focus on building the core features without getting bogged down by server management, ensuring a smooth and responsive experience for users.

### My Goal Creator Future Improvements

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
