---
title: "Using Gen AI to Build an Image Recognition System"
date: "Dec 4, 2024"
excerpt: ""
cover_image: "/images/posts/image-recognition-design/rekognition.png"
# hide_image_in_slug: true
---

## Intro

I recently completed my Serverless Developer Certificate 🥳. Throughout the process I built 24 different solutions using AWS serverless technologies. One of the last projects was an image recognition system. I found this project interesting and wanted to cement the knowledge in my brain so I wrote this article.

## Building an Image Recognition System with Gen AI

The solution uses AWS serverless services to create an end to end image recognition and labeling system.

<img src="/images/posts/image-recognition-design/system_design_1.png" alt="overall design" title="overall design"  />

The system is deployed using the AWS cloud development kit. (AWS CDK) in three distinct stacks.

### The API stack

is composed of an AWS Lambda function thtat retrieves an image from a web server and stores that image in an Amazon Simple Storage Service Bucket

<img src="/images/posts/image-recognition-design/system_design_2.png" alt="api stack" title="api stack"  />

The Lambda function is invoked by the user through an API hosted on Amazon API Gateway. When an image is stored in the S3 bucket an event notification places a messag into an Amazon Simple Notification Service (Amazon SNS) topic.

The SNS topic then delivers the message to a subscriber Amazon Simple Queue Service (Amazon SQS) queue.

Before diving into the recognition stack, lets summarize the Amazon Rekognition technology.

---

### AWS Rekognition

makes it easy to add image and video analysis to applications. The service can identify people, scenes, objects, text and activities. It can detect inappropriate content. It can detect analyze and compare faces for a wide variety of user verification, people counting, and public safety use cases. based on amazon deep learning technology

#### Key benefits

- Simple integration via easy to use apis. No machine learning expertise required.
- Fully managed and provides consistent response times even as request volume increases to tens millions of requests
- It is continually learning from new data
- Batch and real time analysis

  - video streaming using Amazon kinesis video streams can be analyzed in real time.
  - images can be analyzed as they are uploaded to amazon s3
  - for large jobs images and videos can be analyzed in batches

- low cost
  - only pay for the number of images or minutes of videos you analyze and face data you store for verification.
- easily integrate face based verification into new or existing applications

#### Key Features

- identify thousands of objects, scenes, and activities
- capture pathing in videos - example: analyze athlete movement for post game analysis
- facial recognition fast and accurate with the ability to search a private repository of face images
- crowd mode face detection can detect and analyze up to 100 faces in a single image
- identify potentially unsafe or inappropriate content across images and videos
- control content via moderation levels
- facial analysis - demographic data, emotions, gender, age, general attributes like eyes open or glasses
- celebrity recognition identify well known people in image libraries
- recognize text from real world images such as street names, products, and license plates.

---

### The Recognition Stack's

lambda function is invoked by the work item from the API stack queue.

<img src="/images/posts/image-recognition-design/system_design_3.png" alt="recognition stack" title="recognition stack"  />

This Lambda function uses Amazon Rekognition to create labels for the image that is stored in the S3 bucket.

The Lambda function stores these labels in an Amazon DynamoDB table and places a message in the integration stack SNS topic.

The user can retrive the labels from the DynamoDB table by issuing an API call that invokes the list images Lambda function.

### The Integration Stack

is the final piece of this system. When the image recognition Lambda function places a message in the integration stack SNS topic, the message is delivered to the subscriber SQS queue. This new work item in the SQS queue invkes the integration Lambda function. The Lambda function converts the message to XML format and sends a POST request to the third party server via API Gateway.

<img src="/images/posts/image-recognition-design/system_design_4.png" alt="integration stack" title="integration stack"  />
