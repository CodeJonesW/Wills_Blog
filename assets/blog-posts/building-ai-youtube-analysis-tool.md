---
title: "Building an AI-Powered YouTube Analysis Tool and Deploying on Google Cloud Platform"
date: "Sep 23, 2024"
excerpt: "Developing an AI-driven tool that extracts, transcribes, and analyzes YouTube videos has been both a challenging and rewarding experience. In this blog post, I’ll walk you through my entire journey, from selecting the technologies and architecture to deploying on Google Cloud Console, and share some insights into overcoming unexpected challenges along the way."
cover_image: "/images/posts/tubescriptai/tubescriptai.webp"
---

Github Repos: [Backend](https://github.com/CodeJonesW/tubeScriptAiServer), [Frontend](https://github.com/CodeJonesW/tubeScriptAiWebApp)

## Introduction

Developing an AI-driven tool that extracts, transcribes, and analyzes YouTube videos has been a rewarding experience. In this blog post, I’ll walk you through my entire journey, from selecting the technologies and architecture to deploying on Google Cloud Console.

<img src="/images/posts/tubescriptai/ui-1.png" alt="web app ui" title="Login"  />

## Project Overview

My goal was to create a web-based application where users could input a YouTube video URL and a prompt, allowing them to receive an AI-generated analysis of the video’s content. The solution would involve downloading the video, transcribing the audio, and applying an AI model to analyze the transcript.

<img src="/images/posts/tubescriptai/ui-2.png" alt="web app ui" title="Login"  />
<img src="/images/posts/tubescriptai/ui-3.png" alt="web app ui" title="analysis" />

## Technology Stack

### Frontend

React: I chose React for its ability to be deployed on many platforms, familiarity, and fast development timeline. My goal was to build a minimalistic, clean, and responsive UI that clearly communicated the intention of the tool.

### Backend

REST Server Framework - Flask: It is lightweight, allowed for quick set up of REST API endpoints and integrated well with Celery.

Task Processing - Celery: Used for managing the background tasks such as downloading video, transcribing, and analyzing. This choice allowed me to handle long-running processes asynchronously, ensuring that the web app remained responsive.

Database - PostgreSQL: Widely used, easy to set up, and familiar. Pairs well with SQLAlchemy for ORM capabilities.

Transcription and Analysis - Google Cloud Speech-to-Text API: Easy to integrate, accurate, and integrates well with other Google Cloud services.

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

```python
import yt_dlp as youtube_dl
import ffmpeg
import os
import logging

logger = logging.getLogger(__name__)

def download_audio(youtube_url):
    output_dir = "../tmp/downloads"
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)

    ydl_opts = {
        'format': 'bestaudio/best',
        'noplaylist': True,
        'outtmpl': os.path.join(output_dir, '%(id)s.%(ext)s'),
        'postprocessors': [{
            'key': 'FFmpegExtractAudio',
            'preferredcodec': 'mp3',
            'preferredquality': '192',
        }],
    }
    try:
        with youtube_dl.YoutubeDL(ydl_opts) as ydl:
            info_dict = ydl.extract_info(youtube_url, download=True)
            video_id = info_dict.get("id", None)
            audio_file = os.path.join(output_dir, f"{video_id}.mp3")

        if not os.path.exists(audio_file):
            raise FileNotFoundError("Audio file could not be created")

        return audio_file
    except Exception as e:
        logger.error(f"Error downloading audio: {str(e)}")
        raise Exception(str(e))
```

## Speech-to-Text Transcription

Initially, I implemented the Google Cloud Speech-to-Text API using the long-running asynchronous method to handle video transcriptions. This approach involved uploading the audio files to a Google Cloud Storage bucket, initiating the transcription process via the GCP Speech to Text API, and then cleaning up by deleting the files in the bucket once transcribed. While effective, it was slow, introduced unnecessary complexity, and added costs.

To streamline the process, I switched to the synchronous Speech-to-Text API, which allowed me to keep the audio files locally on the server during transcription. This change eliminated the need for an external storage bucket, simplifying the workflow and reducing costs. Once the transcription completes, the local file is immediately deleted, ensuring no unnecessary storage usage.

### Implementing Chunking for Faster Transcription

One challenge with the synchronous API was handling long audio files efficiently. To address this, I modified the code to implement chunking, breaking the audio into smaller, manageable segments. Each chunk was then processed independently, allowing for much faster transcription response times. This chunking method significantly improved the overall transcription speed and made the synchronous API a more practical solution for handling larger videos.

This optimization was a pivotal step in enhancing the performance and cost-efficiency of the service, ensuring that users received transcription results in a timely manner without the need for additional cloud storage resources.

```python
import os
import logging
import asyncio
from google.cloud import speech, storage
import ffmpeg
from concurrent.futures import ThreadPoolExecutor
import math

logger = logging.getLogger(__name__)

# ThreadPoolExecutor for running blocking IO operations
executor = ThreadPoolExecutor(max_workers=32)

def split_audio_into_chunks(input_audio_file, chunk_length=30):
    """Split the audio file into chunks of specified length (in seconds)."""
    probe = ffmpeg.probe(input_audio_file)
    duration = float(probe['format']['duration'])

    num_chunks = math.ceil(duration / chunk_length)

    chunk_files = []
    for i in range(num_chunks):
        start_time = i * chunk_length
        output_chunk = f"{input_audio_file.replace('.wav', '')}_chunk{i}.wav"
        (
            ffmpeg
            .input(input_audio_file, ss=start_time, t=chunk_length)
            .output(output_chunk)
            .run(overwrite_output=True)
        )
        chunk_files.append(output_chunk)

    return chunk_files

async def transcribe_audio_chunk(audio_chunk):
    """Asynchronously transcribe a single audio chunk."""
    client = speech.SpeechClient()

    # Read the audio chunk file as binary content
    with open(audio_chunk, "rb") as audio_file:
        audio_content = audio_file.read()

    audio = speech.RecognitionAudio(content=audio_content)
    config = speech.RecognitionConfig(
        encoding=speech.RecognitionConfig.AudioEncoding.LINEAR16,
        sample_rate_hertz=16000,
        language_code="en-US"
    )

    # Synchronous transcription offloaded to thread pool
    response = await asyncio.get_event_loop().run_in_executor(
        executor, lambda: client.recognize(config=config, audio=audio)
    )
    transcript = ""
    for result in response.results:
        transcript += result.alternatives[0].transcript + "\n"

    return transcript

async def transcribe_audio_google(audio_file, chunk_length=30):
    """Asynchronously transcribe long audio by splitting into chunks and transcribing each."""
    # Convert MP3 to WAV
    wav_file = convert_mp3_to_wav(audio_file)

    # Split the WAV file into smaller chunks
    audio_chunks = split_audio_into_chunks(wav_file, chunk_length)

    # Asynchronously transcribe each chunk
    transcript = ""
    tasks = [transcribe_audio_chunk(chunk) for chunk in audio_chunks]

    # Gather results asynchronously
    results = await asyncio.gather(*tasks)

    # Combine all transcriptions
    for result in results:
        transcript += result

    return transcript, audio_chunks

def convert_mp3_to_wav(mp3_file_path):
    """Convert MP3 at a given file path to WAV format."""
    try:
        if not os.path.isfile(mp3_file_path):
            raise FileNotFoundError(f"The file {mp3_file_path} does not exist.")

        wav_file_path = mp3_file_path.replace(".mp3", ".wav")

        ffmpeg.input(mp3_file_path).output(wav_file_path, ac=1, ar=16000).run(overwrite_output=True)

        return wav_file_path

    except Exception as e:
        logger.error(f"Error converting {mp3_file_path} to WAV: {str(e)}")
        raise
```

## Using the OpenAI API for Transcript Analysis

To analyze the transcribed audio from YouTube videos, I integrated the OpenAI API into the backend. This API allowed me to leverage advanced AI capabilities to generate meaningful insights based on the user-provided prompts. After transcribing the video content, the transcript is sent to OpenAI’s API, along with the user's prompt, where it performs natural language processing to analyze and extract relevant information.

The simplicity and power of the OpenAI API made it an ideal choice for this project, as it provided high-quality analysis without requiring extensive custom model training. This integration enabled the application to quickly deliver AI-generated insights, making the user experience seamless and engaging.

```python
from openai import OpenAI
import os
from dotenv import load_dotenv
from utils.get_env_variables import load_secrets

load_dotenv()

secrets = load_secrets()

client = OpenAI(
    api_key= secrets['OPEN_AI_API_KEY'],
)
import logging

logger = logging.getLogger(__name__)


def analyze_text(transcript, user_prompt):
    logger.info('Begin ----- analyze_text')
    """Analyze the transcript based on the user's prompt using OpenAI GPT."""
    try:
        if user_prompt == 'summarize':
            prompt = f'write a detailed summary of the following text: {transcript}'
        else:
            prompt = f"{user_prompt}: {transcript}"

        chat_completion = client.chat.completions.create(
            messages=[
                {
                    "role": "user",
                    "content": prompt
                }
            ],
            model="gpt-3.5-turbo"
        )
        return chat_completion.choices[0].message.content

    except Exception as e:
        logger.error(f"Error during transcript analysis: {str(e)}")
        raise
```

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
   - To ensure secure communication between the backend services and the Cloud SQL instance, I configured a Virtual Private Cloud (VPC) connector. This allowed my services to connect to the each other using private IP addresses.
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

I have enjoyed developing and deploying this YouTube analysis tool. From choosing technologies to overcoming deployment issues and dealing with YouTube’s access restrictions, I have learned some valuable insights.

Will

---

## Update

Due to the YouTube IP blocking issue, I have decided to remove the project from the public domain in order to focus on other learning objectives. However, I am happy to share the codebase with anyone interested. The project's Readme.md contains detailed instructions on how to set up the application locally.

Github Repos: [Backend](https://github.com/CodeJonesW/tubeScriptAiServer), [Frontend](https://github.com/CodeJonesW/tubeScriptAiWebApp)
