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

To eliminate the backlog and enable growth, I designed and built EpiCloud, a network of automated bots on Amazon Web Services (AWS). The system’s architecture was engineered for scalability, allowing the school to grow seamlessly to over 60,000 students. As word of the bots’ success spread and requests for additional automation multiplied, I assembled a team of developers to build bots that ultimately automated over 95% of the school’s data entry tasks. I built a custom command-line interface (CLI) to manage and monitor this complex network, which proved critical to its operational success.

In parallel, I addressed the security risks by implementing a new, school-wide single sign-on solution. This replaced the insecure practice of managing separate credentials, allowing teachers, students, and staff to securely access all school systems with just their single Google account.

## Key Takeaway

The key to the project’s widespread adoption lay in a simple shift in language. Technical terms like 'workflows' or 'background tasks' were met with confusion. But the moment we framed the automation as 'bots', everyone understood. It provided a clear mental model: a bot could perform a human’s task, just faster and without errors. This empowered non-technical staff to become active partners in identifying new automation opportunities.
