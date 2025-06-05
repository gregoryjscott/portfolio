---
layout: default
title: Jobs
desc: List of jobs.
_links:
  self:
    href: /jobs/
  index:
    - href: /jobs/boeing/
    - href: /jobs/fe/
    - href: /jobs/freelance/
    - href: /jobs/mas/
    - href: /jobs/rdi/
---

<nav>
  <a href="{{ site.url }}">Home</a> /
  <a href="{{ page.url }}">{{ page.title }}</a>
</nav>

{% include basic-info.html %}

{% for item in page._embedded.index %}
{% include jobs/summary.html job=item %}
{% endfor %}
