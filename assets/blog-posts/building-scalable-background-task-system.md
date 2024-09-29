---
title: "Building a Scalable Background Task System with Flask, Celery, and Redis"
date: "September 25, 2024"
excerpt: "Managing background processes in a scalable way"
cover_image: "/images/posts/building-a-scalable-background-task-system/redis.png"
---

Github Repo: [AI-powered YouTube Analysis Tool - Backend](https://github.com/CodeJonesW/tubeScriptAiServer)

In this post, I want to dive into how I set up the backend infrastructure for my AI-powered YouTube Analysis Tool using Flask, Celery, and Redis. If you've ever wondered how to efficiently handle long-running tasks in a web application, this reflection will walk you through my journey and share some insights I learned along the way.

## Why Celery and Flask?

When building my app, I needed a way to handle time-consuming tasks like downloading YouTube videos, transcribing audio, and analyzing transcripts without slowing down the user experience. This is why I chose Celery.

**Celery** is like a task manager for your app – it lets you run tasks in the background, so your web app doesn't get stuck waiting for them to finish. It integrates with **Flask**, a lightweight web framework that I used for building the backend. This combination allowed my app to stay responsive, even when dealing with heavy processing. When moving to the cloud, I used Google App Engine to host my Flask application and Celery workers. This allowed me to easily scale my instances as dynamically pending on traffic.

## Why Do We Need Redis?

To make Celery work, you need something called a **message broker**. Think of it as a post office that takes your task requests (letters) and delivers them to the right worker (the person processing the letter). For my project, I chose **Redis** as the message broker, and here's why:

- **Speed**: Redis is an in-memory data store, meaning it’s incredibly fast
- **Reliability**: Redis is known for its stability, making it a dependable choice for task management.
- **Simplicity**: It’s easy to set up and works well with Celery out of the box.

Other message brokers like RabbitMQ or Amazon SQS are also popular choices, but I choose Redis due to its speed, simplicity and to gain experience.

## Why Celery Needs a Message Broker

- Task Management: Celery relies on the message broker to hold tasks that need to be processed. When you send a task from your application, the broker queues it until a Celery worker picks it up.
- Communication: The message broker facilitates communication between the Celery workers and the application, ensuring tasks are properly distributed and processed in the background.
- Asynchronous Processing: The broker enables Celery to handle tasks asynchronously, allowing your main application to stay responsive while background tasks are executed.

## Using Google Cloud Memory Store for Redis

Instead of managing Redis on my own in the cloud, I opted to use **Google Cloud Memory Store**. It’s a managed service that lets you use Redis without worrying about the details of setup and maintenance. Here’s why I went this route:

- **No Infrastructure Hassle**: Google handles all the backend management, so I didn’t have to worry about setting up, patching, or maintaining Redis.
- **Scalability**: As my app grows, Memory Store can easily scale to handle more tasks by adjusting the configuration.
- **Seamless Integration**: Since my entire app was hosted on Google Cloud, using Memory Store was the obvious choice.

## Keeping Costs in Check

Initially, I was hit with a surprise – running the default setup for Google Cloud Memory Store was going to cost me about $70 per month. That was pretty steep for a new project, so I made some adjustments.

- Reduced the Instance Size: I adjusted the Redis instance capacity to a smaller size, opting for a 1 GB capacity tier instead of something larger. This reduction alone significantly lowered the monthly cost to about $35.77/month, which is a considerable saving for a small project. This capacity matched my app's current demands, ensuring I wasn't paying for unused resources. Just for reference increasing the max capacity to 300 GB cost $3,504.00/month

- Tweaked Celery Settings: By optimizing Celery's configuration, I reduced the load on Redis. Specifically, I:

  - Adjusted the concurrency level to match the available resources, ensuring workers weren’t overwhelming the Redis instance with too many simultaneous tasks.
  - Reduced the task result expiration time to minimize the memory usage within Redis. This prevented the unnecessary accumulation of completed task data, allowing Redis to operate more efficiently with the limited capacity.

While Google Cloud Memory Store with Redis is powerful, it can be pricey if you’re not careful. Starting with a smaller instance and adjusting settings based on actual usage made the most sense.

## PSQL Database

I needed a database in order to store user information for logging in and tracking the minutes each user has used. I chose to use a PostgreSQL database because it is a familiar, widely used, and easy to setup. In combination with SQLAlchemy, I was able to quickly define a user model that fit my needs.

Once moving to the cloud I used Google Cloud SQL to host my PostgreSQL database. This allowed me to easily scale my database as needed and keep it separate from my application server. I opted for the smallest instance size to keep costs low.

## How It All Works Together

Here’s a simple rundown of how everything ties together:

1. **User Input**: A user enters a YouTube URL in the app.
2. **Task Creation**: Flask sends a task (e.g., "Download this video") to Celery, which then pushes it to Redis.
3. **Task Processing**: A Celery worker picks up the task from Redis and starts working on it – downloading the video, transcribing audio, etc.
4. **Results**: Once the task is done, the worker sends the results back, and the user can see the AI-generated analysis.

## Pros and Cons of Using Google Cloud Memory Store with Redis

- **No Headaches with Infrastructure**: I didn’t have to worry about managing Redis myself.
- **High Performance**: Tasks get processed quickly thanks to Redis’s in-memory capabilities.
- **Flexible**: I could scale my Memory Store instance up or down depending on usage
- **Cost**: It can get expensive if you’re not careful with the instance size and configuration.

## Final Thoughts

Using Celery and Flask deployed to Google App Engine, and Google Cloud Memory Store for Redis was an interesting experience. I would have loved to test the system under heavy load to see how it scaled. (a task for another day).

However, I was able to learn a lot about how to manage background tasks in a scalable way. I also learned a lot about how to manage costs when using managed services like App Engine, Google Cloud Memory Store, and Cloud SQL.

I hope this reflection gives insight into how you might approach building your next application with background tasks in mind.

Will
