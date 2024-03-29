---
title: "Designing the Self Writing Recipe Blog"
date: "Dec 4, 2023"
excerpt: "its a chef!"
cover_image: "/images/posts/ai-recipe-blog/ai-recipe.png"
---

## AI Daily Recipe Blog

Today's thought experiment will be about an AI blog that requests information from an OpenAi GPT and writes daily recipe articles. I am imagining a lively voice that speaks about its sources and conveys an excitement for cooking. Our Ai friend writes clear concise recipes with minimal fluff. The inspiration for this idea comes from the many recipes I find on google that are often crowded with extra information in order to make the user view more advertisements 😕. My goal is to work through the design of a scalable system that would support such a product and to explore the viability of the idea.

A critical decision in this project would be... is the blog going to generate a recipe each day, each hour, or whenever the user wants? The choice significantly changes the product and expectations around costs. As we continue to explore the idea we will assume that the blog will generate a recipe each day.

### What sets this aside from other blogs?

The idea is to have an AI create new unique recipes from the information stored in books. Obviously the recipes must be delicious. The current form of the idea has no one cooking the recipes before being posted which invites a fair bit of risk.. or maybe excitement?

The custom GPT would be built upon cooking books that I pick out by hand and will need to be continually fed new information in order to stay interesting and unique for extended periods of time.

## Challenges and Considerations

- Recipe Validation: Without pre-testing, some recipes might be impractical or inedible.
- User Feedback Mechanism: Implementing a way for users to provide feedback on recipes can help improve the AI model.
- Cost Management: Continuous API calls to OpenAI and cloud hosting can incur significant costs.
- Ethical and Legal Considerations: Ensuring that the AI does not inadvertently plagiarize or create culturally insensitive content.

## Unique Selling Points

- Consistent and Quality Content Creation: Utilizing AI, this project can generate imaginative recipes that are clear descriptive, concise and regularly published without the need for a human to write.
- Innovation in Recipes: With access to a vast database of culinary books, the AI can combine ingredients and techniques in novel ways, potentially creating unique and delicious recipes.
- Risk and Excitement Factor: Since recipes aren't tested before posting, there's an element of surprise and experimentation for the readers.

---

## MVP

### Server Infrastructure

Cloud Hosting: Utilize a cloud service provider like AWS for hosting our server.

### API Integration

Integrate with OpenAI's API to access our custom GPT model and develop API endpoints

### Database

Set up database using PostgreSQL

### Custom GPT

Train a custom GPT model on cooking books

### Admin Panel

Allow admins to manage recipes and blog posts. Start with basic CRUD functionality. minus create

### Security

Authentication and authorization for admin panel and API endpoints

### Automated Workflow

Recipe Generation: Automate the process of generating and posting new recipes daily. Quality Checks: Implement basic automated checks to ensure recipe quality and coherence.

### Monitoring and Logging

Performance Monitoring: Use tools like New Relic or Datadog to monitor server performance. Error Logging: Implement logging for troubleshooting and improving the system.

### Scalability Planning

Load Balancing: Prepare for load balancing to handle high traffic. Auto-Scaling: Implement auto-scaling to adjust resources based on demand.

## MVP Development Steps

- Set Up Server and Hosting
- Database Setup
- API Development
- Integrate OpenAI custom GPT model via OpenAI api.
- Admin Panel Development
- Front end blog development
- Testing and Iteration

## What technologies will be used?

- Backend: Node.js, Express.js, PostgreSQL
- Frontend: React, Redux
- API: OpenAI API
- Hosting: AWS

## How will this sustain itself?

A few potential ideas are

- Subscription Model: Offer ablity to generate recipes on command for a monthly fee.

- Advertising: Display targeted advertisements on the blog. This could include banner ads, sponsored content, or affiliate marketing, where you earn a commission for promoting kitchen tools, ingredients, or related products. This is against my original idea of providing an ad free experience but it is an option.

- Sponsored Content and Partnerships: Collaborate with food brands, kitchen appliance manufacturers, or culinary schools for sponsored posts or content series. This would require a substantial amount of work to build up a large enough audience to attract sponsors.

- Cookbooks and E-books: Compile the most popular AI-generated recipes into digital or printed cookbooks. These could be themed (e.g., seasonal recipes, special diets) and sold online. This would have to come later in the products life after enough quality recipes have been generated.

---

Time Estimates

