---
title: "Understanding Autonomous Vehicle Tech Stacks v0.0.1"
date: "March 25, 2025"
excerpt: "Building a Finite State Machine in ROS 2"
cover_image: "/images/posts/learning-about-self-driving-cars-v1/nodes.png"
---

## 🚗 Introduction

Autonomous vehicles (AVs) rely on complex software architectures to process sensor data, make real-time decisions, and control vehicle motion. These tech stacks are designed to handle perception, planning, and actuation, ensuring the vehicle can navigate safely in diverse environments. In this blog, we'll explore the core components of an AV tech stack and then transition into our hands-on project—building a Finite State Machine (FSM) in ROS 2 to simulate decision-making in an autonomous system.

---

## 🏗️ The Autonomous Vehicle Tech Stack

A modern autonomous vehicle stack consists of several key components:

### 1️⃣ **Perception**

- Collects data from **LiDAR, cameras, radar, and IMUs**.
- Processes sensor inputs to detect **objects, lanes, and environmental conditions**.
- Uses algorithms like **SLAM (Simultaneous Localization and Mapping)** and **object recognition**.

### 2️⃣ **Planning**

- Takes perception data and decides **where to go next**.
- Uses **behavioral planning, motion planning, and trajectory optimization**.
- Relies on **Finite State Machines (FSMs)** and **deep learning models** for decision-making.

### 3️⃣ **Control**

- Converts planned actions into **steering, braking, and throttle commands**.
- Uses **PID controllers, model predictive control (MPC), and reinforcement learning**.
- Ensures smooth and safe execution of planned maneuvers.

### 4️⃣ **Connectivity & Infrastructure**

- Uses **V2X (Vehicle-to-Everything) communication** for real-time updates.
- Relies on **edge computing and cloud analytics** for large-scale data processing.

### 5️⃣ **Middleware & Communication**

- Autonomous systems require **real-time data exchange** between components.
- **ROS 2 (Robot Operating System 2)** provides a decentralized, publish-subscribe architecture via **DDS (Data Distribution Service)**.

## 🧠 The Central Computer: Processing the Autonomous System's Data

At the heart of an autonomous vehicle lies the central computer, which processes vast amounts of data from sensors, nodes, and various vehicle subsystems in real time. This computer acts as the brain of the AV, integrating perception, planning, control, and connectivity into a single cohesive system.

### Key Responsibilities of the Central Computer

1. Sensor Fusion & Data Processing

- Integrates real-time feeds from LiDAR, cameras, radar, and GPS.

- Uses Kalman filters, deep learning models, and SLAM to extract meaningful insights.

- Identifies obstacles, lane markings, pedestrians, and traffic signals.

2. Decision-Making & Planning

- Implements hierarchical decision layers, from behavior planning (e.g., overtaking, lane changes) to motion planning (smooth path execution).

- Uses Finite State Machines (FSMs), reinforcement learning, and deep neural networks to optimize vehicle behavior.

3. Actuation & Control

- Converts high-level decisions into precise control signals for acceleration, braking, and steering.

- Ensures low-latency execution to maintain real-time responsiveness.

4. System Coordination & Communication

- Manages ROS 2 nodes, orchestrating message passing between subsystems.

- Implements fault tolerance and redundancy to prevent failures from affecting vehicle operation.

### 🏎️ Hardware & Software of the Central Computer

- Compute Hardware: High-performance GPUs, TPUs, FPGAs, or specialized automotive AI chips (like NVIDIA Orin, Intel Mobileye, Tesla’s FSD computer).

- Real-Time OS: Ensures low-latency processing using RTOS (Real-Time Operating Systems) or Linux-based ROS 2 distributions.

- AI & ML Frameworks: TensorFlow, PyTorch, OpenCV, and YOLO for vision-based tasks.

### 🔌 Real-World AV Implementations

- Tesla's FSD Computer: Custom AI chips handle camera-based perception and planning.

- Waymo’s AI Stack: Uses multiple GPUs and FPGAs for sensor fusion and decision-making.

