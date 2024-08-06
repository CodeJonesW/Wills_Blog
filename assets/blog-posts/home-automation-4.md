---
title: "Home Automation: Networking a Temperature Monitor"
date: "Aug 4, 2024"
excerpt: ""
cover_image: "/images/posts/home-auto-4/temp.webp"
---

At this point in the journey of working through [Automate Your Home Using Go](https://pragprog.com/titles/gohome/automate-your-home-using-go/) I have set up a Raspberry Pi 5 and a development environment that includes a rest server and Gitea. I have also set up Prometheus and Grafana to monitor the services I have set up on the Raspberry Pi.

In this article I will review my experience setting up a [Raspberry Pi Pico W](https://www.raspberrypi.com/products/raspberry-pi-pico-w/) to monitor the temperature in my home. The Pico W is a microcontroller board that has onboard WIFI capabilities as well as a temperature sensor. At the time of purchase for this project the Pico W only cost $6 USD off of [Sparkfun](https://www.sparkfun.com/products/20173).

The goal of the project is to set program the Pico W with a simple program that will read the temperature from the onboard sensor and send the data to the Raspberry Pi 5. The Raspberry Pi 5 will then store the data in a Postgres database, display the data in a Grafana dashboard, assign alerts and send an email when the temprateure reaches a certain threshold.

There is work being done to created TinyGO, a minimized version of GO that is capable of running on the Pico W. The book informs us that the WIFI driver for the Pico W is not yet officially available but there is a development version [cyw43439](https://github.com/soypat/cyw43439) available that we can use.

There is a likelyhood that when the driver is officiallh integrated with TinyGO the code may need an update to an import path but is not expected to be a major change.

The Pico W is a microcontroller and is designed to immediately start at runtime at power on and execute the program / script it is given. There is currently support for C++ libraries.

The toughest part following through with this project was the setup and installation of GO and TinyGO on my Raspberry Pi 5. In order to follow the [instructions for installing TinyGO on Linux](https://tinygo.org/getting-started/install/linux/) I had to also install GO on my Raspberry Pi 5. I was able to follow the instructions for installing GO on Linux from the [official GO website](https://golang.org/doc/install).

GO installed smoothly but I had more difficultly due to a libary issue when installing TinyGO. I found a group of people having the same [issue](https://github.com/raspberrypi/bookworm-feedback/issues/120) and was able to find a solution.

```txt
Some shared libraries and/or programs on Bookworm 32-bit systems are not linked with 16K pages, which causes sdm to fail when it enters the IMG.

When sdm identifies this failure, it should provide some diagnostic information and the fix: Add the line kernel=kernel8.img to /boot/config.txt and reboot.

See raspberrypi/bookworm-feedback#120 for further details.
```

Once I had both GO and TinyGO installed I was able to follow the instructions for implementing the code to poll the temperature. A few extra points to note are

- The program takes advantage of teh on-board LED to indicate when the temperature is being read.
- The on board temperature sensor is close the the Pico W's CPU and other components so the temperature is not entirely accurate but is expected to be good enough for our general monitoring purposes.

TinyGO provides a library named [machine](https://tinygo.org/docs/reference/microcontrollers/machine/) to interact with components of different microcontroller devices.

Example of Pico Read Temperature function - [Docs](https://tinygo.org/docs/reference/microcontrollers/machine/pico/#func-readtemperature)

```golang
func getTemperature() *temp {
    curTemp := machine.ReadTemperature()
    return &temp{
        TempC: float64(curTemp) / 1000,
        TempF: ((float64(curTemp) / 1000) * 9 / 5) + 32,
    }
}
```

Internally the Raspeberry Pi Pico W calculates the temperature by measuring the voltage on the fifth channel of the analog digital converter controller. The temperature in milli-celsius (thousandths of a degree Celsius) is calculated using a specific formula.
The formula used is T = 27 - (ADC_voltage - 0.706)/0.001721

```golang
func ReadTemperature() (millicelsius int32) {
    if rp.ADC.CS.Get()&rp.ADC_CS_EN == 0 {
        InitADC()
    }
    // Enable temperature sensor bias source
    rp.ADC.CS.SetBits(rp.ADC_CS_TS_EN)
    // T = 27 - (ADC_voltage - 0.706)/0.001721
    return (27000<<16 - (int32(adcTempSensor.getVoltage())-706<<16)*581) >> 16
}
```

The first conditional statement checks if the analog digital converter controller is enabled. If it is not enabled, the InitADC() function is called to enable it. The temperature sensor bias source is then enabled by setting the TS_EN bit in the control and status register of the analog digital converter controller.

Breaking down the formula used to calculate the temperature in milli-celsius:

- 27000 << 16 shifts the value 27000 (which represents 27°C) to the left by 16 bits.
- int32(adcTempSensor.getVoltage()) gets the voltage reading from the temperature sensor.
- 706 << 16 shifts the value 706 to the left by 16 bits.
- The difference (int32(adcTempSensor.getVoltage()) - 706 << 16) is then multiplied by 581, which is a constant derived from the formula.
- The final result is then shifted back to the right by 16 bits to obtain the temperature in milli-celsius.

In order to use retrieve the data being captured by the Pico W, I needed to connect it to WIFI. I used the driver mentioned earlier called [cyw43439](https://github.com/soypat/cyw43439). Following a few simple instructions I was able to setup the config file and connect to my home network.

After connecting to Wifi I set up a new Go module for the picoserver. A specific note about this setup is that the program uses a local version of cyw43439 so that must be specified in the go.mod file. Being new to GO I like to note the side quest learning opportunities that arise.

to be continued... 🌡️
