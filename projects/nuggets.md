---
layout: details
title: Nuggets
subtitle: Dynamic Curriculum Generation with AI
desc: >-
  Cross-platform React Native app that leverages AI and finite state machines to
  generate dynamic, personalized learning curriculum.
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
    - href: /tools/codebuild/
    - href: /tools/cognito/
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
  devices:
    - href: /devices/android/
    - href: /devices/cloud/
    - href: /devices/ipad/
    - href: /devices/iphone/
    - href: /devices/tv/
  jobs:
    - href: /jobs/independent/
---

This project began as a proof of concept to validate the use of AI for generating dynamic language-learning exercises. While the initial version was built with Swift, I transitioned to React Native to support a wider range of platforms.

In 2024, the project evolved from a personal tool into a formal research initiative. In collaboration with my fiancée, the app was rebuilt for a master’s degree capstone study on the effectiveness of microlearning for adult Spanish learners. This research version is available in the [App Store](https://apps.apple.com/us/app/nuggets-language-learning/id6477367353) and [Play Store](https://play.google.com/store/apps/details?id=education.futuristic.nuggets).

More recently, we added English lessons to help learners study for the U.S. Naturalization Test and obtain their citizenship. This marks the first step in the app’s next evolution: using AI to create a truly personalized learning journey. The upcoming version generates a curriculum tailored to each learner’s unique goals and interests, continuously assesses fluency, and adapts to their progress.

## Key Takeaway

Every application contains a state machine—either an explicit, well-defined one, or an ad hoc, implicit one scattered across the codebase.

My initial choice for state management, Zustand, worked well for managing state but offered no structure for organizing event logic and business rules. Adopting XState allowed me to model all application logic as finite state machines. This approach has completely changed how I build apps.
