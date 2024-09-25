---
title: "Technical Reflection - Building a Scalable Background Task System with Flask, Celery, and Google Cloud Memory Store"
date: "September 25, 2024"
excerpt: "Managing background process in a scalable way"
cover_image: "/images/posts/building-a-scalable-background-task-system/redis.png"
---

Github Repo: [AI-powered YouTube Analysis Tool - Backend](https://github.com/CodeJonesW/tubeScriptAiServer)

In this post, I want to dive into how I set up the backend infrastructure for my AI-powered YouTube Analysis Tool using Flask, Celery, and Google Cloud Memory Store with Redis. If you've ever wondered how to efficiently handle long-running tasks in a web application, this reflection will walk you through my journey and share some tips on managing background processes in a scalable way.

## Why Celery and Flask?

When building my app, I needed a way to handle time-consuming tasks like downloading YouTube videos, transcribing audio, and analyzing transcripts without slowing down the user experience. That’s where Celery came in handy.

**Celery** is like a task manager for your app – it lets you run tasks in the background, so your web app doesn't get stuck waiting for them to finish. It works seamlessly with **Flask**, a lightweight web framework that I used for building the backend. This combination allowed my app to stay responsive, even when dealing with heavy processing.

## Why Do We Need Redis?

To make Celery work, you need something called a **message broker**. Think of it as a post office that takes your task requests (letters) and delivers them to the right worker (the person processing the letter). For my project, I chose **Redis** as the message broker, and here's why:

- **Speed**: Redis is an in-memory data store, meaning it’s incredibly fast – perfect for handling quick communication between the web app and Celery workers.
- **Reliability**: Redis is known for its stability, making it a dependable choice for task management.
- **Simplicity**: It’s easy to set up and works well with Celery out of the box.

Other message brokers like RabbitMQ or Amazon SQS are also popular choices, but I choose Redis due to its speed, simplicity and to gain experience.

## Why Celery Needs a Message Broker

- Task Management: Celery relies on the message broker to hold tasks that need to be processed. When you send a task from your application, the broker queues it until a Celery worker picks it up.
- Communication: The message broker facilitates communication between the Celery workers and the application, ensuring tasks are properly distributed and processed in the background.
- Asynchronous Processing: The broker enables Celery to handle tasks asynchronously, allowing your main application to stay responsive while background tasks are executed.

## Using Google Cloud Memory Store for Redis

Now, instead of managing Redis on my own, I opted to use **Google Cloud Memory Store**. It’s a managed service that lets you use Redis without worrying about the nitty-gritty details of setup and maintenance. Here’s why I went this route:

- **No Infrastructure Hassle**: Google handles all the backend management, so I didn’t have to worry about setting up, patching, or maintaining Redis.
- **Scalability**: As my app grows, Memory Store can easily scale to handle more tasks without me having to lift a finger.
- **Seamless Integration**: Since my entire app was hosted on Google Cloud, using Memory Store made it super easy to connect everything.

## Keeping Costs in Check

Initially, I was hit with a suprise – running the default setup for Google Cloud Memory Store cost me about $70 per month. That was pretty steep for a new project, so I needed to make some adjustments. Here’s what I did:

- Reduced the Instance Size: I adjusted the Redis instance capacity to a smaller size, opting for a 1 GB capacity tier instead of something larger. This reduction alone significantly lowered the monthly cost to about $35.77/month, which is a considerable saving for a small project. This capacity matched my app's current demands, ensuring I wasn't paying for unused resources. Just for reference increasing the max capacity to 300 GB cost $3,504.00/month

- Tweaked Celery Settings: By optimizing Celery's configuration, I reduced the load on Redis. Specifically, I:

  - Adjusted the concurrency level to match the available resources, ensuring workers weren’t overwhelming the Redis instance with too many simultaneous tasks.
  - Reduced the task result expiration time to minimize the memory usage within Redis. This prevented unnecessary accumulation of completed task data, allowing Redis to operate more efficiently with the limited capacity.

While Google Cloud Memory Store with Redis is incredibly powerful, it can be pricey if you’re not careful. I recommend starting with a smaller instance and adjusting settings based on actual usage to avoid unnecessary costs.

## How It All Works Together

Here’s a simple rundown of how everything ties together:

1. **User Input**: A user enters a YouTube URL in the app.
2. **Task Creation**: Flask sends a task (e.g., "Download this video") to Celery, which then pushes it to Redis.
3. **Task Processing**: A Celery worker picks up the task from Redis and starts working on it – downloading the video, transcribing audio, etc.
4. **Results**: Once the task is done, the worker sends the results back, and the user can see the AI-generated analysis.

## The Advantages I’ve Seen

- **No Headaches with Infrastructure**: I didn’t have to worry about managing Redis myself.
- **High Performance**: Tasks get processed quickly thanks to Redis’s in-memory capabilities.
- **Flexible Costs**: I could scale my Memory Store instance up or down depending on usage

## When Should You Consider Using Google Cloud Memory Store with Redis?

- If you need a managed, scalable solution for handling background tasks (perfect for Celery).
- For real-time data processing, where speed is crucial.
- When you want seamless integration with other Google Cloud services.

## Final Thoughts

Using Celery with Flask and Google Cloud Memory Store for Redis was a game-changer for my AI-powered YouTube Analysis Tool. It made handling background tasks smooth and kept my app responsive, even with heavy workloads. If you're building a web app that needs to juggle multiple tasks or processes in the background, I highly recommend exploring this setup.

I hope this reflection gives you some insight into how Celery, Flask, and Google Cloud Memory Store with Redis can work together to build a scalable and efficient background task system. Feel free to reach out if you have any questions or want to share your experiences with similar setups!
