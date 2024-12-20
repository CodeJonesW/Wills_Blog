---
title: "AWS Container Services"
date: "Dec 11, 2024"
excerpt: ""
cover_image: "/images/posts/aws-container-services/containers_vs_traditional_software.png"
hide_image_in_slug: true
---

## Intro

In November of 2024, I set out to begin acquiring AWS certificates and increase my understanding of the tools available in the Amazon cloud. I have learned more than I expected and increased my understanding of concepts that are applicable across various cloud platforms. In my initial article I decided that on top of learning the AWS tooling I wanted to know more about containerizing applications and deploying with Kubernetes. I was excited to discover this project involving deploying docker containers to AWS using [Amazon Elastic Container Service](https://aws.amazon.com/ecs/) which has similarities to Kubernetes and references [Amazon Elastic Kubernetes Service](https://aws.amazon.com/eks/) and provides some information on the subject. In the following article I explain more about container services on Amazon and review what I was able to deploy. This was one of my favorite projects in the [Solutions Architect Certification](https://www.credly.com/badges/6c34a40b-f378-47a0-bad7-bec63dd743d3/linked_in?t=soronh) I completed.

## Overview of Containers

In traditional software deployments you will have hardware or infrastructure that runs an operating system and on top of that operating system you will run multiple applications created with languages like python, node.js, ruby, etc. These applications require specific libraries and dependencies to run properly and that can cause difficult installations or application version conflicts that make scaling your applications challenging software deployment using containers provide a standard way to package your applications code libraries and dependencies into a single object s that includes the library. With software deployment using containers you have infrastructure and an operating system plus a container engine like docker that share the resources of the underlying operating system with your app. Creates container packages that create the libs and packages that enable your app to run. This enables you to move your application across different platforms with ease. Containers are lightweight portable and scalable.

<img src="/images/posts/aws-container-services/containers_vs_traditional_software.png" alt="containers vs traditional software deployments" title="containers vs traditional software deployments"  />

### AWS Container Services

- Fargate: serverless compute for containers
- EC2 - allows for control over installation and management over compute environment
- Allows for choice of container orchestration between Amazon Elastic Container Service and Amazon Elastic Kubernetes Service

- AWS Fargate, AWS ECS, and EKS enable you to run and manage docker containers at scale

Container Management tools can be broken down into 3 categories

- Registry
  - Secure place to store and manage containers like ECR
- Orchestration
  - Manage when and where they are run and flexible compute engines to power containers such ECS, EKS, Redhat Openshift
- Compute
  - Fully managed with Fargate
  - Control your own virtual infratructure with EC2 instances

### Amazone ECS

- Fully managed, scalable, and high performance container service.
- Use to run, stop, and manage containers across availability zones without complexity of managing control plane or nodes.
- Supports Docker and Windows containers.
- For more control you can run container workloads on a cluster of Amazon EC2 instances. Alternatively you can choose to launch containers on a serverless infrastructure managed by AWS Fargate.
