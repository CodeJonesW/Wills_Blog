---
title: "Home Automation: The Raspberry Pi 5 Arrived"
date: "July 21, 2024"
excerpt: ""
cover_image: "/images/posts/home-auto-day-2/raspberry-pi.webp"
---

This is a continuation of me writing about my experience setting up a raspberry pi to do several home automation projects.

My Raspberry Pi arrived as expected on July 12th but I had to wait a few extra days to receive my micro hdmi cable and usb c power supply. A few things I learned about the raspberry pi 5 when ordering the needed parts

- [Raspberry Pi 5 requires a 27w USB-C power supply](https://www.raspberrypi.com/documentation/computers/getting-started.html#power-supply)
- [Raspberry Pi 5 requires a micro HDMI to HDMI cable](https://www.raspberrypi.com/documentation/computers/getting-started.html#display)

Everything else was pretty standard as I am using a monitor and keyboard I already have. I also have a micro SD card that I can use to install the OS.

When you set up a new raspberry pi you need to install the OS on the micro SD card. This is done with the [Raspberry Pi Imager](https://www.raspberrypi.com/documentation/computers/getting-started.html#install-using-imager)

After installing the OS on the micro SD card I was able to boot up the raspberry pi and connect to it with a keyboard and monitor.

Exciting moment! I could now actually start working on setting up the development environment.

There is a little bit of a linux learning curve for me getting started as I am not used to some of the system tools or processes for installing applications on linux.

After installing GO, Docker, and VScode I was able to start replicating the small amount of work I did in the previous post. I was able to get the rest server running on the raspberry pi and connect to it from my mac. Then I was able to build the docker image and run the container.

Building the docker image of the rest api on the raspberry pi was noticably slower than my mac. This is to be expected but I am curious about the exact reasons for the difference in speed. Something I am noting and will look into later. Aside from this the pi has been running well.

Next I installed [Gitea](https://about.gitea.com/products/gitea/). The Gitea developers provide an official container image that I was able to use to run the server part as a container. In addition to that, Gitea requires a database to store project data. The project requires I use the official Postgres container image to run Postgres database as a container.

Once downloading and running the containers I was able to access a web inteface that allowed me to finish the final steps of setup and then access the Gitea dashboard where I could create a new repository and start to manage my project code. The ui looks and operates very similar to github.

It was nice to get the basics of the development environment setup and running. I have always enjoyed setting up my personal computers and attempt to keep my file organization and management as clean as possible. Time has a tendency to erode some of organization but with each new computer I improve my process.

The next step is to set up [Prometheus](https://prometheus.io/docs/introduction/overview/) which stores system metrics marked with a timestamp and key value pairs. This is a piece I am excited to learn more about. Using tools like Prometheus to diagnose issues is a skill that will be helpful in my personal and professional projects.

Things I learned more about

- How to use package manager apt
- Raspberry Pi OS file system structure and file locations
- How to install Gitea and Postgres on raspberry pi and run them as containers
- Increased familiarity with docker commands
- briefly looked at the Prometheus documentation
