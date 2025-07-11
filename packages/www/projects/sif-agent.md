---
layout: details
title: SIF Agent
subtitle: Automating State Reporting for 500+ Schools
desc: >-
  State of Oklahoma's first Schools Interoperability Framework (SIF) compliant reporting agent, securing our company's position as the dominant
  market provider for over 500 school districts.
role: Lead Developer
begin_year: 2004
end_year: 2005
_links:
  self:
    href: /projects/sif-agent/
  languages:
    - href: /languages/cs/
    - href: /languages/sql/
  db:
    - href: /db/pervasive/
  os:
    - href: /os/windows/
  jobs:
    - href: /jobs/mas/
---

In 2004, the State of Oklahoma mandated that all Student Information Systems become compliant with the Schools Interoperability Framework (SIF), a complex, pre-API, XML-based messaging protocol. At the time, I was the lead developer for MAS, a small company whose software was used by over 70% of the state's school districts. The mandate was widely seen as an existential threat, a move by our large, national competitors to legislate us out of the market by requiring a technology they believed we were incapable of delivering.

As the project's sole developer, I designed and built the SIF Agent from the ground up, learning C# on the fly to implement a robust data transformation engine that mapped our Pervasive SQL database to the rigid SIF XML standard. The agent was architected for extensibility, allowing new data objects to be added through simple configuration and a set if SQL statements. The process culminated in managing the certification with the state, where our agent was so reliable that we helped the state debug their own certifcation test harness.

Against all expectations, we delivered the solution ahead of schedule, becoming the first and only SIS vendor in Oklahoma to meet the state's deadline. This decisive victory turned a perceived threat into a market-defining triumph. The state officially recommended MAS as their preferred choice, cementing our position as the dominant provider and creating a legendary success story within the company's history.

## Key Takeaway

The most intimidating enterprise challenges are still just code. The key is to deconstruct the complexity, break the problem down into its logical parts, and have the confidence to execute. For this project, that meant turning an inch-thick specification into a series of solvable coding challenges.
