---
title: "Technical Reflection: Migrate project to new domain "
date: "Nov 17, 2023"
excerpt: ""
cover_image: "/images/posts/friday-night-node-update/node.png"
---

It's Friday evening, and I'm at home, thinking about how I can improve my personal blog website while aiming for a good night's rest. These are exciting times, as I’m passionate about building tools that serve my personal needs, like creating a platform to process my thoughts and deepen my understanding of technology.

So far, most of my articles have been thought experiments, where I explore how I would plan and execute various technical projects. I enjoy this process because it allows me to envision possibilities without committing the time usually needed to reach an actual end result. It's like placing myself at the end of a project’s timeline, imagining potential challenges, and reflecting on how to navigate them. This approach can be applied to many aspects of life, from running a business to planning a website or even cooking a meal.

But tonight, I’m trying something different.

I'm experimenting with a new writing style I’m calling "Technical Reflection" (a working title). Essentially, it’s a journal capturing my experience in building or solving a problem.

### Technical Reflection - Friday Night Node Update

Tonight, I spent some time doing maintenance on a few personal domains I’ve had hosted for a while. The primary task was to shut down an existing React project and transfer my Next.js project over to the React project's domain. The goal is to use my old portfolio domain for my blog. Since my Next.js project hadn’t been updated in about a year, I knew I’d have to make some changes along the way.

My first task was to migrate the content from Website 'A' to Domain 'B' and simultaneously take down the existing content on Domain 'B.' To my surprise, the process was smooth. Vercel made it incredibly easy to grab my DNS records and update them in Google Domains, which saved me a lot of potential hassle.

Next, I needed to update my computer's Node.js version so I could update the Next.js project and integrate Material UI (MUI). The joy of updates – one change inevitably leads to another! My goal is to leverage MUI's grid component to simplify and enhance my solution for responsive screens.

Updating my Node.js version and packages went smoothly. Using NVM (Node Version Manager) to install the recommended version of Node.js was straightforward and painless.

With these updates in place, my next task is to create a résumé page, an about page, and publish this blog post.

Final Thoughts
This was a fun experiment, and I’m excited about continuing this pattern of writing. By capturing my technical journey in real-time, I feel like I’m not only documenting my progress but also creating a resource that helps me reinforce my knowledge as I continue to develop me skills.

Until next time,

Will
