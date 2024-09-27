---
title: "From Flask to Kubernetes: Switching Gears ⚙️"
date: "Sep 26, 2024"
excerpt: "Redirecting my efforts"
cover_image: "/images/posts/flask-to-kubernetes/main1.png"
---

Embarking on a project to analyze YouTube videos using AI was both exciting and challenging. What started as a simple Flask server evolved into a comprehensive learning experience involving containerization, cloud deployment, and Kubernetes orchestration. I want to share my journey, the hurdles I faced, and how I pivoted to embrace new technologies.

<img src="/images/posts/flask-to-kubernetes/docker_kubernetes.png" alt="web app ui" title="Login"  />

## Building the YouTube Analysis Tool

My initial goal was straightforward: create a web application that accepts YouTube URLs, transcribes the videos, and runs AI analyses based on user prompts. To handle the intensive background tasks of video transcription and AI processing, I chose to use **Celery** alongside a **Flask** server. **Redis** served as the message broker for Celery, efficiently managing task queues and ensuring smooth asynchronous operations.

## Deploying to Google Cloud Platform

With the basic setup working locally, I decided to deploy the app to the internet using **Google Cloud Platform (GCP)**. I had two services on **App Engine**—the Flask server and the Celery worker. The React front-end was deployed via **Google Cloud Storage**.

To support the application's infrastructure, I leveraged GCP's managed services:

- **Memorystore for Redis**: Used as the message broker, providing a scalable and secure Redis service without the overhead of managing the underlying infrastructure.
- **Cloud SQL for PostgreSQL**: Served as the database, offering automated backups, replication, and seamless integration with other GCP services.

## Hitting a Roadblock with YouTube

Just when things seemed to be running smoothly, I encountered a significant hurdle. YouTube blocks Google Cloud patterned IPs to prevent bots and protect their terms of service. This meant my app couldn't access YouTube videos when deployed on GCP, effectively halting its core functionality.

I considered various workarounds, like rotating proxies to bypass the restrictions. However, implementing such solutions would not only be costly but also pose ethical concerns. I didn't want to continue the project by going against YouTube's terms of service. Recognizing these limitations, I decided to redirect my efforts.

## Embracing Containerization and Kubernetes

Rather than viewing this setback as a defeat, I saw it as an opportunity to deepen my understanding of containerization and Kubernetes. My app, with its multiple components, was a great candidate for this exploration.

### Creating Docker Images

I began by creating Docker images for all three components:

1. **Web App (React)**
2. **Flask Server**
3. **Celery Worker**

Crafting the Dockerfiles for each taught me best practices in containerization, such as minimizing image sizes and managing dependencies effectively.

Kubernetes and Docker Compose are both tools used for managing containerized applications, but they serve different purposes and operate at different levels of complexity and scale. Here’s a breakdown of the key differences between the two:

### Orchestrating with Docker Compose

After setting up the Docker images, I wrote a `docker-compose.yml` file to orchestrate all the containers. Running everything locally in containers allowed me to test and ensure seamless interaction between components.

<img src="/images/posts/flask-to-kubernetes/docker-compose.png" alt="docker-compose result" title="docker running locally"  />

At this point in the project, I had a working local setup with Docker Compose, but I wanted to take it a step further.

Quickly I want to highlight the difference between Docker Compose and Kubernetes

- Docker

  - Designed for managing multi-container Docker applications on a single host, mainly for development or testing.
  - Best suited for local development, testing, and small-scale deployments.
  - Simple, single-host orchestration. Everything runs on one machine (one Docker daemon).
  - Easier to set up and manage; great for quick deployments.
  - Supports Docker volumes, but volumes are tied to the single host where Compose is running.
  - Typically limited to running on a single Docker daemon or machine.

- Kubernetes
  - A container orchestration platform designed for deploying, managing, and scaling containerized applications in production environments across multiple hosts.
  - Ideal for complex, large-scale, production-grade deployments.
  - Multi-host, distributed architecture with components like master nodes, worker nodes, etc.
  - Advanced storage management with PersistentVolumes (PVs) and PersistentVolumeClaims (PVCs) that can be shared across nodes.
  - Runs on any Kubernetes cluster, which could be on-premises, in the cloud (GKE, EKS, AKS), or across multiple environments.

## Diving into Kubernetes

With containerization in place, Kubernetes was the next frontier. I revisited my knowledge about how Kubernetes manages containers and delved deeper into its orchestration capabilities.

### YAML Files: My New Best Friend

Kubernetes relies heavily on YAML files for configuration. Writing these files allowed me to define the desired state of my application components:

- **Deployments**: Defined how many replicas of each container to run and how to update them.
- **Services**: Managed networking and allowed communication between different components.

Understanding and writing these YAML configurations was both challenging and rewarding.

## Deploying on Google Kubernetes Engine

Taking the leap, I deployed my containerized application to **Google Kubernetes Engine (GKE)**. Setting up a Kubernetes cluster on GCP and deploying my services gave me hands-on experience with:

- **Scaling**: Easily adjusting the number of replicas to handle varying loads.
- **Self-healing**: Kubernetes automatically restarted failed containers.
- **Rolling Updates**: Deploying new versions without downtime.

## Reflections and Next Steps

This journey taught me invaluable lessons:

- **Adaptability**: When faced with unforeseen challenges, pivoting can lead to new learning opportunities.
- **Ethical Considerations**: Respecting terms of service is crucial, even if it means abandoning or altering a project.
- **Continuous Learning**: Technologies like Docker and Kubernetes are essential tools for modern developers.

### Looking Ahead

I'm excited to continue exploring:

- **Advanced Kubernetes Features**: Ingress controllers, ConfigMaps, and Secrets.
- **Cloud-Native Tools**: Incorporating tools like Helm for package management.
- **Further Cloud Integrations**: Experimenting with other GCP services to enhance application performance and resilience.

## Conclusion

Setbacks are inevitable in any development journey, but they often pave the way for growth and new opportunities. By embracing containerization and Kubernetes, I transformed a project roadblock into a valuable learning experience. I hope my story inspires others to view challenges not as dead-ends but as detours leading to greater knowledge.

---

**Have you faced similar challenges in your projects? Feel free to share your experiences or ask questions in the comments below!**