- NVIDIA DRIVE AGX: A full-stack AI computing platform for AVs.

---

## Looking at Real World Examples

I am interested in Rivian as a company so I did a little research on their plans.

### Rivian

Currently, Rivian's Gen 2 vehicles come equipped with the Rivian Autonomy Platform, which offers features like Highway Assist, Adaptive Cruise Control, and Lane Change Assist. These systems require continuous driver attention and control. [Source](https://rivian.com/support/article/what-features-are-included-in-the-rivian-autonomy-platform)

The upcoming hands-free system aims to allow drivers to remove their hands from the steering wheel on certain highways, similar to systems like Ford's BlueCruise and GM's Super Cruise. The subsequent "eyes-off" system, targeted for 2026, aspires to enable drivers to divert their attention from the road under specific conditions, aligning with Level 3 autonomous driving capabilities.

<iframe width="560" height="315" src="https://www.youtube.com/embed/K-oBUS8HH-g" 
frameborder="0" allowfullscreen></iframe>
<br>

I was not familiar with the levels of autonomy prior to this article. Level 3 is defined as having these key features

- Conditional Automation – The system can handle driving tasks, including acceleration, braking, and steering in well-defined environments (like highways).

- Hands-Off & Eyes-Off (Temporarily) – The driver can take their hands off the wheel and even divert their attention from the road, but must be ready to intervene if the system asks.

- Situational Awareness Required – The system monitors its environment and decides when it needs the driver to take over.

- Restricted Operating Domain – Works only in specific conditions (e.g., clear weather, mapped highways, or designated urban zones).

