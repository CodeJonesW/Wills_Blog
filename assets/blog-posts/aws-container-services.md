---
title: "AWS Container Services"
date: "Janaury 12, 2025"
excerpt: ""
cover_image: "/images/posts/aws-container-services/containers_vs_traditional_software.png"
hide_image_in_slug: true
---

## Intro

In November of 2024, I set out to begin acquiring AWS certificates and increase my understanding of the tools available in the Amazon cloud. I have learned more than I expected and increased my understanding of concepts that are applicable across various cloud platforms. In my initial article I decided that on top of learning the AWS tooling I wanted to know more about containerizing applications and deploying with Kubernetes. I was excited to discover this project involving deploying docker containers to AWS using [Amazon Elastic Container Service](https://aws.amazon.com/ecs/) which has similarities to Kubernetes and references [Amazon Elastic Kubernetes Service](https://aws.amazon.com/eks/) and provides some information on the subject. In the following article I explain more about container services on Amazon and review what I was able to deploy. This was one of my favorite projects in the [Solutions Architect Certification](https://www.credly.com/badges/6c34a40b-f378-47a0-bad7-bec63dd743d3/linked_in?t=soronh) I completed.

### Life Update

I am happy to have accepted a new software position! I estimate it will allow me to work on much bigger systems with many integrated technologies. Very excited to accept the challenge and grow into the role.

## Overview of Containers

In traditional software deployments you will have hardware or infrastructure that runs an operating system and on top of that operating system you will run multiple applications created with languages like python, node.js, ruby, etc. These applications require specific libraries and dependencies to run properly and that can cause difficult installations or application version conflicts that make scaling your applications challenging. Software deployment using containers provide a standard way to package your applications code libraries and dependencies into a single object that includes the library. With software deployment using containers you have infrastructure and an operating system plus a container engine like docker that share the resources of the underlying operating system with your app. Creates container packages that create the libs and packages that enable your app to run. This enables you to move your application across different platforms with ease. Containers are lightweight portable and scalable.

<img src="/images/posts/aws-container-services/containers_vs_traditional_software.png" alt="containers vs traditional software deployments" title="containers vs traditional software deployments"  />

### AWS Container Services Overview

AWS offers a range of services to help you build, deploy, and scale containerized applications. Here's an overview of the key services and tools available:

#### 1. Compute Options for Containers

AWS provides multiple compute options for running containers, catering to different levels of management and control:

- **AWS Fargate**

  - A serverless compute engine for containers.
  - Automatically manages the underlying infrastructure, allowing you to focus solely on your applications.

- **Amazon EC2 (Elastic Compute Cloud)**

  - Provides full control over the underlying infrastructure.
  - You can install, configure, and manage the compute environment as needed.

- **Container Orchestration Choices**
  - **Amazon Elastic Container Service (ECS)**: A fully managed container orchestration service designed to work seamlessly with AWS services.
  - **Amazon Elastic Kubernetes Service (EKS)**: A managed Kubernetes service that makes it easier to run Kubernetes clusters on AWS.

These services allow you to run Docker containers at scale, whether you prefer a fully managed solution or greater control over the environment.

---

### 2. Container Management Tools

Container management involves several key components, which can be grouped into three categories:

#### Registry

- A secure and scalable place to store and manage container images.
- Example: **Amazon Elastic Container Registry (ECR)** is a fully managed container registry integrated with AWS services.

#### Orchestration

- Tools that manage where and when containers are run and ensure the required infrastructure is in place.
- Examples:
  - **Amazon ECS**: Optimized for AWS workloads, simplifying container orchestration.
  - **Amazon EKS**: Allows you to run Kubernetes clusters on AWS or on-premises.
  - **Red Hat OpenShift**: A Kubernetes-based platform for managing containers across environments.

#### Compute

- **AWS Fargate**: A fully managed, serverless compute engine for running containers without provisioning or managing servers.
- **Amazon EC2**: Offers full control over virtual infrastructure, letting you choose instance types, storage, and networking configurations.

---

#### 3. Key Benefits of AWS Container Services

- **Flexibility**: Choose between fully managed services or full control over your infrastructure.
- **Scalability**: Easily scale applications with AWS services that handle resource provisioning and scaling.
- **Integration**: AWS container services integrate seamlessly with other AWS services like IAM, VPC, and CloudWatch for security, networking, and monitoring.

#### Amazon ECS

- Fully managed, scalable, and high performance container service.
- Use to run, stop, and manage containers across availability zones without complexity of managing control plane or nodes.
- Supports Docker and Windows containers.
- For more control you can run container workloads on a cluster of Amazon EC2 instances. Alternatively you can choose to launch containers on a serverless infrastructure managed by AWS Fargate.

#### The Container Services Project

The project used Amazon Elastic Container Registry and Amazon Elastic Container Service and Amazon Fargate to host containerized applications without the need to provision and manage servers.

<img src="/images/posts/aws-container-services/sys_design.png" alt="AWS application container system design" title="AWS application container system design"  />

In this system design we use a docker image pushed to Amazon ECR and deployed to Fargate via a task definition. Below are description of these components

- A task definition is required to run Docker containers in Amazon ECS. A task definition specifies parameters such as CPU and memory to use with each task, launch type, networking mode, logging configuration, run command, data volume, and IAM role that the task uses.
- An Amazon ECS cluster is a logical grouping of tasks or services running on Amazon Elastic Compute Cloud (EC2) instances. A task is the instantiation of a task definition within a cluster. If you want to maintain a desired number of tasks simultaneously in a cluster you use Amazon ECS.
- AWS Fargate technology can be used with Amazon ECS to run containers without having to manage servers or clusters of EC2 instances. Fargate is a quick way to launch an run containers on AWS. Customers that want greater control of their EC2 instances can use ECS without Fargate.

The lab allows me to use AWS session manager to connect to an EC2 instance where I unzip a .zip file containing the application. The applcation is a python web app that is pretty simple.

First we create a docker image of the application. This is done by creating a dockerfile which describes the base image to use for the Docker image and includes what I want to install and run on it. I build the docker image and push it to an Amazon ECR repository. The is am image registry service that allows me to store, share, and deploy the container software anywhere.

After the image is pushed to ECR, I grab the uri from the ECR dashboard.

<img src="/images/posts/aws-container-services/ecr-dash.png" alt="AWS ECR dashboard" title="AWS ECR dashboard"  />

Then we configure the projects security group to allow traffic from a custom TCP port 8443 and source 0.0.0.0/0

This is to allow external access to this port.

Then in the ECS dashboard I create a new task definition and configure it to launch via Amazon Fargate, define its operating system, CPU, and memory. We also specify the image uri we pushed to ECR so that the task knows what image to deploy. We define the container's port map to match that of the one we configured in the projects security group.

Finally I create the task, run it, and set the task's cluster to the pre made cluster set up for the lab and confirm it is using the Fargate launch type.

<img src="/images/posts/aws-container-services/task-dash.png" alt="AWS ECR dashboard" title="AWS ECR dashboard"  />

<img src="/images/posts/aws-container-services/select-cluster-dash.png" alt="AWS ECR dashboard" title="AWS ECR dashboard"  />

In the networking section of the task, I make sure that the lab's VPC is selected with the appropriate subnets and security group that was configured in a previous step. Turn on public IP. Finally we make sure the task is assigned the appropriate IAM role so it can perform the required actions for deploying.

<img src="/images/posts/aws-container-services/ecs-dash.png" alt="AWS ECS dashboard" title="AWS ECS dashboard"  />

<img src="/images/posts/aws-container-services/deployed-containerized-app.png" alt="Deployed containerized app" title="Deployed containerized app"  />

The lab goes on to challenge me to deploy one more task definition from what I learned without guided instructions. Although the material is fairly dry, I enjoyed the experience. I hope future me appreciates the work and anyone reading this learned something.

Cheers!
