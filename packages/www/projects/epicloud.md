---
layout: details
title: EpiCloud
subtitle: Scaling School Operations with Bots
desc: >-
  AWS-based bot network that automates operations of a virtual charter school,
  enabling the school to scale seamlessly from 1,500 to over 60,000 students.
role: Programmer/Consultant
begin_year: 2015
end_year: 2021
_links:
  self:
    href: /projects/epicloud/
  languages:
    - href: /languages/ts/
  db:
    - href: /db/bigquery/
    - href: /db/ddb/
  tools:
    - href: /tools/classroom/
    - href: /tools/docker/
    - href: /tools/drive/
    - href: /tools/ec2/
    - href: /tools/ecr/
    - href: /tools/ecs/
    - href: /tools/fargate/
    - href: /tools/firebase/
    - href: /tools/iam/
    - href: /tools/node/
    - href: /tools/puppeteer/
    - href: /tools/s3/
    - href: /tools/sikulix/
    - href: /tools/sqs/
    - href: /tools/vpc/
  os:
    - href: /os/linux/
    - href: /os/macos/
  jobs:
    - href: /jobs/fe/
---

In 2014, Epic Charter Schools was on the verge of exponential growth and had already outgrown its initial, manual-based operations. With 1,500 students, the reliance on temporary staff for data entry created a constant backlog, forcing newly enrolled students to wait weeks for curriculum access and exposing the school to unacceptable security risks.

To solve the data backlog and enable growth, I designed and built EpiCloud, a network of automated bots on Amazon Web Services (AWS). The system's core architecture was engineered for scalability, enabling the school to grow seamlessly to over 60,000 students. As word of the bots' success spread and requests for more automation multiplied, I assembled a team of developers to write the bots that automated over 95% of the school's data entry tasks.

In parallel, I addressed the security risks by implementing a new, school-wide single sign-on solution. This replaced the insecure and cumbersome practice of managing separate credentials and dramatically improved the user experience. For the first time, teachers, students, and staff could securely access all school systems with their single Google account.

## Key Takeaway

The key to the project's widespread adoption lay in a simple change in language. Technical terms like 'workflows' or 'background tasks' were met with confusion. The moment we reframed the automation as 'bots', everyone understood. This provided a simple mental model. The idea that a bot could perform a human's task, just faster and without errors, empowered the non-technical staff to become active partners in identifying new automation opportunities.
