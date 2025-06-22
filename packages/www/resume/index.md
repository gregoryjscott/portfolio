---
layout: default
title: Gregory J. Scott
_links:
  self:
    href: /resume/
  jobs:
    - href: /jobs/boeing/
    - href: /jobs/fe/
    - href: /jobs/freelance/
    - href: /jobs/mas/
    - href: /jobs/rdi/
  schools:
    - href: /schools/uco/
---

<nav>
  <a href="{{ site.url }}">Home</a> /
  <a href="{{ site.url }}/resume">Resume</a>
</nav>

<section markdown="1">

{% include resume/contact.md %}

</section>

<section markdown="1">

{% include resume/skills.md %}

</section>

<section markdown="1">

## Experience

{% for item in page._embedded.jobs %}
   {% include summary.html resource=item heading_level=3 %}
{% endfor %}

</section>

<section markdown="1">

## Education

{% for item in page._embedded.schools %}
   {% include summary.html resource=item heading_level=3 %}
{% endfor %}

</section>
