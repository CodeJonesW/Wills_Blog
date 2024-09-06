---
title: "Home Automation: Networking a Temperature Monitor"
date: "Aug 4, 2024"
excerpt: ""
cover_image: "/images/posts/home-auto-4/temp.webp"
---

At this point in the journey of working through [Automate Your Home Using Go](https://pragprog.com/titles/gohome/automate-your-home-using-go/) I have set up a Raspberry Pi 5 and a development environment that includes a rest server and Gitea. I have also set up Prometheus and Grafana to monitor the services I have set up on the Raspberry Pi.

In this article I will review my experience setting up a [Raspberry Pi Pico W](https://www.raspberrypi.com/products/raspberry-pi-pico-w/) to monitor the temperature in my home. The Pico W is a microcontroller board that has onboard Wi-Fi capabilities as well as a temperature sensor.

The goal of the project is to program the Pico W to read the temperature from the onboard sensor and send the data to the Raspberry Pi 5. The Raspberry Pi 5 will then store the data in a Postgres database, display the data in a Grafana dashboard, assign alerts, and send an email when the temperature reaches a certain threshold.

TinyGO, a minimized version of GO that is capable of running on the Pico W is still in development. The Wi-Fi driver for the Pico W is not yet officially available but there is a development version [cyw43439](https://github.com/soypat/cyw43439) available that we can use.

There is a likelihood that when the driver is officially integrated with TinyGO the code may need an update to an import path but is not expected to be a major change.

The Pico W is a microcontroller and is designed to immediately start at runtime at power on and execute the program / script it is given. There is currently support for C++ libraries.

The toughest part following through with this project was the setup and installation of GO and TinyGO on my Raspberry Pi 5. In order to follow the [instructions for installing TinyGO on Linux](https://tinygo.org/getting-started/install/linux/) I had to also install GO on my Raspberry Pi 5. I was able to follow the instructions for installing GO on Linux from the [official GO website](https://golang.org/doc/install).

GO installed smoothly but I had small blocker due to a library issue when installing TinyGO. I found a group of people having the same [issue](https://github.com/raspberrypi/bookworm-feedback/issues/120) and was able to find a solution.

"Some shared libraries and/or programs on Bookworm 32-bit systems are not linked with 16K pages, which causes sdm to fail when it enters the IMG.

When sdm identifies this failure, it should provide some diagnostic information and the fix: Add the line kernel=kernel8.img to /boot/config.txt and reboot.

See raspberrypi/bookworm-feedback#120 for further details."

Once I had both GO and TinyGO installed I was able to follow the instructions for implementing the code to poll the temperature. A few extra points to note are

- The program takes advantage of the on-board LED to indicate when the temperature is being read.
- The onboard temperature sensor is close to the Pico W's CPU and other components so the temperature is not entirely accurate but is expected to be good enough for our general monitoring purposes.

TinyGO provides a library named [machine](https://tinygo.org/docs/reference/microcontrollers/machine/) to interact with components of different microcontroller devices.

Example of Pico Read Temperature function - [Docs](https://tinygo.org/docs/reference/microcontrollers/machine/pico/#func-readtemperature)

<img src="/images/posts/home-auto-4/getTempfunc.png" alt="Get Temperature function" title="Get Temperature" width="600" />

Internally, the Raspeberry Pi Pico W calculates the temperature by measuring the voltage on the fifth channel of the analog digital converter controller. The temperature in millidegrees Celsius (thousandths of a degree Celsius) is calculated using a specific formula.
The formula used is T = 27 - (ADC_voltage - 0.706)/0.001721

<img src="/images/posts/home-auto-4/func-ReadTemperature.png" alt="Read Temperature function" title="Read Temperature" width="600" />

The first conditional statement checks if the analog digital converter controller is enabled. If it is not enabled, the InitADC() function is called to enable it. The temperature sensor bias source is then enabled by setting the TS_EN bit in the control and status register of the analog digital converter controller.

Breaking down the formula used to calculate the temperature in milli-celsius:

- 27000 << 16 shifts the value 27000 (which represents 27°C) to the left by 16 bits.
- int32(adcTempSensor.getVoltage()) gets the voltage reading from the temperature sensor.
- 706 << 16 shifts the value 706 to the left by 16 bits.
- The difference (int32(adcTempSensor.getVoltage()) - 706 << 16) is then multiplied by 581, which is a constant derived from the formula.
- The final result is then shifted back to the right by 16 bits to obtain the temperature in milli-celsius.

In order to retrieve the data being captured by the Pico W, I needed to connect it to Wi-Fi. I used the driver mentioned earlier called [cyw43439](https://github.com/soypat/cyw43439). Following a few simple instructions I was able to setup the config file and connect to my home network.

After connecting to Wi-Fi I set up a new Go module for the picoserver.

When setting up the dependencies I needed to a make sure to point the go mod file to the local version of cyw43439 so that the local configuration I set up would be used.

From this point, on the project instructions have to do with setting up the rest server and enabling functionality on the the Pico W.

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

- The next two functions perform the Pico W Wi-Fi setup and listen for connection requests.

<img src="/images/posts/home-auto-4/setupDevice.png"  alt='set up device function' width="600" title='Setup Device Function'>

- This code can be found in the examples of the [cyw43439](https://github.com/soypat/cyw43439/blob/main/examples/common/common.go#L31) repository.

- The code below uses the seqs/stack package to define a function that listens to the incoming TCP connection on port 80.

<img src='/images/posts/home-auto-4/newListener.png' width='600' alt='new listener' title='new listner'>

---

Blink LED

- This function will support providing visual feedback when the Pico receives a connection request.

<img src='/images/posts/home-auto-4/blinkLED.png' width='600' alt='blink LED' title='blink LED'>

---

Get Temperature

- Same function as the one we covered earlier. This function will be used to read the temperature from the onboard sensor.

<img src="/images/posts/home-auto-4/getTempfunc.png" alt="Get Temperature function" title="Get Temperature" width="600" />

---

HTTP Handler

- a function to handle the incoming HTTP requests for the temperature data. This functionality is supported by the seqs/httpx library to define http headers for the response and the encoding/json library to encode the temperature data in JSON format.

## <img src="/images/posts/home-auto-4/http_handler.png" alt="Get Temperature function" title="Get Temperature" width="600" />

---

handleConnection

A function that will respond with the temperature data. The author notes that because this is a small device, we need to define some buffer that can be reused for all connections in order to avoid memory allocations. This function also takes a channel parameter. This channel will cause the blink goroutine to blink indicating it is processing a connection.

<img src="/images/posts/home-auto-4/handle_connection.png" alt="Get Temperature function" title="Get Temperature" width="600" />

When working with embedded devices like the Raspberry Pi Pico W, resources like memory are very limited compared to typical computers. To optimize memory usage, one common strategy is to reuse buffers for tasks like reading and writing data over a network connection, rather than allocating new memory every time a new connection or request is handled. This is particularly important in environments where you want to avoid frequent memory allocations and deallocations, which can cause fragmentation and increase the risk of memory exhaustion or performance degradation.

A buffer is a block of memory used to store data temporarily while it's being transferred from one place to another. For example, when receiving data from a network socket, you might read chunks of data into a buffer before processing them. In Go, you can use the bufio package to work with buffered I/O efficiently.

Instead of allocating a new buffer every time a new connection is accepted, one can define a fixed-size buffer once and reuse it for all subsequent connections. This prevents frequent allocations on the heap and reduces garbage collection overhead, which is especially useful on memory-constrained devices.

In the function above, I am using bufio.NewReaderSize to create a buffered reader. The size of the buffer is defined as 1024 bytes, and it is reused for each connection. By resetting the buffer (buf.Reset(conn)) for each new connection, we can avoid reallocating new memory each time.

Finally all of the components come together in the main function. At the end, the function uses an infinite loop with a blocking select statement to prevent the program from terminating while the goroutines run in the background.

<img src="/images/posts/home-auto-4/main.png" alt="main function" title="Get Temperature" width="600" />

At this point I am ready to write the program to the Pico W. I use the below tiny go command to build the program.

`tinygo build -target=pico -opt=1 -stack-size=8kb -size=short -o main.uf2 .`

After copying the main.uf2 file to the Pico W, the device will start restart and run the program. We can use `tinygo monitor` to view the device logs.

In the logs we find the ip address assigned to the device by the router and then curl that address to receive the response below.

{"tempC": 25.6, "tempF": 78.08}%

At this point I was able to disconnect the Pico W from the computer and power it using a USB power adapter. The device restarted and connected to the Wi-Fi network. I was able to curl the device and receive the temperature data.

The next step is building the Prometheus exporter that will poll the Pico W’s assigned IP address every 10 seconds to capture the temperature data. The data will eventually be processed by Grafana to visualize the ambient temperature around the Pico W.

I learned a lot in this chapter of the book. 🙂
