---
layout: details
title: Nuggets
subtitle: Dynamic Curriculum Generation with AI
desc: >-
  React Native app built using AI and state machines for learning Spanish or
  English.
role: Author
begin_year: 2023
end_year: present
_links:
  self:
    href: /projects/nuggets/
  languages:
    - href: /languages/ts/
  db:
    - href: /db/ddb/
  tools:
    - href: /tools/amplify/
    - href: /tools/azure-ai/
    - href: /tools/docker/
    - href: /tools/ec2/
    - href: /tools/ecr/
    - href: /tools/ecs/
    - href: /tools/expo/
    - href: /tools/fargate/
    - href: /tools/iam/
    - href: /tools/node/
    - href: /tools/openai/
    - href: /tools/react-native/
    - href: /tools/s3/
    - href: /tools/sqs/
    - href: /tools/vpc/
    - href: /tools/xstate/
  os:
    - href: /os/android/
    - href: /os/ios/
    - href: /os/linux/
  jobs:
    - href: /jobs/freelance/
---

This project originated as a proof-of-concept, using AI to dynamically generate Spanish language exercises with integrated text-to-speech. After a few months with Swift, I transitioned to React Native to enable support for a wider range of platforms.

In 2024, the project pivoted. I collaborated with my fiancée to rebuild the app for a research study on micro-learning Spanish for adult learners, which served as her master's degree capstone project. This research version is available in the [App Store](https://apps.apple.com/us/app/nuggets-language-learning/id6477367353) and [Play Store](https://play.google.com/store/apps/details?id=education.futuristic.nuggets).

More recently, we've added English lessons to help learners study for the U.S. Naturalization Test and obtain their citizenship.

The next evolution of the app will use AI to create a truly personalized learning journey. It will dynamically generate curriculum tailored to each learner's unique goals and interests, continuously assess their fluency, and adapting to their progress.

## Key Takeaway

Once you understand and embrace the power of state machines, any application logic not modeled as one looks like spaghetti.

My initial choice for state management, Zustand, worked well for managing state but provided no structure for organizing event logic and business rules. Adopting XState allows for modeling all application logic as finite state machines — an approach that has completely changed how I build apps.