| Component                  | Task                                | Estimated Time |
| -------------------------- | ----------------------------------- | -------------- |
| **Server Infrastructure**  |                                     |                |
|                            | Research and Select Cloud Provider  | 1-2 weeks      |
|                            | Setup and Configuration             | 1 week         |
| **API Integration**        |                                     |                |
|                            | OpenAI API Integration              | 2-3 weeks      |
|                            | Custom Endpoints Development        | 1-2 weeks      |
| **Database**               |                                     |                |
|                            | Database Design                     | 1 week         |
|                            | Implementation and Testing          | 2 weeks        |
| **Custom GPT Model**       |                                     |                |
|                            | Data Collection for Training        | 2-3 weeks      |
|                            | Model Training and Optimization     | 4-6 weeks      |
| **Admin Panel**            |                                     |                |
|                            | Basic Functionality Development     | 2 weeks        |
|                            | Testing and Iteration               | 1 week         |
| **Security**               |                                     |                |
|                            | Implement Authentication Mechanisms | 1-2 weeks      |
|                            | Security Testing and Enhancements   | 1 week         |
| **Automated Workflow**     |                                     |                |
|                            | Recipe Generation Automation        | 1-2 weeks      |
|                            | Quality Check Algorithms            | 2-3 weeks      |
| **Monitoring and Logging** |                                     |                |
|                            | Setup Monitoring Tools              | 1 week         |
|                            | Implement Logging System            | 1 week         |
| **Scalability Planning**   |                                     |                |
|                            | Load Balancing Setup                | 1-2 weeks      |
|                            | Auto-Scaling Configuration          | 1 week         |
| **Front End Development**  |                                     |                |
|                            | UI/UX Design                        | 2-3 weeks      |
|                            | Frontend Coding                     | 3-4 weeks      |
|                            | Integration with Backend            | 1-2 weeks      |
| **Testing and Iteration**  |                                     |                |
|                            | Functional Testing                  | 2 weeks        |
|                            | User Acceptance Testing             | 1-2 weeks      |
|                            | Iteration Based on Feedback         | 2-4 weeks      |

---

## Total estimated time and cost

Approximately 1,800 hours or 45 weeks. This estimate is based on an average work week of 40 hours and the time allocations provided for each task. Actual hours may vary based on team efficiency, unforeseen challenges, and project scope adjustments.

To estimate the cost of AWS bills for the project over its 45-week timeline, we need to consider several factors. AWS pricing is complex and varies based on the services used, the scale of those services, and the region in which they are deployed. For a project like an AI-driven recipe blog, the following AWS services might be utilized:

EC2 (Elastic Compute Cloud): For running servers.
RDS (Relational Database Service): For the PostgreSQL database.
S3 (Simple Storage Service): For storing static files like images.
Route 53: For DNS and domain management.
Elastic Load Balancing: To distribute traffic.
Lambda: For serverless functions.
CloudFront: For content delivery network services.
AWS Support Plan: For technical support.

### Assuming a moderate usage scenario for a medium-traffic blog, let's make some ballpark estimates:

| Service                          | Description                     | Cost/Month |
| :------------------------------- | :------------------------------ | :--------- |
| **EC2**                          | t3.medium instance              | $70        |
| **RDS**                          | db.t3.medium instance           | $100       |
| **S3**                           | Moderate usage                  | $30        |
| **Route 53**                     | Domain management + DNS queries | $1         |
| **Elastic Load Balancing**&emsp; | Moderate traffic                | $20        |
| **Lambda**                       | Moderate usage                  | $20        |
| **CloudFront**                   | Moderate traffic                | $50        |
| **AWS Support Plan**             | "Developer" plan                | $29        |

## Total Monthly Cost

A minimal setup with a small to medium-sized EC2 instance, a corresponding RDS instance, and moderate use of S3 might cost around $100 to $200 per month. However, this is a very rough estimate and can vary significantly.

The estimated AWS cost for supporting the AI-driven recipe blog over a 45-week period could range from approximately $1,038 to $2,077.

## What if there is no traffic?

In this scenario, the cost would likely skew towards the lower end of the previously estimated range ($100 per month) or even less, as you wouldn't need a highly capable infrastructure for handling traffic. However, some costs, like those for database storage and minimal server requirements, remain unavoidable. In an effort to support desiging scalable systems, we will assume that the blog will have some traffic.

## Do I actually think this is viable?

There is a large concern around actual quality of recipes that are generated. Lots of testing will have to happen before this is a viable product. I think that the idea is interesting and could be a fun project to work on. Instead of developing this out as we have discussed, testing recipe generation by the custom GPT and seeing if they are quality will be a real eye opener. As with many tech product ideas it would be wise to ask as many people about the idea as possible and see if there is a market for it. My intuition says that people would be skeptical of the quality of the recipes and would not be willing to pay for a subscription. I think that the idea is interesting and could be a fun project to work on. I am not sure if it is a viable business idea.

Will
