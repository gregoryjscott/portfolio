---
layout: details
title: Quality Bank
subtitle: Invoicing $1 Billion/Month for Oil Pipeline
desc: >-
  Web application that manages the workflow, pricing data, sampling data, volume
  data, and invoicing for the Trans-Alaska Pipeline System.
role: Technical Lead
begin_year: 2010
end_year: 2012
_links:
  self:
    href: /projects/qb/
  languages:
    - href: /languages/cs/
    - href: /languages/css/
    - href: /languages/html/
    - href: /languages/js/
    - href: /languages/sql/
  db:
    - href: /db/sql-server/
  tools:
    - href: /tools/backbone/
  os:
    - href: /os/windows/
  jobs:
    - href: /jobs/rdi/
---

I remember walking away from my first face-to-face meeting with the client thinking to myself that the solution they wanted sounded impossible. Two plus years later, we delivered that exact solution. We put together amazing team of engineers with a wide variety of skills, our point of contact with the client was impressive and cooperative, our business analyst rocked, and everything came together like no other project I've been apart of before or since.

## The Problem

- describe the structure of the Trans-Alaska Pipeline System (TAPS), like a tree with the trunk being the port of Valdez
- oil of differing quality, owned by different companies, all mized together
- at the port, companies receive the volume they put in and either compensate others for lower quality oil or are compensated for higher quality oil
- many datasets are used to determine oil quality
- the methodology for calculating quality is constantly being litigated, leading to past invoices being revised and reissued with new money amounts with interest
  - E.g., a lawsuit would declare that one of the quality factors used between this date and that date was incorrectly calculated and therefore all the invoices during that time period would need to be revised, including interest
  - every month had 2 - 3 different revisions
- the legacy system was not built to handle that, and was littered with one-off if statements to handle each specific revision
  - meaning programmers had to make code updates every time a new revision was ordered
- also, quite often, parts of the tree are taken are shutdown temporarily, changing the formula

## The Solution

- we migrated the previous database, but threw away the code
- past months were still be versioned, over and over again
- new system allowed for capturing all the variables that could possibly affect the quality measurements as versioned datasets
- the client can now handle revisions without code changes by creating a new version of one of the versioned datasets
- as a test, we reissued every past invoice and matched everything to the penny
- was probably the hardest project of my career, we had a great team, the client was great to work with, everybody worked their tail off

## Key Takeaway

A great team can build the impossible, and have fun doing it at the same time.
