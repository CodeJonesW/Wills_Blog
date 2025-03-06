---
title: "Unit Test Spies"
date: "March 5, 2025"
excerpt: ""
cover_image: "/images/posts/unit-test-spies/spy.webp"
hide_image_in_slug: true
---

## Intro

Learning to use unit tests to become confident in code changes is a lovely thing. Deploying changes with confidence gives back hours of sleep, provides a life like glow, and brings good weather.

## Unit Test Spies

<img src="/images/posts/unit-test-spies/test4.png" alt="spies-diagram" title="spies-diagram"  />

In our unit test we want to test a function. The function uses an import called fn that we cannot change the actual response of. Therefore we spy on the function and change the response via a mock implementation.

This allows us to test different code paths based on the results of our mock implementation.

Sometimes setting up spies in unit tests can have syntax that is frustrating. Despite the lift, it is very nice to have the pattern established for changing the returned value to suit your needs. Spies are often used for external API calls, library functions, and

I love making diagrams of programming concepts - A picture is worth a thousand words 🙂
