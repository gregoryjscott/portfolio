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

<section>
  <a href="{{ site.url }}">Home</a> / <a href="{{ page.url }}">{{ page.title }}</a>
</section>

<section>
  <p><h1>{{ page.title }}</h1></p>
  <p><em>{{ page.subtitle }}</em></p>
  {% if page.desc %}
    <p>{{ page.desc }}</p>
  {% endif %}
</section>

{% for item in page._embedded.index %}
{% include jobs/summary.html job=item %}
{% endfor %}
