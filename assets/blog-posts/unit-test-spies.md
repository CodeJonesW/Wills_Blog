---
title: "Unit Test Spies"
date: "March 5, 2025"
excerpt: ""
cover_image: "/images/posts/unit-test-spies/spy.webp"
hide_image_in_slug: true
---

## Intro

Learning to use unit tests to become confident in code changes is a lovely thing. Deploying changes with confidence gives back hours of sleep, provides a life like glow, and brings good weather.

## Visualizing a Spy

<img src="/images/posts/unit-test-spies/test4.png" alt="spies-diagram" title="spies-diagram"  />

In our unit test we want to test a function. The function uses an import called fn that we cannot change the actual response of. Therefore we spy on the function and change the response via a mock implementation. Spies are often used for external API calls and external dependencies. They allow you to control the behavior of functions without invoking their actual implementation, making it easier to test edge cases, different return values, and code paths.

Setting up spies in unit tests can have syntax that is frustrating. Despite the lift, it is very nice to have the pattern established for changing the returned value to suit your needs.

I love making diagrams of programming concepts - A picture is worth a thousand words 🙂
