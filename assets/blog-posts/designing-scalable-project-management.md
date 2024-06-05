---
title: "Managing Software Development Projects and Small Teams"
date: "Dec 29, 2022"
excerpt: ""
cover_image: "/images/posts/project-management/software_dev_team.webp"
---

Communication is one of the most important aspects of working on a software development team. If communication is off each engineer could be working diligently but actively undo other's work, creating bugs, or creating incompatible patterns that will cause issues in the future.

Whether one is a solo developer, 5 man team, of 100 man team, effectively planning tasks is crucial for the success of the endeavor. Designing a project management system can vary as different team sizes call for different patterns and procedures. From what I have seen, as the team size decreases less procedures and patterns are needed. I would vote for using some patterns even when working alone because it can provide a metaphorical filing cabinet to look up past events and changes even when the software developer has trouble remembering the exact issue or change. Using patterns when working alone will also have future benefits when/if the team size changes.

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

Finally regardless of the patterns a team decides to use, documentation is crucial. Simple documentation around these patterns can help new team members get up to speed quickly and provide a reference for existing team members. If a task is tedious and I know either I or someone else will have to do it again in the future, its a sure sign to document the process.
