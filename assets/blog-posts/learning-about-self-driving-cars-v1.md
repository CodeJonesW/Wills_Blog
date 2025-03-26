---
title: "Understanding Autonomous Vehicle Tech Stacks and Building a Finite State Machine in ROS 2"
date: "March 25, 2025"
excerpt: ""
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

---

## 🔧 Hands-On: Building a Finite State Machine (FSM) in ROS 2

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

### 🔗 **GitHub Repository**

All the source code for this project is available here: [GitHub Repository](https://github.com/CodeJonesW/finite-state-machine/tree/main)

---

## 📌 Conclusion

Understanding **autonomous vehicle tech stacks** is essential for building intelligent decision-making systems. By implementing an FSM in ROS 2, we've taken the first step toward simulating real-world AV decision-making. Whether you're looking to expand this project with real sensor integration, visualization tools like rviz2, or more advanced FSM behaviors, the foundations are now in place.

Stay tuned for further enhancements and experiments in the world of autonomous systems! 🚗💡