This [article](https://www.epa.gov/greenvehicles/self-driving-vehicles) describes all 6 levels of autonomous driving defined by the EPA.

### What other companies have plans for assisted or fully automated driving?

- [Tesla](https://www.tesla.com/support/autopilot)
- [GM's Cruise](https://www.gm.com/innovation/path-to-autonomous)
- [Waymo](https://waymo.com/)
- [Ford](https://www.ford.com/technology/bluecruise/)
- [Momenta Ai](https://momenta.ai/en/about.html)

## Lets look at Tesla and the technology they use to power their self driving systems

## 🧠 Tesla’s AI & Neural Network Stack

Tesla’s autonomy stack is powered by deep learning models that process video feeds from the camera system in real-time. The key components include:

Tesla Neural Networks → AI models trained on millions of real-world driving miles to improve perception, path planning, and decision-making.

Full Self-Driving (FSD) Beta → A driver-assist system that provides lane navigation, automatic lane changes, and recognition of traffic signs and lights.

Dojo Supercomputer → Tesla’s custom-built AI training system designed to process massive datasets for self-driving improvements.

## 💡 Why Tesla Chose Vision Over LiDAR

Unlike competitors like Waymo and Cruise, Tesla rejects LiDAR in favor of vision-based autonomy. Elon Musk believes LiDAR is unnecessary and that self-driving systems should rely on camera-based AI, just as human drivers do.

### Pros of Tesla Vision:

✅ No expensive LiDAR sensors, reducing production costs.
✅ Vision-based AI mimics human perception.
✅ Constant improvements via AI model updates.

### Challenges of Tesla Vision:

⚠️ Depth perception is harder without radar.
⚠️ Struggles in fog, heavy rain, and low-visibility conditions.
⚠️ Requires massive amounts of real-world training data.

### How many sensors are on a Tesla?

#### 🚘 Tesla Sensor Configurations by Hardware Version

##### Tesla Hardware 3.0 (Before 2023)

- Cameras: 8 cameras (for 360-degree vision)

- Ultrasonic Sensors: 12 ultrasonic sensors (for close-range object detection)

- Radar: 1 front-facing radar (for detecting vehicles and obstacles at long range)

- GPS & IMU: Used for localization and movement tracking

##### Tesla Vision (Post-2023) – No Radar or Ultrasonics

- Cameras: 8 cameras (primary sensing method)

- No Radar: Tesla removed radar sensors in favor of vision-based processing.

- No Ultrasonic Sensors: Newer Teslas no longer include ultrasonic sensors, relying solely on camera-based perception.

- GPS & IMU: Still included for localization and movement tracking.

##### 🔍 Breakdown of Tesla's Camera System

###### Forward Cameras:

- Main Forward Camera (High-resolution)

- Wide-Angle Forward Camera (Detects pedestrians and nearby objects)

- Narrow Forward Camera (Long-range detection)

###### Side Cameras:

- Left and Right Side Cameras (Monitor adjacent lanes for lane changes and objects)

- Rearward-Facing Side Cameras (Detects vehicles in blind spots)

###### Rear Camera:

- Backup Camera (Assists in parking and reversing)

Tesla continues to refine its Full Self-Driving (FSD) system, aiming for Level 4/5 autonomy where the vehicle no longer requires human supervision. However, regulatory challenges, AI safety concerns, and unpredictable edge cases remain obstacles before Tesla can achieve full autonomy.

#### 📌 Sources

- **Tesla's Transition to Tesla Vision**: [Tesla Support](https://www.tesla.com/support/transitioning-tesla-vision)
- **Tesla Autopilot Hardware Details**: [Wikipedia](https://en.wikipedia.org/wiki/Tesla_Autopilot_hardware)
- **Tesla's Shift Away from Ultrasonic Sensors**: [Electrek](https://electrek.co/2022/10/04/tesla-moving-away-ultrasonic-sensors-in-favor-tesla-vision/)
- **Tesla Support Autopilot**: [Tesla Support](https://www.tesla.com/support/autopilot)

---

## Waymo vs Tesla

So if you have not heard of Waymo they are smart taxis that currently operate in certain US cities. They are fully self driving and I have heard good things. Lets compare them to Tesla and see how they line up.

Tesla and Waymo both aim to achieve full self-driving capabilities, but they take radically different approaches in their hardware, software, and philosophy of autonomy. While Tesla relies solely on vision-based AI, Waymo takes a sensor fusion approach using LiDAR, radar, and cameras to navigate the world.

### 🔍 Is Waymo Fully Self-Driving?

Yes, Waymo is currently operating fully self-driving vehicles (Level 4 autonomy) in specific areas, such as Phoenix and San Francisco. Unlike Tesla’s driver-assist system (FSD Beta), Waymo’s robotaxis do not require human supervision and can operate without a driver in defined geofenced locations.

### 💡 Key Difference:

Waymo is "geofenced" → It works in pre-mapped areas but can't drive everywhere.

Tesla is "generalized" → It aims to work anywhere but still requires human supervision.

### 🛠️ Tesla's Vision-Only Approach vs. Waymo's Sensor Fusion

Tesla believes that a camera-only system (Tesla Vision) trained on real-world data will eventually surpass LiDAR-based autonomy. However, Tesla's FSD is still in beta and requires human intervention.

Waymo, on the other hand, heavily relies on LiDAR (Light Detection and Ranging), radar, and HD maps to create a detailed 3D representation of the world. This allows Waymo cars to drive without any human input in geofenced locations.

#### 💡 Why Tesla Avoids LiDAR

Elon Musk has publicly stated:

"LiDAR is a crutch. Anyone relying on LiDAR is doomed."

Tesla’s philosophy is that humans drive using vision alone, so AI should be able to do the same with deep learning and cameras.

#### 💡 Why Waymo Uses LiDAR

Waymo argues that LiDAR provides precise depth perception and is necessary for safety-critical scenarios. Unlike cameras, LiDAR works in total darkness and poor weather.

<img src="/images/posts/learning-about-self-driving-cars-v1/waymo.png" alt="waymo" title="waymo"  />

### 🏆 Which One Is Closer to Full Self-Driving?

✔ Waymo is fully self-driving today → But only in controlled, mapped areas.
✔ Tesla has broader potential → But still needs human oversight.

Waymo operates robotaxis in cities (Phoenix, SF, and soon LA). Tesla’s FSD isn't truly self-driving yet—it requires drivers to keep their hands on the wheel.

### 🚀 Future Outlook

Waymo will expand to more cities, but it will take time to scale.

Tesla aims for full autonomy anywhere, but it must solve the edge cases and improve vision-based AI.

---

## Switching Gears to the Project

So in an effort to learn more about the systems used in autonomous vehicles I have started building a finite state machine simulation with Python. It uses a docker container to stand up three nodes that use the pub/sub pattern to speak to each other via the [Ros2 Python client library](https://github.com/ros2/rclpy).

### 🔧 Hands-On: Building a Finite State Machine (FSM) in ROS 2

FSMs are crucial in AV decision-making, helping vehicles transition between states like "Moving," "Stopping," and "Slowing Down." We built a **ROS 2-based FSM** that simulates this logic.

### 🚀 **Project Overview**

Our FSM-based ROS 2 system consists of:

1. **Sensor Simulator** → Publishes obstacle data (`True` or `False`).
2. **Planner FSM** → Reads sensor input and decides `MOVE` or `STOP`.
3. **Actuator Logger** → Logs the planner’s decisions.
4. **Brake Controller** → Reacts by applying or releasing brakes.

### 🛠 **Running the Project in Docker**

To run the project, follow these steps:

```bash
# Build and run the Docker container
cd finite-state-machine
docker build -t ros2_fsm_demo -f docker/Dockerfile .
docker run -it --rm ros2_fsm_demo
```

Then, open multiple terminals and start each ROS 2 node:

```bash
ros2 run fsm_demo sensor_simulator  # Terminal 1
ros2 run fsm_demo planner_fsm       # Terminal 2
ros2 run fsm_demo actuator_logger   # Terminal 3
ros2 run fsm_demo brake_controller  # Terminal 4
```

### Logs In Action

<img src="/images/posts/learning-about-self-driving-cars-v1/logs1.png" alt="github history" title="commit history/logs1.png"  />
<img src="/images/posts/learning-about-self-driving-cars-v1/logs2.png" alt="github history" title="commit history/logs2.png"  />
<img src="/images/posts/learning-about-self-driving-cars-v1/logs3.png" alt="github history" title="commit history/"  />
<img src="/images/posts/learning-about-self-driving-cars-v1/logs4.png" alt="github history" title="commit history/"  />

### 🔗 **GitHub Repository**

All the source code for this project is available here: [GitHub Repository](https://github.com/CodeJonesW/finite-state-machine/tree/main)

---

## 📌 Conclusion: Bridging Simulation and Real-World Autonomous Systems

Building a Finite State Machine (FSM) in ROS 2 provides a simplified yet insightful representation of how decision-making works in real autonomous vehicles. While our Python project only simulates basic states like "Moving" and "Stopping", real-world AVs rely on much more complex state machines, deep learning models, and sensor fusion techniques to navigate unpredictable environments.

In actual autonomous vehicles, the FSM-like logic is part of a broader system that integrates real-time sensor data, behavior planning, and vehicle control. Instead of simple boolean obstacle detection, AVs analyze millions of data points per second from LiDAR, cameras, and radar to make informed decisions. The central computing unit processes this data, much like our ROS 2 nodes communicate through publish-subscribe topics, ensuring that all components work in harmony.

Our project serves as a starting point for understanding decision-making in autonomous vehicles. Expanding this simulation could involve integrating real sensor feeds, visualizing decisions in rviz2, or testing more advanced FSM behaviors like yielding, lane changes, or obstacle avoidance.

Ultimately, autonomous vehicle development is an interdisciplinary challenge, requiring expertise in robotics, artificial intelligence, and systems engineering. By simulating an FSM in ROS 2, we've taken a small but meaningful step toward grasping the complexity of self-driving systems.

🚀 I plan to continue to expand on this project. There are many considerations like integrating sensor fusion algorithms, reinforcement learning, or real-time control systems to bridge the gap between simulation and real-world applications. Stay tuned.

Will
