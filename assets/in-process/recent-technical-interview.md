---
title: "A technical interview actually representative of real work."
date: "Dec 15, 2024"
excerpt: ""
cover_image: "/images/posts/recent-technical-interview/icon.png"
# hide_image_in_slug: true
---

## Intro

Recently I was invited to take a second round technical interview for a small company. While many technical interviews may ask generic questions about computer science principals, methodologies, and technologies, this one focused on trying to evaulate a candidate on real work environment scenarios and a coding challenge involving an implemenation of tool rather than an algorithmic puzzle. The implementation of the tool did take into consideration the efficiency of the solution allowing for reasoning of how best to implement considering concepts that are applied to traditional algo puzzles. This was the most enjoyable form of technical interview I have experienced. I was able to solve all 3 questions in the hour but I could have optimized the final implementation more for efficiency. Time will tell if it was good enough to proceed to the next round. In the meantime I thought it would be interesting to review what I have learned and dive into the details of the preperation.

A few days before the interview I came up with some questions that I thought would be helpful to think about prior to the date.

### Hypothetical Technical Interview

- Question 1: System Design
  The platform connects startups with investors and must handle a high volume of users making transactions simultaneously. How would you design a scalable and fault-tolerant transaction processing system that ensures data consistency while maintaining high availability? Include considerations for database structure, API design, and fault tolerance.

- Question 2: Backend Development
  You need to add a feature that calculates and displays a user’s total investments across all startups they’ve funded. How would you: Write the SQL query for this feature. Optimize it for performance if the database contains millions of records.

- Question 3: React Frontend
  Imagine you’re tasked with building a React component for this platform. It should display a list of startups with filters for industry and funding stage. Explain how you’d structure this component and manage the state for filtering. How would you handle an edge case where the API returns no results?

### Hypothetical Q1

I found this to the most interesting question as it addresses the system design as a whole.

- First lets imagine the database schema.

```sql
CREATE TABLE Users (
  user_id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)

CREATE TABLE Startups (
  startup_id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  funding_goal DECIMAL NOT NULL,
  amount_raised DECIMAL DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)

CREATE TABLE Investments (
  investment_id SERIAL PRIMARY KEY,
  user_id INT REFERENCES Users(user_id),
  startup_id INT REFERENCES Startups(startup_id),
  amount DECIMAL NOT NULL,
  status VARCHAR(50) DEFAULT 'PENDING',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)

CREATE TABLE IdempotencyKeys (
  idempotency_key VARCHAR(255) PRIMARY KEY,
  investment_id INT UNIQUE
)

```

- Now lets imagine the workflow.

1. A user clicks a button to make an investment in a startup sending over amount and payment information.
2. The frontend application makes an POST request to /investment route in the API
3. The route checks any preconditions like validating the user, investment parameters, and checking a startup's funding limits.
4. An initial insert is made into the investments table with a status of pending.
5. Dispatch a task to the background processing system for further actions like payment processing and updating statuses. The task is passed with idempotency key to ensure duplicate requests do not result in duplicate transactions.
6. When dispatched the task is pushed to a message queue to await processing by the background worker.
7. Once picked up by the worker, we We begin the SQL transaction

   - retreive the investment from the database and update its status to 'processing'.
   - call the payment API service to charge the user
   - on success

     - update the investment status to completed
     - update the startup's amount raised field

   - on failure
   - roll back changes and update the investment status to failed
   - log all outcomes for monitoring and troubleshooting

8. Worker then sends message back to the API server where the result message can be passed back to the frontend.
9. For best results I would choose a websocket connection to immediately notify the frontend of the success once the response is returned from the worker.

<img src="/images/posts/recent-technical-interview/system-design.png" alt="containers vs traditional software deployments" title="containers vs traditional software deployments"  />

### Hypothetical Q2

```sql
  SELECT user_id, SUM(amount) AS total_investment
  FROM investments
  WHERE user_id = ?
  GROUP BY user_id;
```

- In order to optimize for millions of records we could add an index on investments table user_id.
- Make sure to only select required columns as we did above.

## Actual Technical Interview

### Q1

A customer calls in and says their profile is taking 2 to 3 seconds to load. What do you do?

### Q2

A customer is going through the onboarding process and clicking a button does not work. You try and everything works as expected on prod and in your local development. A co worker tries and he is able to reproduce this. The issue is happening in prod for him but not for you.

### Q3

Implement a Class PubSub with two methods publish and subscribe.
