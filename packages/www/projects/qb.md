---
layout: details
title: Quality Bank
subtitle: Invoicing $1 Billion/Month for Oil Pipeline
desc: >-
  Rewrite of the Trans-Alaska Pipeline's $1B/month invoicing system, treating
  business rules as versioned data to give the client full control over
  constant, retroactive changes.
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

In 2010, I was tasked with leading the replacement of the Quality Bank for the Trans-Alaska Pipeline System (TAPS)—the critical accounting system responsible for invoicing close to a billion dollars of crude oil each month. The system’s core challenge was its volatility. Due to constant litigation, the complex formulas for calculating oil quality were frequently changed retroactively, requiring months or even years of past invoices to be reissued with interest. The legacy system wasn’t designed for this reality; it was a brittle application riddled with one-off patches, requiring developer intervention for every court-ordered revision and shaking the client’s confidence in its accuracy.

Our solution was to re-architect the system around a new philosophy: business rules should be treated as versioned data, not as static code. We designed a sophisticated database-centric system where every variable affecting the calculations (from quality factors to pipeline configurations) could be versioned. This empowered the client’s team of accountants and lawyers to manage revisions independently by creating new versions of the underlying datasets—without writing a single line of code. To ensure the perfect accuracy required for a high-stakes financial system, the architecture was backed by a rigorous, test-driven development process.

The result was a transformative success. The new Quality Bank became the single source of truth, giving the client the autonomy and confidence to manage their own revisions. As a final validation, we re-ran every invoice from the system's history, matching the legacy output to the penny.

## Key Takeaway

A great team can build the impossible. For this project, that meant more than just technical skill; it was a combination of a disciplined, test-driven development process and a truly collaborative partnership with a client who was as committed to the outcome as we were.
