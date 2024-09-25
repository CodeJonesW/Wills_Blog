---
title: "Home Automation: Day 1"
date: "July 11, 2024"
excerpt: ""
cover_image: "/images/posts/home-automation-day-1/home-auto-1.webp"
---

Yesterday I purchased [Automate Your Home Using Go](https://pragprog.com/titles/gohome/automate-your-home-using-go/) while looking for something to read on my plane ride home.

Not knowing if I would fully embark on the instructions I was excited to read and see if I found the book interesting. After diving in while cruising through the air I decided I would follow along and do the projects. My thought is it will help me learn more about managing and monitoring services and integrating software with hardware while also having some fun. There is a lot of potential for tweaking the projects to make them my own and support my own use cases.

One use that comes to mind is being alerted with my cat is at the sliding glass door.

The book offers a guide to setting up a home rest api and data center that support building several projects. The projects include

- Networking a Temperature Monitor
- Checking the (Garage) Door
- Lighting the Weather
- Watching the Birds

There are several hardware components that will be required to complete the projects. In order to get the ball rolling I started with acquiring the correct raspberry pi model.

Some other components that will be required are

- [Magnetic Contact Switch](https://www.adafruit.com/product/375)
- [Ultrasonic Distance Sensor](https://www.sparkfun.com/products/15569)
- [Passive Infrared Sensor](https://chicagodist.com/products/adjustable-infrared-pir-motion-sensor)
- Hue Lightstrip Plus Base Kit
- Hue Starter Kit
- [Raspberry Pi Camera Module 2](https://www.raspberrypi.com/products/camera-module-v2/)
- Female-to-Female Jumper Wires13
- Optional - Solderless Headers for Pi Zero W14

I already have a raspberry pi 3 model b but the book says a minimum of 4 model b + so I ordered a [Raspberry Pi 5 - 8GB](https://www.raspberrypi.com/products/raspberry-pi-5/) which is the best option at the moment.

Since I dont have my new raspberry pi yet, I followed the instructions on my mac to create a simple rest server with GO. The server is initially setup with two routes. One shows a simple message with the name of the server and the other returns the current datetime.

After writing the code to run the routes mentioned above and running it. I created a docker file in order to provide instructions to build the go app in docker image.

After quickly testing running the container and connecting to each route to confirm the functionality I thought this was a a good stopping point to wait for my raspberry pi to arrive. The next step requires installation of Gitea, Prometheus, and Grafana. My understanding is these will help monitor the services I set up by providing metrics and alerts.

The raspberry pi is expected to arrive in July 12th. At that point I will have to set up the computer and quickly do this work again and continue on with the next steps.
