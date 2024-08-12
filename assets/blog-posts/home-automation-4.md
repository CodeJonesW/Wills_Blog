---
title: "Home Automation: Networking a Temperature Monitor"
date: "Aug 4, 2024"
excerpt: ""
cover_image: "/images/posts/home-auto-4/temp.webp"
---

At this point in the journey of working through [Automate Your Home Using Go](https://pragprog.com/titles/gohome/automate-your-home-using-go/) I have set up a Raspberry Pi 5 and a development environment that includes a rest server and Gitea. I have also set up Prometheus and Grafana to monitor the services I have set up on the Raspberry Pi.

In this article I will review my experience setting up a [Raspberry Pi Pico W](https://www.raspberrypi.com/products/raspberry-pi-pico-w/) to monitor the temperature in my home. The Pico W is a microcontroller board that has onboard WIFI capabilities as well as a temperature sensor. At the time of purchase for this project the Pico W only cost $6 USD off of [Sparkfun](https://www.sparkfun.com/products/20173).

The goal of the project is to set program the Pico W with a simple program that will read the temperature from the onboard sensor and send the data to the Raspberry Pi 5. The Raspberry Pi 5 will then store the data in a Postgres database, display the data in a Grafana dashboard, assign alerts and send an email when the temperature reaches a certain threshold.

There is work being done to created TinyGO, a minimized version of GO that is capable of running on the Pico W. The book informs us that the WIFI driver for the Pico W is not yet officially available but there is a development version [cyw43439](https://github.com/soypat/cyw43439) available that we can use.

There is a likelyhood that when the driver is officiallh integrated with TinyGO the code may need an update to an import path but is not expected to be a major change.

The Pico W is a microcontroller and is designed to immediately start at runtime at power on and execute the program / script it is given. There is currently support for C++ libraries.

The toughest part following through with this project was the setup and installation of GO and TinyGO on my Raspberry Pi 5. In order to follow the [instructions for installing TinyGO on Linux](https://tinygo.org/getting-started/install/linux/) I had to also install GO on my Raspberry Pi 5. I was able to follow the instructions for installing GO on Linux from the [official GO website](https://golang.org/doc/install).

GO installed smoothly but I had more difficultly due to a libary issue when installing TinyGO. I found a group of people having the same [issue](https://github.com/raspberrypi/bookworm-feedback/issues/120) and was able to find a solution.

"Some shared libraries and/or programs on Bookworm 32-bit systems are not linked with 16K pages, which causes sdm to fail when it enters the IMG.

When sdm identifies this failure, it should provide some diagnostic information and the fix: Add the line kernel=kernel8.img to /boot/config.txt and reboot.

See raspberrypi/bookworm-feedback#120 for further details."

Once I had both GO and TinyGO installed I was able to follow the instructions for implementing the code to poll the temperature. A few extra points to note are

- The program takes advantage of teh on-board LED to indicate when the temperature is being read.
- The on board temperature sensor is close the the Pico W's CPU and other components so the temperature is not entirely accurate but is expected to be good enough for our general monitoring purposes.

TinyGO provides a library named [machine](https://tinygo.org/docs/reference/microcontrollers/machine/) to interact with components of different microcontroller devices.

Example of Pico Read Temperature function - [Docs](https://tinygo.org/docs/reference/microcontrollers/machine/pico/#func-readtemperature)

<img src="/images/posts/home-auto-4/getTempfunc.png" alt="Get Temperature function" title="Get Temperature" width="600" />

Internally the Raspeberry Pi Pico W calculates the temperature by measuring the voltage on the fifth channel of the analog digital converter controller. The temperature in milli-celsius (thousandths of a degree Celsius) is calculated using a specific formula.
The formula used is T = 27 - (ADC_voltage - 0.706)/0.001721

<img src="/images/posts/home-auto-4/func-ReadTemperature.png" alt="Read Temperature function" title="Read Temperature" width="600" />

The first conditional statement checks if the analog digital converter controller is enabled. If it is not enabled, the InitADC() function is called to enable it. The temperature sensor bias source is then enabled by setting the TS_EN bit in the control and status register of the analog digital converter controller.

Breaking down the formula used to calculate the temperature in milli-celsius:

- 27000 << 16 shifts the value 27000 (which represents 27°C) to the left by 16 bits.
- int32(adcTempSensor.getVoltage()) gets the voltage reading from the temperature sensor.
- 706 << 16 shifts the value 706 to the left by 16 bits.
- The difference (int32(adcTempSensor.getVoltage()) - 706 << 16) is then multiplied by 581, which is a constant derived from the formula.
- The final result is then shifted back to the right by 16 bits to obtain the temperature in milli-celsius.

In order to use retrieve the data being captured by the Pico W, I needed to connect it to WIFI. I used the driver mentioned earlier called [cyw43439](https://github.com/soypat/cyw43439). Following a few simple instructions I was able to setup the config file and connect to my home network.

After connecting to Wifi I set up a new Go module for the picoserver.

When setting up the dependencies I needed to a make sure to point the go mod file to the local version of cyw43439 so that the local configuration I set up would be used.

From this point on the project instructions have to do with setting up the rest server and enabling functionality on the the Pico W.

I will now cover each slice of functionality that supports our rest server being able to communicate with the Pico W.

---

LED State Change

- The first one I will note is the changeLEDState function. The intended use of this is to notify us when the device is active.

  <img src="/images/posts/home-auto-4/ledChangeFunc.png" alt='LED Change Function' title='LED Change Function' width='600'>

- The two params:

  - `dev \*cyw43439.Device` is a pointer to an instance of cyw43439.Device. The \* indicates that dev is a pointer, meaning it points to the memory address where the actual Device instance is stored.

  - `state bool` is a boolean value that indicates whether the LED should be turned on or off.

- The logic:

  - if `err := dev.GPIOSet(0, state);` attempts to set the GPIO pin state using the method GPIOSet on the Device instance dev. The 0 indicates the GPIO pin number, and state is the boolean value passed to the function. The result of this operation is stored in the variable err.

  - `err != nil:` This checks if the operation resulted in an error (i.e., err is not nil). If there is an error, the code inside the if block will be executed.

The GPIO pin number that we use is determined by the design of the Pico W. We can refer to the [Raspberry Pi Pico Datasheet](https://datasheets.raspberrypi.org/pico/pico-datasheet.pdf) to find the GPIO pin number for the onboard LED.

<img src="/images/posts/home-auto-4/picoWPins.png" width='600' title='Pico W Pin Diagram'>

---

Device setup

- The next two functions perform the Pico W Wifi setup and listen for connection requests.

<img src="/images/posts/home-auto-4/setupDevice.png"  alt='set up device function' width="600" title='Setup Device Function'>

- This code can be found in the examples of the [cyw43439](https://github.com/soypat/cyw43439/blob/main/examples/common/common.go#L31) repository.

- The code below uses the seqs/stack package to define a function that listens to the incoming TCP connection on port 80.

<img src='/images/posts/home-auto-4/newListener.png' width='600' alt='new listner' title='new listner'>

---

Blink LED

- This function will support providing visual feedback when the Pico recieves a connection request.

<img src='/images/posts/home-auto-4/blinkLED.png' width='600' alt='blink LED' title='blink LED'>

---

Get Temperature

- Same function as the one we covered earlier. This function will be used to read the temperature from the onboard sensor.

<img src="/images/posts/home-auto-4/getTempfunc.png" alt="Get Temperature function" title="Get Temperature" width="600" />
