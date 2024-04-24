---
title: "Managing Software Development Projects and Small Teams"
date: "Dec 29, 2022"
excerpt: ""
cover_image: "/images/posts/project-management/software_dev_team.webp"
---

Imagine a group of talented musicians, each skilled in their own right, who come together to form an orchestra. However, instead of working from a shared, carefully composed piece of music, they each play their favorite songs, in their preferred styles and at their own tempos. Instead of a harmonious symphony, there's a cacophony of disjointed melodies. The musicians, despite their individual talents, fail to create something beautiful together. This scenario mirrors a software team not communicating. Each engineer is working hard but the lack of alignment actually causes rifts in the code and creates work once a bottle neck is reached. At this point work begins to slow because changes are harder to make than ever.

Whether one is a solo developer, 5 man team, of 100 man team, effectively planning tasks is crucial for the success of the endeavor. Designing a project management system is a difficult task because different team sizes call for different patterns and procedures. From what I have seen in the wild the smaller the team the less procedure and patterns. I would vote for using patterns even when working alone because it can provide a metaphorical filing cabinet to look up past events and changes even when the software developer has trouble remembering the exact issue or change. Using patterns when working alone will also have future benefits when/if the team size changes.

Getting a group of people to suddenly change their develoment patterns can be tough. Establishing patterns early the projects history and onboarding of new team members with accesible and correct information is important to keep consistency high through various aspects of the software project.

In an early stage startup it makes sense to begin with the simplest system and then make additions and improvements as the team grows.

## Things to Consider for Small Team Project Management

1. Kanban-style task tracker and Sprints
2. Issue reporting, tracking
3. Tagging code changes to issues and branch names
4. Code Releases
5. Documentation

A Kanban-style task tracker is a tool that allows teams to track and manage their work using a visual representation of their tasks. It typically consists of a board with columns that represent different stages of the work process and cards that represent individual tasks. Typical columns include To Do, In Progress, Done, Blocked, Review, Approved, and Live. Additional columns may be added depending on the specific needs of the team and the project.

Using this style task tracker creates an organized todo list for developers and provide visibility into task progress for the team. Teams can decide on sprint length and plan tasks accordingly. I prefer bi weekly sprints because it gives me enough time to complete tasks and also allows for some flexibility in case of unexpected issues. This also prevents to many or to few tasks from being assigned to a sprint.

Issue reporting and tracking is important for keeping track of bugs and feature requests. This can be done using a tool like Jetbrains Space Issues or Github Issues. Tagging code changes to issues and branch names can help keep track of what changes are being made and why. When a bug occurs, it is easier to track down the origin and fix it. This can also provide context around the original change and provide perspective so that best decisions can be make in regards to the fix.

When a team member creates a branch or a merge request I prefer the pattern username/issue-#. When looking back at solved issues to find changes searching the ticket and having direct links to the code changes is very helpful. This also helps to keep the branches organized and easy to find.

When it is time for a release all the code changes above can be linked in the release merge request and provide a nice summary of the changes that are being released and can easily be copied into a release notes document for the internal team.

Finally regardless of the patterns a team decides to use, documentation is crucial. Simple documentation around these patterns can help new team members get up to speed quickly and provide a reference for existing team members.
