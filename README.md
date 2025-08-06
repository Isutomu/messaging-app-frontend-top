# messaging-app-frontend-top

> [!IMPORTANT]
> This is only the **frontend** part of the project. Be sure to also visit the [backend](https://github.com/Isutomu/messaging-app-frontend-top) part.

## Pointlessly long preface

This project is referent to the [Project: Messaging App](https://www.theodinproject.com/lessons/nodejs-messaging-app) of [The Odin Project](https://www.theodinproject.com). The extra credits functionalities were also considered upon conception.

The planing phase was done, as per usual, in the form of scribbles on paper that can be found [here](https://drive.google.com/drive/folders/1OxO1z_3D3gsvludLEYDcDHYrMCLstg0n?usp=sharing). Potentially there are even more documents there if I deemed necessary to add it, so I recommend you to check it out.

As this is the first of the two repositories (backend and frontend) that I'm using for this project I also would like to share some thoughts about how I approached this project, both in terms of structures and development philosophy.

### Structure

In general, the idea is as following:

1. Outline the basic functionalities (what was required on the project description) along with some (in this case, all) extra credits functionalities
2. Sketch the interfaces for each of the functionalities (a slightly improved wireframe)
3. Loop for each functionality
   1. Implement the functionality on frontend (visual only)
   2. Define the necessary API calls
   3. Make tests for the necessary routes on backend (one route at a time)
   4. Implement the routes
   5. Connect to frontend
4. Initialize the production database
5. Deploy backend
6. Deploy frontend

Designing the database model, determining (if any) the information needed to initialize the database, and implementing said database is first priority once any work is to be done on the backend.

The lack os tests on the frontend, the simplicity of the tests on the backend, the overreliance on PaaS, the use of js instead of ts in a React project (even if just as a library), are some of the things that are known to me as weakness in this project as a educational venture. But as you're learning there's only so much you should do at once (I really wanted to implement web sockets but alas it would be way too time demanding considering my 0 experience with it).

### Development Philosophy

First, english is not my first language so this title surely sounds strange and also probably doesn't convey what I actually wanted to say, but I did not find a replacement (didn't look that hard too, to be honest).

This project will follow a more rigid structure than my other endeavors simply because I want to focus on efficiency.
I'm taking this as an opportunity to see how much I've actually grown as a developer. Why this project? Because it's the one that I'm properly starting after a much larger scale project that I developed for my current company (not available on github, as you would imagine). I feel like I learned a lot there so I want to test said growth.
Now, before I put into topics some more concrete things to which I'll be paying attention during development, I must say that some of them might look quite "simple". I don't necessarily disagree, but it must be noted that my main focus on past projects was just to make it work without too much (if any) polish. Now I want to add that polish.

So, now to the topics:

- Follow a more rigid development structure
  - The idea is to fully flesh out each functionality prior to going forwards. Obviously, to have a rigid structure I had to plan the application properly, so even if takes more time to develop certain parts than in other projects it will now spiral out of control because what I'm going to do is limited
- Accessibility
  - Even if not fully WCAG compliant the idea is that everything that was implemented is properly configured to be user friendly. So accessibility features that would need something to be added are not contemplated. The simplest example is the contrast levels of the application, that can be WCAG compliant with a little work (specially if you go for a monotone approach)
- Testing
  - Only for the backend and more simple (usually only verifying status codes), but contemplating every single route to be implemented
- Data validation
  - All data entered by the user is to be properly validated and if harmful, sanitized
- Responsiveness
  - Simplify the interface model to only two, them being significantly close in how they are used. Delimitate minimum and maximum size for interface elements
- Make it work
  - Even if the general concept of the application is questionable (like having a messaging app with a REST API), make it so the difference to the "real thing" is not that far given the constraints. Pay attention to not try to mimic a functionality of a better tool with the one that you're using it, but how does my current structure can (kinda) work by using its own strengths
- Deal with expected errors and some of the unexpected
  - When the user is inputting data all will have to conform to the limits of the app. Things such as this are the expected errors.
    Unexpected errors is considerably more wide in scope, so the focus here will be on responding to bad API calls.
    The idea is not so much as to make a perfect program that reacts to all, but to deal with the more realistic situations that an user might find themselves in

## Features to implement

> [!IMPORTANT]
> Modifiers ("not priority" and the like) don't imply importance. Most of the time they simply mean that I thought they were too difficult to tackle for now.

- Group creation
- Group chat
- File sending
- Friendship by invite
- Profile
- Notifications
  - Online
  - New message
  - Display new message (just like any other chat app)

## Features in consideration

-
