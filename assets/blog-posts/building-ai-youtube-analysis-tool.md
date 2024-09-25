---
title: "Building an AI-Powered YouTube Analysis Tool: A Journey from Development to Deployment"
date: "Sep 23, 2024"
excerpt: "Developing an AI-driven tool that extracts, transcribes, and analyzes YouTube videos has been both a challenging and rewarding experience. In this blog post, I’ll walk you through my entire journey, from selecting the technologies and architecture to deploying on Google Cloud Console, and share some insights into overcoming unexpected challenges along the way."
cover_image: "/images/posts/tubescriptai/tubescriptai.webp"
---

Github Repos: [Backend](https://github.com/CodeJonesW/tubeScriptAiServer), [Frontend](https://github.com/CodeJonesW/tubeScriptAiWebApp)

## Introduction

Developing an AI-driven tool that extracts, transcribes, and analyzes YouTube videos has been both a challenging and rewarding experience. In this blog post, I’ll walk you through my entire journey, from selecting the technologies and architecture to deploying on Google Cloud Console, and share some insights into overcoming unexpected challenges along the way.

<img src="/images/posts/tubescriptai/ui-1.png" alt="web app ui" title="Login"  />

## Project Overview

My goal was to create a web-based application where users could input a YouTube video URL and a prompt, allowing them to receive an AI-generated analysis of the video’s content. The solution would involve downloading the video, transcribing the audio, and applying an AI model to analyze the transcript.

<img src="/images/posts/tubescriptai/ui-2.png" alt="web app ui" title="Login"  />
<img src="/images/posts/tubescriptai/ui-3.png" alt="web app ui" title="analysis" />

## Technology Stack

### Frontend

React: I chose React for its flexibility, component-based structure, and rich ecosystem. It’s an ideal fit for building dynamic and interactive user interfaces.

### Backend

REST Server Framework - Flask: Flask is lightweight and allowed me to set up RESTful API endpoints quickly. It also integrates well with Celery for handling background tasks.

Task Processing - Celery: I used Celery for managing the background tasks of downloading, transcribing, and analyzing videos. This choice allowed me to handle long-running processes asynchronously, ensuring that the web app remains responsive.

Database - PostgreSQL: I chose PostgreSQL for its reliability and support for structured data. This made it suitable for storing user data, video information, and task statuses.

Cloud Storage - Google Cloud Storage: I used Google Cloud Storage to store the downloaded audio files, which facilitated scalable and secure data management. (Later removed)

Transcription and Analysis - Google Cloud Speech-to-Text API: I leveraged Google Cloud’s Speech-to-Text API for accurate transcriptions of the video content. It integrates seamlessly with the rest of the Google Cloud ecosystem.

AI Analysis - OpenAI API: This was used for analyzing transcripts based on user prompts, offering advanced AI capabilities to generate insights.

Why These Technologies?

- Scalability: The combination of Flask, Celery, and Google Cloud Platform allowed the application to scale horizontally, handling multiple requests and tasks concurrently.
- Simplicity: Using React on the frontend ensured that I could build a responsive and dynamic user experience quickly.
- Cost-Effectiveness: Google Cloud’s pay-as-you-go model meant that I could manage costs efficiently, scaling up resources only when necessary.

## Downloading YouTube Video Audio with yt-dlp

To download the audio from specific YouTube videos, I integrated the [yt-dlp library](https://github.com/yt-dlp/yt-dlp), a popular tool for handling video downloads from various platforms. yt-dlp is a fork of the well-known youtube-dl project but comes with enhanced features, performance improvements, and better support for handling YouTube's frequent changes.

The process starts when a user inputs a YouTube URL. The backend then invokes yt-dlp to extract and download the audio stream from the video. This approach ensures that the audio is directly available for transcription, eliminating the need for video-to-audio conversion.

One of the reasons I chose yt-dlp was its ability to handle a wide range of video formats and quality settings, making it flexible for different use cases. Additionally, yt-dlp has options to download only the audio, reducing bandwidth usage and storage needs, which is crucial for keeping the process efficient and cost-effective.

Integrating yt-dlp significantly streamlined the workflow of fetching YouTube content, making it an essential component of the project’s infrastructure.

## Speech-to-Text Transcription

Initially, I implemented the Google Cloud Speech-to-Text API using the long-running asynchronous method to handle video transcriptions. This approach involved uploading the audio files to a Google Cloud Storage bucket, initiating the transcription process via the GCP Speech to Text API, and then cleaning up by deleting the files in the bucket once transcribed. While effective, it was slow, introduced unnecessary complexity, and added costs.

To streamline the process, I switched to the synchronous Speech-to-Text API, which allowed me to keep the audio files locally on the server during transcription. This change eliminated the need for an external storage bucket, simplifying the workflow and reducing costs. Once the transcription completes, the local file is immediately deleted, ensuring no unnecessary storage usage.

### Implementing Chunking for Faster Transcription

One challenge with the synchronous API was handling long audio files efficiently. To address this, I modified the code to implement chunking, breaking the audio into smaller, manageable segments. Each chunk was then processed independently, allowing for much faster transcription response times. This chunking method significantly improved the overall transcription speed and made the synchronous API a more practical solution for handling larger videos.

This optimization was a pivotal step in enhancing the performance and cost-efficiency of the service, ensuring that users received transcription results in a timely manner without the need for additional cloud storage resources.

## Using the OpenAI API for Transcript Analysis

To analyze the transcribed audio from YouTube videos, I integrated the OpenAI API into the backend. This API allowed me to leverage advanced AI capabilities to generate meaningful insights based on the user-provided prompts. After transcribing the video content, the transcript is sent to OpenAI’s API, along with the user's prompt, where it performs natural language processing to analyze and extract relevant information.

The simplicity and power of the OpenAI API made it an ideal choice for this project, as it provided high-quality analysis without requiring extensive custom model training. This integration enabled the application to quickly deliver AI-generated insights, making the user experience seamless and engaging.

## Deploying to Google Cloud Platform

1. Setting Up the Backend and Celery Worker
   - I deployed my Flask backend and Celery worker using Google App Engine. This managed service enabled me to focus on my application without worrying about infrastructure management.
   - I used Google Cloud SQL for PostgreSQL to manage my database. The integration with App Engine made connecting the backend to the database straightforward.
   - I configured Cloud Memory Store for Redis to serve as the Celery broker and result backend. This allowed my Celery worker to handle background tasks efficiently.
2. Setting Up Frontend Deployment
   - The frontend was built using React and deployed to Google Cloud Storage as a static site, then served through Google Cloud CDN, ensuring low latency and high availability.
3. Managing Secrets and Configuration
   - I used Google Cloud Secret Manager to manage API keys and other sensitive information securely. This ensured that my application could access secrets without exposing them in the codebase.
4. Configuring VPC and Private IPs
   - To ensure secure communication between the backend services and the Cloud SQL instance, I configured a Virtual Private Cloud (VPC) connector. This allowed my services to connect to the database using private IP addresses.
5. Handling Worker Instances and Scaling

   - I set the instance_class and scaling settings in app.yaml and worker.yaml, allowing control over the number of instances based on load for cost-efficiency.

## Challenges Faced

### YouTube Blocking IPs

The largest blockers I encountered was YouTube restricting access to videos from my deployed server’s IP range. This resulted in the tool being unable to download certain videos that required verification or CAPTCHA checks, which was not an issue when running the application locally.

This challenge brought the project to a halt temporarily, and potential solutions include:

- Using Proxy Services: Setting up a proxy service to rotate IP addresses or implementing proxy pools to avoid getting blocked.
- Moving to Cloud Functions or Serverless Approaches: Deploying to serverless environments that dynamically change IPs might help circumvent restrictions.

yt-dlp issue related to YouTube blocking IPs - [here](https://github.com/yt-dlp/yt-dlp/issues/10085)

Interestingly vimeo worked without issue.

## Lessons Learned

- The Importance of Infrastructure Planning: Setting up secure connections using VPCs, configuring service accounts, and managing cloud resources were critical to ensuring that the deployment was seamless and scalable.
- Dealing with Rate Limits and Access Restrictions: Understanding that external services might have limitations or IP restrictions taught me to prepare for such issues ahead of time.
- Keeping Costs in Check: By monitoring services like Cloud Memory Store, I learned to identify and adjust configurations to reduce unnecessary expenses.
- The importance of thoroughly researching the terms of use for third-party products and services that I plan to integrate into web applications. The challenge with YouTube's IP restrictions and their policy on video downloading highlighted how essential it is to understand the legal and technical limitations imposed by these services.

## Conclusion

I have enjoyed developing and deploying this YouTube analysis tool. From choosing the right technologies to overcoming deployment issues and dealing with YouTube’s access restrictions, I have learned some valuable insights.

I plan to continue investigate the youtube ip blockiing issue but felt this was a excellent time to stop and review my experience.

If you are interested in trying the current version of the tool, you can access it [here](https://tubescriptai.uc.r.appspot.com/) (Note: The tool may not work for all YouTube videos due to the IP blocking issue). Here is a short vimeo video that works [here](https://vimeo.com/61695274)
